import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import Crop from './Crop';
import Particles from './Particles';
import { useGame } from '../GameContext';
import { CROP_DATABASE } from '../../data/cropDatabase';
import CropEducationalModal from '../modals/CropEducationalModal';
import WrongSeasonModal from '../modals/WrongSeasonModal';
import FailedHarvestModal from '../modals/FailedHarvestModal';

export default function FarmPlot({ position = [0, 0, 0], activeTool = 'cursor' }) {
  const groupRef = useRef();
  const materialRef = useRef();
  const { plantCrop: gamePlant, waterCrop: gameWater, harvestCrop: gameHarvest } = useGame();

  // Plot States
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [cropType, setCropType] = useState(null); // 'wheat', 'corn', 'carrot', 'tomato', 'potato', 'rice'
  const [growthStage, setGrowthStage] = useState(0); // 0: Seed, 1: Sprout, 2: Young, 3: Mature, 4: Harvest Ready

  // Interaction States
  const [isWatered, setIsWatered] = useState(false);
  const [particleType, setParticleType] = useState(null); // 'water' or 'harvest'
  const [isWrongSeasonPlant, setIsWrongSeasonPlant] = useState(false);

  // Modal States
  const { season, stats, markCropTutorialViewed, logFailedHarvest, seedInventory } = useGame();
  const [activeModal, setActiveModal] = useState(null); // 'educational' or 'wrong_season' or 'failed_harvest'
  const [modalCrop, setModalCrop] = useState(null);
  const [isFirstTimeTutorial, setIsFirstTimeTutorial] = useState(false);

  // Smooth hover animation
  useFrame((state, delta) => {
    if (!groupRef.current || !materialRef.current) return;

    const isActive = isHovered || isSelected;
    // Lerp position Y
    const targetY = isActive ? position[1] + 0.15 : position[1];
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 10);

    // Lerp color
    const targetColor = new THREE.Color(isActive ? "#92400e" : "#78350f");
    materialRef.current.color.lerp(targetColor, delta * 10);
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = activeTool === 'water' ? 'cell' : 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e) => {
    e.stopPropagation();

    // Water tool interaction
    if (activeTool === 'water' && cropType && growthStage >= 0 && growthStage < 4 && !isWatered) {
      setParticleType('water');
      setIsWatered(true);
      gameWater();
      // Simulate growth advancing after watering
      setTimeout(() => {
        setGrowthStage((prev) => Math.min(prev + 1, 4));
        setIsWatered(false);
      }, 3000);
      return;
    }

    // Harvest interaction
    if (activeTool === 'cursor' && cropType && growthStage === 4) {
      if (isWrongSeasonPlant) {
        setModalCrop(CROP_DATABASE[cropType]);
        setActiveModal('failed_harvest');
        return; // Wait for user to close popup to reset
      }

      setParticleType('harvest');
      gameHarvest(cropType);
      // Trigger scale down animation in Crop by setting invalid stage
      setGrowthStage(-1);

      // Reset plot after animation
      setTimeout(() => {
        resetPlot();
      }, 800);
      return;
    }

    // Standard selection (only if empty)
    if (activeTool === 'cursor' && !cropType) {
      setIsSelected(!isSelected);
    }
  };

  const attemptPlantCrop = (type) => {
    const cropData = CROP_DATABASE[type];
    if (!cropData) return;

    // 1. Season Check
    if (!cropData.preferredSeasons.includes(season)) {
      setModalCrop(cropData);
      setActiveModal('wrong_season');
      return; // Block planting
    }

    // 2. First-Time Check
    const hasViewed = stats.viewedCropTutorials?.[type];
    if (!hasViewed) {
      setModalCrop(cropData);
      setIsFirstTimeTutorial(true);
      setActiveModal('educational');
      return; // Wait for modal action
    }

    // If passed all checks, plant directly
    executePlantCrop(type);
  };

  const executePlantCrop = (type, isWrongSeason = false) => {
    setParticleType('dust');
    setCropType(type);
    setGrowthStage(0);
    setIsSelected(false);
    setIsWatered(false);
    setIsWrongSeasonPlant(isWrongSeason);
    setActiveModal(null);
    gamePlant(type);
  };

  const resetPlot = () => {
    setCropType(null);
    setGrowthStage(0);
    setIsWatered(false);
    setIsWrongSeasonPlant(false);
    setActiveModal(null);
  };

  const handleTutorialPlant = () => {
    if (modalCrop) {
      markCropTutorialViewed(modalCrop.id);
      executePlantCrop(modalCrop.id, isWrongSeasonPlant);
    }
  };

  const handleTutorialSkip = () => {
    if (isFirstTimeTutorial && modalCrop) {
      markCropTutorialViewed(modalCrop.id);
    }
    setActiveModal(null);
  };

  const openCropInfo = (type) => {
    setModalCrop(CROP_DATABASE[type]);
    setIsFirstTimeTutorial(false);
    setActiveModal('educational');
  };

  const handlePlantAnyway = () => {
    const type = modalCrop.id;
    const hasViewed = stats.viewedCropTutorials?.[type];

    if (!hasViewed) {
      markCropTutorialViewed(type);
    }
    executePlantCrop(type, true);
  };

  const handleFailedHarvestClose = () => {
    logFailedHarvest(modalCrop.id, `${modalCrop.name} requires ${modalCrop.preferredSeasons.join(' or ')} conditions.`);
    resetPlot();
  };

  // Clear particles handler
  const clearParticles = () => setParticleType(null);

  return (
    <group position={position} ref={groupRef}>
      {/* Dirt mound base */}
      <mesh
        receiveShadow
        castShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[3, 0.4, 3]} />
        <meshStandardMaterial ref={materialRef} color="#78350f" roughness={1} />
      </mesh>

      {/* Inner dirt */}
      <mesh receiveShadow position={[0, 0.21, 0]}>
        <boxGeometry args={[2.6, 0.05, 2.6]} />
        <meshStandardMaterial color={isWatered ? "#451a03" : "#92400e"} roughness={1} />
      </mesh>

      {/* Moisture Indicator */}
      {isWatered && (
        <mesh position={[1, 0.3, 1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Harvest Ready Indicator */}
      {growthStage === 4 && (
        <mesh position={[0, 2, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.2, 0.5, 4]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      )}

      {/* Render Crop Model */}
      {cropType && <Crop key={cropType} type={cropType} stage={growthStage} position={[0, 0.2, 0]} />}

      {/* Render Particles */}
      {particleType && <Particles type={particleType} position={[0, 1, 0]} onComplete={clearParticles} />}

      {/* Floating UI Menu */}
      {isSelected && activeModal === null && (
        <Html position={[0, 0.8, 0]} zIndexRange={[100, 0]}>
          <CropMenu onSelect={attemptPlantCrop} onInfo={openCropInfo} seedInventory={seedInventory} />
        </Html>
      )}

      {/* Modals outside group bounds via Html bridge */}
      {activeModal === 'wrong_season' && modalCrop && (
        <Html>
          <WrongSeasonModal
            crop={modalCrop}
            currentSeason={season}
            isOpen={true}
            onClose={() => { setActiveModal(null); setIsSelected(false); }}
            onPlantAnyway={handlePlantAnyway}
            onLearnMore={() => openCropInfo(modalCrop.id)}
          />
        </Html>
      )}

      {activeModal === 'educational' && modalCrop && (
        <Html>
          <CropEducationalModal
            crop={modalCrop}
            isOpen={true}
            onClose={handleTutorialSkip}
            onPlant={handleTutorialPlant}
            isFirstTime={isFirstTimeTutorial}
            seedInventory={seedInventory}
          />
        </Html>
      )}

      {activeModal === 'failed_harvest' && modalCrop && (
        <Html>
          <FailedHarvestModal
            crop={modalCrop}
            isOpen={true}
            onClose={handleFailedHarvestClose}
            onLearnMore={() => openCropInfo(modalCrop.id)}
          />
        </Html>
      )}
    </group>
  );
}

// Custom detached UI component for the menu
const CropMenu = ({ onSelect, onInfo, seedInventory }) => {
  const containerRef = useRef(null);

  // Stop pointer events from reaching OrbitControls
  const stopEvent = (e) => e.stopPropagation();

  useEffect(() => {
    // Keep popup in viewport horizontally
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let shiftX = 0;
    const padding = 16;

    if (rect.left < padding) shiftX = padding - rect.left;
    if (rect.right > window.innerWidth - padding) shiftX = window.innerWidth - padding - rect.right;

    if (shiftX !== 0) {
      containerRef.current.style.transform = `translateX(calc(-50% + ${shiftX}px))`;
    }
  }, []);

  const crops = Object.values(CROP_DATABASE);

  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-[340px]"
      onClick={stopEvent}
      onWheelCapture={stopEvent}
      onPointerDownCapture={stopEvent}
      onPointerMoveCapture={stopEvent}
      onPointerUpCapture={stopEvent}
      onTouchStartCapture={stopEvent}
      onTouchMoveCapture={stopEvent}
      onTouchEndCapture={stopEvent}
    >
      <div
        ref={containerRef}
        className="w-full bg-white/95 backdrop-blur-md p-4 rounded-[24px] shadow-2xl border border-slate-100 animate-popup-open origin-bottom"
      >
        <div className="flex justify-between items-center mb-3 px-1">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Select Seed</span>
          <span className="text-xs font-bold bg-farm-green-light text-farm-green-dark px-2 py-0.5 rounded-full">Owned Seeds</span>
        </div>

        <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 pb-2 custom-scrollbar scroll-smooth">
          {crops.map(c => {
            const owned = seedInventory?.[c.id] || 0;
            const isOutOfStock = owned === 0;

            return (
              <div key={c.id} className={`w-full rounded-2xl flex flex-col items-center p-2 transition-all duration-200 shadow-sm border ${isOutOfStock ? 'bg-slate-100 border-slate-200 opacity-60 grayscale' : 'bg-slate-50 hover:bg-white border-slate-100 hover:border-farm-green'
                }`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isOutOfStock) onSelect(c.id);
                  }}
                  className={`flex flex-col items-center w-full focus:outline-none ${isOutOfStock ? 'cursor-not-allowed' : ''}`}
                  disabled={isOutOfStock}
                >
                  <span className="text-3xl mb-1">{c.icon}</span>
                  <span className="text-[11px] font-bold text-slate-800 line-clamp-1">{c.name}</span>
                  {isOutOfStock ? (
                    <span className="text-[9px] font-black text-red-500 uppercase mt-0.5">Out of Stock</span>
                  ) : (
                    <span className="text-[10px] font-black text-farm-green-dark bg-farm-green-light px-2 py-0.5 rounded-full mt-0.5">{owned} Owned</span>
                  )}
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); onInfo(c.id); }}
                  className={`mt-2 w-full py-2.5 rounded-lg text-[10px] font-black flex items-center justify-center gap-1 transition-colors relative after:absolute after:-inset-2 after:content-[""] after:z-10 ${isOutOfStock ? 'bg-slate-200 text-slate-400' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    }`}
                  title="Crop Info"
                >
                  <span className="relative z-20">ⓘ Info</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Crop({ type, stage, position = [0, 0, 0] }) {
  const groupRef = useRef();
  
  // Base scales for stages 0 to 4 (Seed -> Harvest Ready)
  const stageScales = [0.1, 0.3, 0.6, 0.9, 1.2];
  
  // Is it being harvested? (We can pass a prop for this, or just use scale 0 when unmounting)
  const targetScale = stageScales[stage] !== undefined ? stageScales[stage] : 0;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly lerp scale for growth and bounce
      // We use a slight elastic feel by overshooting if we wanted, but standard lerp is smooth
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      
      // Gentle idle sway wind effect
      if (stage >= 1) {
        // Sway amount increases with stage
        const swayAmount = 0.05 + (stage * 0.02);
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2 + position[0]) * swayAmount;
        groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 1.5 + position[2]) * swayAmount * 0.5;
      }
    }
  });

  // Map 20 crops to 6 base visual models
  const getVisualModel = (cropType) => {
    switch (cropType) {
      case 'sugarcane':
      case 'banana':
      case 'corn':
        return 'corn';
      case 'cabbage':
      case 'spinach':
      case 'carrot':
        return 'carrot';
      case 'chili':
      case 'brinjal':
      case 'cotton':
      case 'mango':
      case 'coconut':
      case 'soybean':
      case 'sunflower':
      case 'tomato':
        return 'tomato';
      case 'onion':
      case 'groundnut':
      case 'potato':
        return 'potato';
      case 'millet':
      case 'rice':
        return 'rice';
      case 'wheat':
      default:
        return 'wheat';
    }
  };

  const renderCropModel = () => {
    const visualModel = getVisualModel(type);

    switch (visualModel) {
      case 'wheat':
        return (
          <group position={[0, 0.5, 0]}>
            {/* 3 clustered stalks */}
            {[-0.1, 0, 0.1].map((offsetX, i) => (
              <group key={i} position={[offsetX, 0, (i === 1 ? 0.1 : -0.1)]} rotation={[0, 0, offsetX * 0.5]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.02, 0.02, 1, 5]} />
                  <meshStandardMaterial color={stage >= 3 ? "#facc15" : "#84cc16"} />
                </mesh>
                {(stage >= 3) && (
                  <mesh position={[0, 0.4, 0]} castShadow>
                    <boxGeometry args={[0.08, 0.3, 0.08]} />
                    <meshStandardMaterial color="#fef08a" />
                  </mesh>
                )}
              </group>
            ))}
          </group>
        );
      
      case 'corn':
        return (
          <group position={[0, 0.6, 0]}>
            {/* Tall Stem */}
            <mesh castShadow>
              <cylinderGeometry args={[0.06, 0.06, 1.2, 6]} />
              <meshStandardMaterial color="#22c55e" />
            </mesh>
            {/* Corn Cobs */}
            {stage >= 3 && (
              <>
                <group position={[0.1, 0.1, 0]} rotation={[0, 0, -0.3]}>
                  {/* Cob */}
                  <mesh castShadow>
                    <cylinderGeometry args={[0.08, 0.08, 0.4, 6]} />
                    <meshStandardMaterial color="#facc15" />
                  </mesh>
                  {/* Wrapping Leaf */}
                  <mesh position={[-0.05, -0.1, 0]} rotation={[0, 0, 0.2]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.4, 3]} />
                    <meshStandardMaterial color="#16a34a" />
                  </mesh>
                </group>
                <group position={[-0.1, -0.2, 0.1]} rotation={[0, 2, 0.3]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.08, 0.08, 0.4, 6]} />
                    <meshStandardMaterial color="#facc15" />
                  </mesh>
                </group>
              </>
            )}
          </group>
        );

      case 'carrot':
        return (
          <group position={[0, 0.3, 0]}>
            {/* Orange Root emerging */}
            <mesh castShadow position={[0, stage >= 3 ? 0.1 : -0.2, 0]}>
              <coneGeometry args={[0.15, 0.6, 6]} />
              <meshStandardMaterial color="#f97316" roughness={0.8} />
            </mesh>
            {/* Bushy Leaves */}
            <mesh castShadow position={[0, 0.5, 0]}>
              <dodecahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial color="#16a34a" flatShading />
            </mesh>
            <mesh castShadow position={[0.1, 0.6, 0.1]}>
              <dodecahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial color="#22c55e" flatShading />
            </mesh>
          </group>
        );

      case 'tomato':
        return (
          <group position={[0, 0.4, 0]}>
            {/* Main Bush */}
            <mesh castShadow>
              <sphereGeometry args={[0.4, 6, 6]} />
              <meshStandardMaterial color="#15803d" flatShading />
            </mesh>
            {/* Tomatoes */}
            {stage >= 3 && (
              <>
                <mesh position={[0.3, 0.1, 0.2]} castShadow>
                  <sphereGeometry args={[0.12, 5, 5]} />
                  <meshStandardMaterial color={stage === 4 ? "#ef4444" : "#fca5a5"} flatShading />
                </mesh>
                <mesh position={[-0.2, 0.2, 0.3]} castShadow>
                  <sphereGeometry args={[0.1, 5, 5]} />
                  <meshStandardMaterial color={stage === 4 ? "#ef4444" : "#fca5a5"} flatShading />
                </mesh>
                <mesh position={[0.1, -0.2, -0.3]} castShadow>
                  <sphereGeometry args={[0.14, 5, 5]} />
                  <meshStandardMaterial color={stage === 4 ? "#ef4444" : "#fca5a5"} flatShading />
                </mesh>
              </>
            )}
          </group>
        );

      case 'potato':
        return (
          <group position={[0, 0.3, 0]}>
            {/* Wider leafy plant */}
            <mesh castShadow position={[0, 0, 0]}>
              <dodecahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial color="#4ade80" flatShading />
            </mesh>
            <mesh castShadow position={[0.2, -0.1, 0.2]}>
              <dodecahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial color="#22c55e" flatShading />
            </mesh>
            <mesh castShadow position={[-0.2, -0.1, -0.2]}>
              <dodecahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial color="#22c55e" flatShading />
            </mesh>
            {/* Exposed potatoes when ready */}
            {stage === 4 && (
              <>
                <mesh position={[0.2, -0.3, 0.3]} castShadow>
                  <dodecahedronGeometry args={[0.1, 0]} />
                  <meshStandardMaterial color="#d97706" flatShading />
                </mesh>
                <mesh position={[-0.3, -0.3, 0.1]} castShadow>
                  <dodecahedronGeometry args={[0.08, 0]} />
                  <meshStandardMaterial color="#d97706" flatShading />
                </mesh>
              </>
            )}
          </group>
        );

      case 'rice':
        return (
          <group position={[0, 0.4, 0]}>
            {/* Clustered thin green blades */}
            {[-0.15, 0, 0.15].map((offsetX, i) => (
              <group key={i} position={[offsetX, 0, (i === 1 ? -0.1 : 0.1)]} rotation={[0.1, i, offsetX]}>
                <mesh castShadow>
                  <boxGeometry args={[0.05, 0.8, 0.05]} />
                  <meshStandardMaterial color={stage >= 3 ? "#d9f99d" : "#a3e635"} />
                </mesh>
                {/* Rice heads */}
                {stage >= 3 && (
                  <mesh castShadow position={[0, 0.3, 0.05]} rotation={[0.2, 0, 0]}>
                    <boxGeometry args={[0.06, 0.2, 0.06]} />
                    <meshStandardMaterial color="#fef08a" />
                  </mesh>
                )}
              </group>
            ))}
          </group>
        );
        
      default:
        return null;
    }
  };

  return (
    <group position={position} ref={groupRef} scale={[0, 0, 0]}>
      {renderCropModel()}
    </group>
  );
}

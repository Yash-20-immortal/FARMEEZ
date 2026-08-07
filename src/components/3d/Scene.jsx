import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useSeason } from '../SeasonContext';
import Lighting from './Lighting';
import Sky from './Sky';
import CameraController from './CameraController';
import Ground from './Ground';
import FarmPlot from './FarmPlot';
import FarmHouse from './FarmHouse';
import Tree from './Tree';
import Rock from './Rock';
import Bush from './Bush';
import Fence from './Fence';
import Flower from './Flower';
import Path from './Path';
import Pond from './Pond';
import Windmill from './Windmill';
import HayBale from './HayBale';
import Scarecrow from './Scarecrow';
import Cloud from './Cloud';
import Bird from './Bird';
import Butterfly from './Butterfly';
import EventVisuals from './EventVisuals';

function SeasonEnvironment() {
  const { config } = useSeason();
  const { scene } = useThree();
  const fogRef = useRef();

  useFrame((state, delta) => {
    // Lerp Background
    if (scene.background) {
      scene.background.lerp(new THREE.Color(config.sky), delta * 2);
    } else {
      scene.background = new THREE.Color(config.sky);
    }
    // Lerp Fog
    if (fogRef.current) {
      fogRef.current.color.lerp(new THREE.Color(config.fog), delta * 2);
    }
  });

  return <fog attach="fog" ref={fogRef} args={[config.fog, 15, 45]} />;
}

export default function Scene({ activeTool = 'cursor' }) {
  return (
    <Canvas shadows camera={{ position: [12, 10, 12], fov: 35 }}>
      <SeasonEnvironment />

      
      <Sky />
      <Lighting />
      <CameraController />
      
      <Suspense fallback={null}>
        {/* Dynamic Farming Events */}
        <EventVisuals />

        {/* Terrain */}
        <Ground />
        
        {/* Soft Contact Shadows to ground objects */}
        <ContactShadows resolution={1024} scale={30} blur={2} opacity={0.4} far={10} color="#064e3b" />

        {/* Buildings */}
        <FarmHouse position={[-3, 0, -4]} />
        
        {/* Dirt Path connecting House to Farming Area */}
        <Path position={[-1, 0, -1]} length={4} width={1.5} rotation={[0, -Math.PI / 4, 0]} />
        
        {/* Farm Plots (2x3 Grid on the dirt patch) */}
        <group position={[3, 0, 3]}>
          <FarmPlot position={[-1.6, 0, -3.2]} activeTool={activeTool} />
          <FarmPlot position={[1.6, 0, -3.2]} activeTool={activeTool} />
          
          <FarmPlot position={[-1.6, 0, 0]} activeTool={activeTool} />
          <FarmPlot position={[1.6, 0, 0]} activeTool={activeTool} />
          
          <FarmPlot position={[-1.6, 0, 3.2]} activeTool={activeTool} />
          <FarmPlot position={[1.6, 0, 3.2]} activeTool={activeTool} />
        </group>

        {/* Perimeter Fences around the dirt area */}
        <Fence position={[-1, 0, 0]} length={4} rotation={[0, Math.PI / 2, 0]} />
        <Fence position={[7, 0, 3]} length={6} rotation={[0, Math.PI / 2, 0]} />
        <Fence position={[3, 0, 7]} length={6} rotation={[0, 0, 0]} />
        
        {/* Background Ambient Objects */}
        <Pond position={[-12, 0, -5]} scale={1.2} />
        <Windmill position={[-18, 0, -20]} scale={2} rotation={[0, Math.PI/4, 0]} />
        <HayBale position={[8, 0, -8]} scale={1.5} rotation={[0, Math.PI/6, 0]} />
        <HayBale position={[9, 0, -7]} scale={1.5} rotation={[0, 1.2, 0]} />
        <Scarecrow position={[5, 0, 6]} scale={1.2} rotation={[0, -Math.PI/6, 0]} />

        {/* Ambient Life (Birds, Clouds, Butterflies) */}
        <Cloud position={[-10, 15, -15]} speed={1} scale={2} />
        <Cloud position={[5, 12, -25]} speed={0.5} scale={1.5} />
        <Cloud position={[15, 18, 5]} speed={0.8} scale={2.5} />
        
        <Bird position={[-5, 8, -5]} speed={0.8} radius={8} offset={0} />
        <Bird position={[2, 10, 2]} speed={0.6} radius={12} offset={Math.PI} />
        <Bird position={[10, 6, -10]} speed={1.2} radius={6} offset={Math.PI/2} />
        
        <Butterfly position={[-1.5, 1, -2]} color="#ef4444" radius={1.5} offset={0} />
        <Butterfly position={[1, 1, 0.5]} color="#f472b6" radius={1} offset={Math.PI} />
        <Butterfly position={[-10, 1, -4]} color="#eab308" radius={2} offset={2} />

        {/* Trees scattered organically */}
        <Tree position={[-8, 0, -8]} scale={1.2} />
        <Tree position={[-5, 0, -9]} scale={0.9} />
        <Tree position={[8, 0, -5]} scale={1.1} />
        <Tree position={[6, 0, -8]} scale={0.8} />
        <Tree position={[-7, 0, 5]} scale={1} />
        <Tree position={[-9, 0, 2]} scale={1.3} />
        <Tree position={[7, 0, 8]} scale={1.15} />

        {/* Rocks */}
        <Rock position={[-5, 0, 3]} scale={1.5} rotation={[0, Math.PI / 4, 0]} />
        <Rock position={[6, 0, -2]} scale={0.8} rotation={[0, 1.2, 0]} />
        <Rock position={[9, 0, 5]} scale={1.2} rotation={[0, -0.5, 0]} />
        <Rock position={[-2, 0, -2]} scale={0.5} rotation={[0, 0.5, 0]} />

        {/* Bushes */}
        <Bush position={[-1.5, 0, -6]} scale={1} />
        <Bush position={[-3, 0, -7.5]} scale={0.7} />
        <Bush position={[4, 0, -3.5]} scale={1.2} />
        <Bush position={[-4, 0, 6]} scale={0.9} />
        <Bush position={[8, 0, 2]} scale={1.1} />
        <Bush position={[0, 0, 3]} scale={0.8} />

        {/* Flowers along the path and house */}
        <Flower position={[-1.5, 0, -2]} color="#ef4444" scale={1.5} />
        <Flower position={[-1.8, 0, -1.8]} color="#3b82f6" scale={1.2} />
        <Flower position={[-1.2, 0, -1.6]} color="#eab308" scale={1.3} />
        
        <Flower position={[1, 0, 0.5]} color="#f472b6" scale={1.4} />
        <Flower position={[1.5, 0, 0.2]} color="#a855f7" scale={1.2} />

      </Suspense>
    </Canvas>
  );
}

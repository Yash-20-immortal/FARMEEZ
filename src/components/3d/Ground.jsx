import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSeason } from '../SeasonContext';

export default function Ground() {
  const { config } = useSeason();
  
  // Refs for materials that need to change color
  const matRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  useFrame((state, delta) => {
    matRefs.forEach(ref => {
      if (ref.current) {
        ref.current.color.lerp(new THREE.Color(config.ground), delta * 2);
      }
    });
  });

  return (
    <group>
      {/* Large Grass Terrain */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial ref={matRefs[0]} roughness={1} />
      </mesh>
      
      {/* Central Dirt Area for Farming (Stays dirt colored) */}
      <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 16]} />
        <meshStandardMaterial color="#a16207" roughness={1} />
      </mesh>

      {/* Rolling Hills (Background) */}
      <mesh receiveShadow position={[-20, -2, -30]}>
        <sphereGeometry args={[15, 16, 16]} />
        <meshStandardMaterial ref={matRefs[1]} roughness={1} flatShading />
      </mesh>
      <mesh receiveShadow position={[25, -5, -25]}>
        <sphereGeometry args={[20, 16, 16]} />
        <meshStandardMaterial ref={matRefs[2]} roughness={1} flatShading />
      </mesh>
      <mesh receiveShadow position={[-35, -5, 10]}>
        <sphereGeometry args={[18, 16, 16]} />
        <meshStandardMaterial ref={matRefs[3]} roughness={1} flatShading />
      </mesh>
      <mesh receiveShadow position={[30, -3, 20]}>
        <sphereGeometry args={[12, 16, 16]} />
        <meshStandardMaterial ref={matRefs[4]} roughness={1} flatShading />
      </mesh>
    </group>
  );
}

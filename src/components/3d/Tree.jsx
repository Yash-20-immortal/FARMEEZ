import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSeason } from '../SeasonContext';

export default function Tree({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  const groupRef = useRef();
  const matRefs = [useRef(), useRef(), useRef()];
  const { config } = useSeason();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle wind sway based on global position to make it organic
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.02;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.8 + position[2]) * 0.02;
    }
    matRefs.forEach(ref => {
      if (ref.current) {
        ref.current.color.lerp(new THREE.Color(config.leaves), delta * 2);
      }
    });
  });

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation} ref={groupRef}>
      {/* Trunk */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1, 6]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.9} flatShading />
      </mesh>
      
      {/* Leaves (Low-Poly style using Dodecahedron) */}
      <mesh castShadow receiveShadow position={[0, 1.8, 0]}>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial ref={matRefs[0]} roughness={0.8} flatShading />
      </mesh>
      
      <mesh castShadow receiveShadow position={[0.5, 1.4, 0.5]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial ref={matRefs[1]} roughness={0.8} flatShading />
      </mesh>
      
      <mesh castShadow receiveShadow position={[-0.6, 1.5, -0.4]}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial ref={matRefs[2]} roughness={0.8} flatShading />
      </mesh>
    </group>
  );
}

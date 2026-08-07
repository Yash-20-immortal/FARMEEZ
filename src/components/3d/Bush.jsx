import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSeason } from '../SeasonContext';

export default function Bush({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();
  const matRefs = [useRef(), useRef(), useRef()];
  const { config } = useSeason();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.015;
    }
    matRefs.forEach(ref => {
      if (ref.current) {
        ref.current.color.lerp(new THREE.Color(config.leaves), delta * 2);
      }
    });
  });

  return (
    <group position={position} scale={[scale, scale, scale]} ref={groupRef}>
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial ref={matRefs[0]} roughness={0.8} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position={[0.3, 0.2, 0.2]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial ref={matRefs[1]} roughness={0.8} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.3, 0.2, -0.1]}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial ref={matRefs[2]} roughness={0.8} flatShading />
      </mesh>
    </group>
  );
}

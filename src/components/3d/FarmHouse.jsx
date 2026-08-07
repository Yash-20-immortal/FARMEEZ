import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSeason } from '../SeasonContext';

export default function FarmHouse({ position = [0, 0, 0] }) {
  const roofRef = useRef();
  const { config } = useSeason();

  useFrame((state, delta) => {
    if (roofRef.current) {
      roofRef.current.color.lerp(new THREE.Color(config.roof), delta * 2);
    }
  });

  return (
    <group position={position}>
      {/* Main Building Base */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[4, 3, 5]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.6} /> {/* Cream walls */}
      </mesh>
      
      {/* Roof - using cylinder with 3 radial segments to create a triangular prism */}
      <mesh castShadow receiveShadow position={[0, 4, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[2.2, 2.2, 5.4, 3]} />
        <meshStandardMaterial ref={roofRef} color="#dc2626" roughness={0.7} /> {/* Red roof */}
      </mesh>
      
      {/* Chimney */}
      <mesh castShadow receiveShadow position={[1.2, 4.2, -1.2]}>
        <boxGeometry args={[0.6, 1.5, 0.6]} />
        <meshStandardMaterial color="#991b1b" roughness={0.9} /> {/* Dark red brick */}
      </mesh>

      {/* Door */}
      <mesh position={[0, 1, 2.51]}>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="#78350f" roughness={0.8} /> {/* Brown door */}
      </mesh>

      {/* Window */}
      <mesh position={[-1.2, 1.5, 2.51]}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.5} /> {/* Glass */}
      </mesh>
      <mesh position={[1.2, 1.5, 2.51]}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.5} /> {/* Glass */}
      </mesh>
    </group>
  );
}

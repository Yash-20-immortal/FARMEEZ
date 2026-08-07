import React from 'react';

export default function Flower({ position = [0, 0, 0], scale = 1, color = "#f472b6" }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Stem */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 5]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>
      
      {/* Center */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#fef08a" roughness={0.5} />
      </mesh>
      
      {/* Petals (Simplified as a slightly larger flat sphere for low-poly feel) */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.12, 6, 4]} />
        <meshStandardMaterial color={color} roughness={0.7} flatShading />
      </mesh>
    </group>
  );
}

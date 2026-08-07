import React from 'react';

export default function Scarecrow({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      {/* Post */}
      <mesh castShadow position={[0, 1, 0]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      {/* Arms */}
      <mesh castShadow position={[0, 1.4, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.1]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      {/* Shirt */}
      <mesh castShadow position={[0, 1.2, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.3]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      {/* Head (Pumpkin style) */}
      <mesh castShadow position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.25, 6, 6]} />
        <meshStandardMaterial color="#f97316" flatShading />
      </mesh>
      {/* Hat */}
      <mesh castShadow position={[0, 2.05, 0]}>
        <coneGeometry args={[0.3, 0.3, 6]} />
        <meshStandardMaterial color="#1e293b" flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

import React from 'react';

export default function Rock({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position={[0.5, 0.2, 0.3]} scale={0.6}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

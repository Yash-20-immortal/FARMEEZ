import React from 'react';

export default function HayBale({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 1, 8]} />
        <meshStandardMaterial color="#fef08a" roughness={1} />
      </mesh>
      {/* Straw bands */}
      <mesh castShadow position={[-0.25, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.51, 0.51, 0.05, 8]} />
        <meshStandardMaterial color="#ca8a04" />
      </mesh>
      <mesh castShadow position={[0.25, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.51, 0.51, 0.05, 8]} />
        <meshStandardMaterial color="#ca8a04" />
      </mesh>
    </group>
  );
}

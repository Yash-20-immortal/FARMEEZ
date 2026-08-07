import React from 'react';

export default function Pond({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Water Surface */}
      <mesh receiveShadow position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2.2, 0.1, 12]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.8} roughness={0.1} />
      </mesh>

      {/* Dirt Edge */}
      <mesh receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.3, 2.3, 0.05, 12]} />
        <meshStandardMaterial color="#a16207" roughness={1} />
      </mesh>
      
      {/* Small Bridge */}
      <group position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 0.1, 2.5]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh castShadow position={[-0.4, 0.2, 0]}>
          <boxGeometry args={[0.05, 0.4, 2.5]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
        <mesh castShadow position={[0.4, 0.2, 0]}>
          <boxGeometry args={[0.05, 0.4, 2.5]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
      </group>
    </group>
  );
}

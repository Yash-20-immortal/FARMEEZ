import React from 'react';

export default function Fence({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, length = 3 }) {
  // We'll create a repeatable fence segment.
  const posts = [];
  for (let i = 0; i <= length; i++) {
    posts.push(
      <mesh key={`post-${i}`} position={[i - length / 2, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
    );
  }

  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {posts}
      
      {/* Top Rail */}
      <mesh position={[0, 0.6, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[length + 0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#A0522D" roughness={0.9} />
      </mesh>
      
      {/* Bottom Rail */}
      <mesh position={[0, 0.3, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[length + 0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#A0522D" roughness={0.9} />
      </mesh>
    </group>
  );
}

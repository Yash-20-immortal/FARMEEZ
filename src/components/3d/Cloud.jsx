import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Cloud({ position = [0, 0, 0], scale = 1, speed = 1 }) {
  const groupRef = useRef();
  const startX = position[0];

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Drift across X axis
      groupRef.current.position.x += delta * speed * 0.5;
      
      // Reset if it goes too far
      if (groupRef.current.position.x > 30) {
        groupRef.current.position.x = -30;
      }
      
      // Gentle bobbing
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + startX) * 0.2;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]} ref={groupRef}>
      {/* Fluffy clustered spheres */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 7, 7]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>
      <mesh position={[0.8, -0.2, 0.2]} castShadow receiveShadow>
        <sphereGeometry args={[0.7, 7, 7]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>
      <mesh position={[-0.8, -0.1, -0.2]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 7, 7]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>
      <mesh position={[0.3, 0.5, -0.3]} castShadow receiveShadow>
        <sphereGeometry args={[0.6, 7, 7]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>
    </group>
  );
}

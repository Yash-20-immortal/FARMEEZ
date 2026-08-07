import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Bird({ position = [0, 0, 0], speed = 1, radius = 10, offset = 0 }) {
  const groupRef = useRef();
  const wingsRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current && wingsRef.current) {
      const time = state.clock.elapsedTime * speed + offset;
      
      // Fly in a circle
      groupRef.current.position.x = position[0] + Math.cos(time) * radius;
      groupRef.current.position.z = position[2] + Math.sin(time) * radius;
      // Bob up and down slightly
      groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.5;
      
      // Face direction of travel
      groupRef.current.rotation.y = -time;

      // Flap wings
      wingsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 15) * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={[0.3, 0.3, 0.3]}>
      {/* Body */}
      <mesh castShadow>
        <coneGeometry args={[0.1, 0.4, 3]} rotation={[-Math.PI/2, 0, 0]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>
      
      {/* Wings */}
      <group ref={wingsRef}>
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, 0.2]} castShadow>
          <boxGeometry args={[0.4, 0.02, 0.1]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[0.4, 0.02, 0.1]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
      </group>
    </group>
  );
}

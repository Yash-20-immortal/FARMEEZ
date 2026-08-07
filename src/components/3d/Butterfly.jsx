import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Butterfly({ position = [0, 0, 0], color = "#f472b6", radius = 1, offset = 0 }) {
  const groupRef = useRef();
  const wingsRef = useRef();

  useFrame((state) => {
    if (groupRef.current && wingsRef.current) {
      const time = state.clock.elapsedTime * 2 + offset;
      
      // Flutter chaotically around origin
      groupRef.current.position.x = position[0] + Math.cos(time) * radius + Math.sin(time * 3) * 0.2;
      groupRef.current.position.z = position[2] + Math.sin(time) * radius + Math.cos(time * 2) * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(time * 5) * 0.3;
      
      // Look forward (roughly)
      groupRef.current.rotation.y = -time + Math.PI/2;

      // Flap wings extremely fast
      wingsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 30) * 0.8;
    }
  });

  return (
    <group ref={groupRef} scale={[0.15, 0.15, 0.15]}>
      {/* Tiny Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 4]} rotation={[-Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Wings */}
      <group ref={wingsRef}>
        <mesh position={[0.1, 0, 0]} castShadow>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial color={color} side={2} />
        </mesh>
        <mesh position={[-0.1, 0, 0]} castShadow>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial color={color} side={2} />
        </mesh>
      </group>
    </group>
  );
}

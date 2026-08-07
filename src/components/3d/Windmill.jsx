import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Windmill({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  const bladesRef = useRef();

  useFrame((state, delta) => {
    if (bladesRef.current) {
      bladesRef.current.rotation.x += delta * 0.5; // Rotate blades
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      {/* Base Tower */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.6, 1.2, 3, 6]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.9} flatShading />
      </mesh>
      
      {/* Wooden Roof */}
      <mesh castShadow receiveShadow position={[0, 3.2, 0]}>
        <coneGeometry args={[0.8, 1, 6]} />
        <meshStandardMaterial color="#9a3412" roughness={1} flatShading />
      </mesh>

      {/* Rotating Blades Assembly */}
      <group position={[0, 2.5, 0.7]} ref={bladesRef}>
        {/* Hub */}
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        
        {/* 4 Blades */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <group key={i} rotation={[angle, 0, 0]}>
            {/* Arm */}
            <mesh position={[0, 1, 0]} castShadow>
              <boxGeometry args={[0.05, 2, 0.05]} />
              <meshStandardMaterial color="#78350f" />
            </mesh>
            {/* Sail */}
            <mesh position={[0.15, 1.2, 0]} rotation={[0, 0.2, 0]} castShadow>
              <boxGeometry args={[0.3, 1.6, 0.05]} />
              <meshStandardMaterial color="#fef08a" transparent opacity={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

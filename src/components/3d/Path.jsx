import React from 'react';

export default function Path({ position = [0, 0, 0], rotation = [0, 0, 0], length = 5, width = 1.5 }) {
  return (
    <mesh position={[position[0], 0.02, position[2]]} rotation={rotation} receiveShadow>
      <boxGeometry args={[length, 0.04, width]} />
      {/* Soft dirt path color, slightly different from farm plots */}
      <meshStandardMaterial color="#d4a373" roughness={1} flatShading />
    </mesh>
  );
}

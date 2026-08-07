import React from 'react';
import { OrbitControls } from '@react-three/drei';

export default function CameraController() {
  return (
    <OrbitControls 
      makeDefault
      enableRotate={false}
      enablePan={true}
      enableZoom={true}
      minDistance={6}
      maxDistance={15}
      target={[0, 0, 0]}
    />
  );
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSeason } from '../SeasonContext';

export default function Lighting() {
  const ambientRef = useRef();
  const dirRef = useRef();
  const { config } = useSeason();

  useFrame((state, delta) => {
    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(config.ambient), delta * 2);
    }
    if (dirRef.current) {
      dirRef.current.color.lerp(new THREE.Color(config.sun), delta * 2);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={1.2} />
      <directionalLight
        ref={dirRef}
        castShadow
        position={[20, 30, 10]}
        intensity={2.5}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-20, 10, -20]} intensity={0.5} color="#e0f2fe" />
    </>
  );
}

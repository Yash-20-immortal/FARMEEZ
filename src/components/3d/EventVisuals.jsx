import React from 'react';
import { useGame } from '../GameContext';
import { Sparkles } from '@react-three/drei';
import Bird from './Bird';

export default function EventVisuals() {
  const { activeEvent } = useGame();

  if (!activeEvent) return null;

  return (
    <group>
      {activeEvent === 'heavy_rain' && (
        <Sparkles 
          count={400} 
          scale={[40, 20, 40]} 
          position={[0, 10, 0]} 
          size={4} 
          speed={3} 
          opacity={0.6} 
          color="#60a5fa" 
          noise={0}
        />
      )}

      {activeEvent === 'winter_frost' && (
        <Sparkles 
          count={250} 
          scale={[40, 20, 40]} 
          position={[0, 10, 0]} 
          size={3} 
          speed={0.2} 
          opacity={0.8} 
          color="#ffffff" 
        />
      )}

      {activeEvent === 'pest_attack' && (
        <Sparkles 
          count={100} 
          scale={[10, 2, 10]} 
          position={[3, 1, 3]} 
          size={4} 
          speed={2} 
          opacity={1} 
          color="#1e293b" 
          noise={10} 
        />
      )}

      {activeEvent === 'crop_disease' && (
        <Sparkles 
          count={150} 
          scale={[12, 1, 12]} 
          position={[3, 0.5, 3]} 
          size={6} 
          speed={0.5} 
          opacity={0.6} 
          color="#a855f7" 
        />
      )}

      {activeEvent === 'heat_wave' && (
        <directionalLight 
          position={[5, 10, -5]} 
          intensity={1.5} 
          color="#f59e0b" 
          castShadow 
        />
      )}

      {activeEvent === 'weed_growth' && (
        <group position={[3, 0, 3]}>
          {/* Simple low-poly weed representations */}
          {[...Array(15)].map((_, i) => (
            <mesh 
              key={i} 
              position={[(Math.random() - 0.5) * 8, 0, (Math.random() - 0.5) * 8]} 
              rotation={[0, Math.random() * Math.PI, 0]}
            >
              <coneGeometry args={[0.2, 0.6, 3]} />
              <meshStandardMaterial color="#14532d" />
            </mesh>
          ))}
        </group>
      )}

      {activeEvent === 'birds' && (
        <group position={[3, 0, 3]}>
          <Bird position={[0, 2, 0]} speed={1.5} radius={4} offset={0} />
          <Bird position={[1, 3, -1]} speed={1.2} radius={3} offset={Math.PI / 2} />
          <Bird position={[-1, 2.5, 2]} speed={1.8} radius={5} offset={Math.PI} />
          <Bird position={[0, 4, 1]} speed={1.4} radius={3.5} offset={2} />
        </group>
      )}
    </group>
  );
}

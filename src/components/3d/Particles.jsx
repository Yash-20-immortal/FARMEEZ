import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Particles({ position = [0, 0, 0], type = 'water', onComplete }) {
  const groupRef = useRef();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let count = 10;
    let lifeTime = 1500;

    if (type === 'water') {
      count = 15;
    } else if (type === 'harvest') {
      count = 8;
      lifeTime = 2000;
    } else if (type === 'dust') {
      count = 12;
      lifeTime = 1000;
    }

    const newParticles = Array.from({ length: count }).map((_, i) => {
      // Base config
      let p = {
        id: Math.random(),
        position: [ (Math.random() - 0.5) * 1.5, 0.5, (Math.random() - 0.5) * 1.5 ],
        velocity: [ (Math.random() - 0.5) * 0.5, 0, (Math.random() - 0.5) * 0.5 ],
        life: 1.0,
        color: '#ffffff',
        geometry: 'box',
        scale: 1
      };

      if (type === 'water') {
        p.position[1] = Math.random() * 2 + 1;
        p.velocity[1] = -Math.random() * 2 - 1;
        p.color = '#38bdf8';
        p.scale = 0.1;
      } else if (type === 'harvest') {
        p.position[1] = 0.2;
        p.velocity[1] = Math.random() * 3 + 2;
        // Mix of coins (gold, flat) and XP (blue, spheres)
        const isCoin = i % 2 === 0;
        p.color = isCoin ? '#fbbf24' : '#60a5fa';
        p.geometry = isCoin ? 'cylinder' : 'sphere';
        p.scale = isCoin ? 0.2 : 0.15;
      } else if (type === 'dust') {
        p.position[1] = 0.2;
        p.velocity[0] = (Math.random() - 0.5) * 2;
        p.velocity[1] = Math.random() * 1 + 0.5;
        p.velocity[2] = (Math.random() - 0.5) * 2;
        p.color = '#78350f';
        p.scale = Math.random() * 0.1 + 0.05;
      }
      return p;
    });

    setParticles(newParticles);

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, lifeTime);
    return () => clearTimeout(timer);
  }, [type, onComplete]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const children = groupRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const mesh = children[i];
      const p = particles[i];
      if (!p) continue;
      
      mesh.position.x += p.velocity[0] * delta;
      mesh.position.y += p.velocity[1] * delta;
      mesh.position.z += p.velocity[2] * delta;
      
      if (type === 'water') {
        p.velocity[1] -= 9.8 * delta; // Gravity
      } else if (type === 'harvest') {
        p.velocity[1] -= 2 * delta; // Slow down
        mesh.rotation.y += 5 * delta; // Spin coins
        mesh.rotation.x += 2 * delta;
      } else if (type === 'dust') {
        p.velocity[1] -= 4 * delta; // Gravity
        mesh.rotation.z += 2 * delta;
      }

      // Fade out
      p.life -= delta * (type === 'dust' ? 1.5 : 1);
      if (mesh.material) {
        mesh.material.opacity = Math.max(0, p.life);
      }
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {particles.map((p) => {
        let Geo = <boxGeometry args={[p.scale, p.scale, p.scale]} />;
        if (p.geometry === 'cylinder') Geo = <cylinderGeometry args={[p.scale, p.scale, 0.05, 12]} />;
        if (p.geometry === 'sphere') Geo = <sphereGeometry args={[p.scale, 6, 6]} />;

        return (
          <mesh key={p.id} position={p.position}>
            {Geo}
            <meshBasicMaterial color={p.color} transparent opacity={1} />
          </mesh>
        );
      })}
    </group>
  );
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function GeneratedModel({ 
  position = [0, 0.5, 0], 
  size = 1,
  color = '#4ecdc4'
}) {
  const modelRef = useRef();
  
  return (
    <mesh ref={modelRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.2}
        roughness={0.7}
      />
    </mesh>
  );
}
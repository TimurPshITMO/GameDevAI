import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import ModelTip from './ModelTip';

export default function GeneratedModel({ 
  path,
  targetSize = 5,
  wireframe = false
}) {

  try {
    const gltf = useGLTF(path);

    const wireframed = gltf.scene.clone();

    if (wireframed)
      wireframed.traverse((object) => {
        if (object.isMesh) {
            object.material = new THREE.MeshStandardMaterial({
            color: '#ff6b6b',
            wireframe: true,
            transparent: true,
            opacity: 0.8
          });
        }
      });
    
    return (
      <Suspense fallback={null} preset="sunset">
        <primitive
          object={wireframe?wireframed:gltf.scene}
          position={[0,0,0]}
          scale={3}
          castShadow
          receiveShadow
        />
      </Suspense>
    );
  } catch (err){
    return (
    <mesh position={[0,0,0]}>
      <ModelTip>
        <h3 style={{color:'#ff5252'}}>Не удалось загрузить модель :(</h3>
        <p style={{color:'#a7a7a7'}}>{err.message}</p>
      </ModelTip>
    </mesh>)
  }
} 
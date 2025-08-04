import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function GeneratedModel({ 
  path,
  targetSize = 5,
  wireframe = false
}) {

  const gltf = useGLTF(path);

  const [scale,setScale] = useState(0.0001);
  const [position, setPosition] = useState([0,0,0]);

  const box = new THREE.Box3().setFromObject(gltf.scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  useEffect(()=>{
    const newScale = targetSize / Math.max(size.x, size.y, size.z);
    setScale(newScale);
    setPosition([-center.x*newScale/2, -center.y*newScale/2, -center.z*newScale/2]);
  },[gltf]);

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
    <primitive
      object={wireframe?wireframed:gltf.scene}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
}
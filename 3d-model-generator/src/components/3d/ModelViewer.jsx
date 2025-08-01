// src/components/3d/ModelViewer.jsx
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera
} from '@react-three/drei';
import GeneratedModel from './GeneratedModel';
import { 
  Toolbar, 
  ToolGroup,
  SelectionTool, 
  PanTool, 
  ZoomTool, 
  RotateTool 
} from './toolbar';

export default function ModelViewer({ onAreaSelected }) {
  const [activeTool, setActiveTool] = useState('selection');
  const orbitControlsRef = useRef();
  const canvasRef = useRef();
  
  // Инициализация и обновление режимов камеры
  useEffect(() => {
    if (!orbitControlsRef.current) return;
    
    const controls = orbitControlsRef.current;
    
    switch (activeTool) {
      case 'selection':
        controls.mouseButtons = {
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN
        };
        break;
      default: // selection
        controls.mouseButtons = {
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN
        };
    }
    
    controls.update();
  }, [activeTool]);


  return (
    <div className="viewer-container" ref={canvasRef}>
      <Canvas 
        shadows
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <Environment preset="city" />
        
        <GeneratedModel position={[0, 0.5, 0]} size={1} />
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
        
        <OrbitControls 
          ref={orbitControlsRef}
          enableZoom={true} 
          enablePan={true} 
          minDistance={2} 
          maxDistance={10}
        />
      </Canvas>
      
      <Toolbar>
        <ToolGroup>
          <PanTool 
            active={activeTool === 'pan'} 
            onClick={() => setActiveTool('pan')} 
          />
          <RotateTool 
            active={activeTool === 'rotate'} 
            onClick={() => setActiveTool('rotate')} 
          />
          <ZoomTool 
            active={activeTool === 'zoom'} 
            onClick={() => setActiveTool('zoom')} 
          />
        </ToolGroup>
        
        <ToolGroup>
          <SelectionTool 
            active={activeTool === 'selection'} 
            onClick={() => setActiveTool('selection')} 
          />
        </ToolGroup>
      </Toolbar>
    </div>
  );
}
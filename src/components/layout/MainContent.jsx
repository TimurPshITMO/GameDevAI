// src/components/layout/MainContent.jsx
import React, { useEffect, useState } from 'react';
import { ModelViewer } from '../3d';
import ControlPanel from '../features/ControlPanel';
import ExportPanel from '../features/ExportPanel';
import { useGLTF } from '@react-three/drei';

export default function MainContent() {

  const [mainModelPath, setMainModelPath] = useState("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb")

  return (
    <div className="main-content">
      <div className="control-panel">
        <ControlPanel setMainModelPath={setMainModelPath}/>
      </div>
      
      <div>
        <ModelViewer mainModelPath={mainModelPath} setMainModelPath={setMainModelPath}/>
      </div>
    </div>
  );
}
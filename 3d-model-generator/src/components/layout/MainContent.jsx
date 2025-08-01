// src/components/layout/MainContent.jsx
import React from 'react';
import { ModelViewer } from '../3d';
import ControlPanel from '../features/ControlPanel';

export default function MainContent() {

  return (
    <div className="main-content">
      <div className="control-panel">
        <ControlPanel />
      </div>
      
      <div>
        <ModelViewer/>
      </div>
    </div>
  );
}
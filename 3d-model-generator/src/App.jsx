// src/App.jsx
import React from 'react';
import { Header, Footer, MainContent } from './components/layout';
import ControlPanel from './components/features/ControlPanel';
import { ModelViewer } from './components/3d';
import './App.css';
import { TbCube3dSphere } from 'react-icons/tb';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <MainContent/>
      <Footer />
    </div>
  );
}
// src/components/3d/ModelViewer.jsx
import React, { useState, useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera,
} from '@react-three/drei';
import GeneratedModel from './GeneratedModel';
import { 
  Toolbar, 
  ToolGroup,
  SelectionTool, 
  RotateTool, 
  UndoTool,
  ExportTool
} from './toolbar';
import SelectionInterface from './SelectionInterface';
import ModelTip from './ModelTip';
import Tip from './Tip';
import ExportModal from './ExportModal';
import MaterialTool from './toolbar/MaterialTool';

export default function ModelViewer({
    mainModelPath, setMainModelPath, disabled = false
}) {
  const [activeTool, setActiveTool] = useState('rotate');
  const [enableRotate, setEnableRotate] = useState(true);
  const orbitControlsRef = useRef();
  const canvasRef = useRef();
  const ccanvasRef = useRef();
  const [selectionStage, setSelectionStage] = useState(0);
  const [clearSelection, setClearSelection] = useState(()=>0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialType, setMaterialType] = useState(0);

  const tipHeading =
    (activeTool == 'rotate')?'Контроллер камеры':
    (activeTool == 'selection')?'Выделение области постгенерации':
    '';
  const tipContent = 
    (activeTool == 'rotate')?(
        <>
            <p><b>ЛКМ</b> для вращения</p>
            <p><b>ПКМ</b> для перемещения</p>
            <p><b>Колесико</b> для масштабирования</p>
        </>
    ):
    (activeTool == 'selection')?(
        <>
            <p>Сгенерированную модель можно локально отредактировать</p>
            <br/>
            {selectionStage == 1?(<p>Выберите <b>начальную точку области</b></p>):
            selectionStage == 2? (<p>Задайте <b>ширину</b> и <b>высоту</b></p>):
            selectionStage == 3? (<p>Выберите <b>начальную точку глубины</b></p>):
            selectionStage == 4? (<p>Задайте <b>глубину</b></p>):''}
        </>
    ):
    '';
      
      const handleExport = (format) => {
        console.log(`Запрошен экспорт в формате: ${format}`);
        
        // Здесь будет реализация экспорта
        setTimeout(() => {
          alert(`Экспорт в формате ${format.toUpperCase()} запрошен!`);
          setIsModalOpen(false);
        }, 800);
      };


  return (
    <div className="viewer-container" ref={canvasRef}>
        
      {!disabled && <Tip heading={tipHeading}>
        {tipContent}
      </Tip>}

      <Canvas 
        shadows
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        ref={ccanvasRef}
      >
        
        <PerspectiveCamera 
            makeDefault 
            fov={50}
            near={0.1}
            far={100}
            position={[3, 2, 5]}
        />

        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <Environment preset="city" />
        
        <SelectionInterface
            controls={orbitControlsRef}
            selectionStage={selectionStage}
            setSelectionStage={setSelectionStage}
            setActiveTool={setActiveTool}
            tipReq={(selectionStage == 5) && (! isModalOpen)}
            setMainModelPath={setMainModelPath}
            callback={setClearSelection}
        />

        <GeneratedModel path={mainModelPath} wireframe={materialType == 1}/>

        <OrbitControls 
          ref={orbitControlsRef}
          minDistance={2} 
          maxDistance={10}
          enableRotate = {activeTool !== 'selection'}
        />
      </Canvas>
      
      <Toolbar>
        <ToolGroup>
          <RotateTool 
            active={activeTool === 'rotate'} 
            onClick={() => {setActiveTool('rotate'); setSelectionStage((s)=> s==5? 5:0)}}
            disabled = {disabled}
          />
          <MaterialTool
            materialType={materialType}
            onClick={() => setMaterialType((prev)=>(prev+1)%2)}
            disabled={disabled}
          />
        </ToolGroup>
        
        <ToolGroup>
          <SelectionTool 
            active={activeTool === 'selection'} 
            onClick={() => {setActiveTool('selection'); setSelectionStage(1)}}
            disabled = {disabled}
          />
          <UndoTool
            disabled = {selectionStage < 2 || disabled}
            onClick={()=>{
                clearSelection();
                activeTool=='selection'?setSelectionStage(1):setSelectionStage(0);
            }}
          />
        </ToolGroup>

        <ToolGroup>
            <ExportTool onClick={() => setIsModalOpen(true)} disabled={disabled}/>
        </ToolGroup>
      </Toolbar>

        <ExportModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onExport={handleExport}
        />
    </div>
  );
}
// src/components/3d/ExportModal.jsx
import React, { useRef, useEffect } from 'react';
import './ExportModal.css';

const EXPORT_FORMATS = [
  { id: 'glb', name: 'GLB', description: 'Binary GLTF (рекомендуется)', icon: '📦' },
  { id: 'gltf', name: 'GLTF', description: 'Text-based GLTF', icon: '📄' },
  { id: 'obj', name: 'OBJ', description: 'Wavefront OBJ', icon: '🔷' },
  { id: 'stl', name: 'STL', description: 'Stereolithography', icon: '🔺' },
  { id: 'ply', name: 'PLY', description: 'Polygon File Format', icon: '⬢' }
];

export default function ExportModal({ isOpen, onClose, onExport }) {
  const modalRef = useRef();
  
  // Закрытие при клике вне модального окна
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="export-modal-overlay">
      <div className="export-modal" ref={modalRef}>
        <div className="modal-header">
          <h2>Экспорт 3D-модели</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <p className="modal-description">
            Выберите формат для экспорта вашей 3D-модели:
          </p>
          
          <div className="format-options">
            {EXPORT_FORMATS.map(format => (
              <button 
                key={format.id}
                className="format-option"
                onClick={() => onExport(format.id)}
              >
                <span className="format-icon">{format.icon}</span>
                <div className="format-info">
                  <h3>{format.name}</h3>
                  <p>{format.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
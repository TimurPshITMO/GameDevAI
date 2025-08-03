// src/components/features/ExportPanel.jsx
import React, { useState } from 'react';
import ExportModal from '../../components/3d/ExportModal';
import { FiDownload } from 'react-icons/fi';

export default function ExportPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleExport = (format) => {
    console.log(`Запрошен экспорт в формате: ${format}`);
    
    // Здесь будет реализация экспорта
    setTimeout(() => {
      alert(`Экспорт в формате ${format.toUpperCase()} запрошен!`);
      setIsModalOpen(false);
    }, 800);
  };
  
  return (
    <div className="export-panel">
      <button 
        className="export-trigger-btn"
        onClick={() => setIsModalOpen(true)}
      >
        <FiDownload size={20} />
        <span>Экспортировать модель</span>
      </button>
      
      <ExportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
}
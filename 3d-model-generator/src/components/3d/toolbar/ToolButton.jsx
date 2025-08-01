// src/components/3d/toolbar/ToolButton.jsx
import React from 'react';

export default function ToolButton({ 
  icon, 
  active = false, 
  onClick, 
  tooltip = '',
  size = 40
}) {
  return (
    <button 
      className={`tool-button ${active ? 'active' : ''}`}
      onClick={onClick}
      title={tooltip}
      style={{ width: size, height: size }}
    >
      {icon}
    </button>
  );
}
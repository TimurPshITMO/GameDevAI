// src/components/3d/toolbar/ToolButton.jsx
import React from 'react';

export default function ToolButton({ 
  icon: Icon,
  active = false, 
  onClick, 
  tooltip = '',
  size = 45,
  disabled = false,
  style
}) {
  return (
    <button 
      className={`tool-button ${active ? 'active' : ''}`}
      onClick={onClick}
      title={tooltip}
      style={style? style:{ width: size, height: size }}
      disabled={disabled}
    >
      {Icon && <Icon size={20} className="tool-icon" />}
    </button>
  );
}
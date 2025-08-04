import React from 'react';
import './toolbar.css';

export default function ToolBar({ children }) {
  return (
    <div className="toolbar-container">
      <div className="toolbar">
        {children}
      </div>
    </div>
  );
}
import React from 'react';

export default function ToolGroup({ children, title }) {
  return (
    <div className="tool-group">
      {title && <div className="tool-group-title">{title}</div>}
      <div className="tool-group-content">
        {children}
      </div>
    </div>
  );
}
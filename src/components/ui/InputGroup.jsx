import React from 'react';

export default function InputGroup({ label, children, className = '', active = false, onClick}) {
  return (
    <div className={`input-group ${className}`}>
      <label style={{fontSize: active ? "1.5rem" :""}} onClick={onClick}>{label}</label>
      {children}
    </div>
  );
}
import React from 'react';

export default function InputGroup({ label, children, className = '' }) {
  return (
    <div className={`input-group ${className}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}
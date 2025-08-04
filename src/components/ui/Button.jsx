import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  loadingText = 'Загрузка...',
  className = '',
  type = 'button'
}) {
  return (
    <button 
      type={type}
      className = {className}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? loadingText : children}
    </button>
  );
}
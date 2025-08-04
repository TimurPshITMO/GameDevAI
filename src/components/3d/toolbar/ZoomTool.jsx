import React from 'react';
import ToolButton from './ToolButton';

export default function ZoomTool({ active, onClick }) {
  return (
    <ToolButton
      icon="🔍"
      active={active}
      onClick={onClick}
      tooltip="Масштабирование"
    />
  );
}
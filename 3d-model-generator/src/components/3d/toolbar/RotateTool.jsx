import React from 'react';
import ToolButton from './ToolButton';

export default function RotateTool({ active, onClick }) {
  return (
    <ToolButton
      icon="🔄"
      active={active}
      onClick={onClick}
      tooltip="Вращение объекта"
    />
  );
}
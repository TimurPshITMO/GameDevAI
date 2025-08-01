import React from 'react';
import ToolButton from './ToolButton';

export default function PanTool({ active, onClick }) {
  return (
    <ToolButton
      icon="⥮"
      active={active}
      onClick={onClick}
      tooltip="Перемещение камеры"
    />
  );
}
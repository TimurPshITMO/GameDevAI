import React from 'react';
import ToolButton from './ToolButton';

export default function SelectionTool({ active, onClick }) {
  return (
    <ToolButton
      icon="⊡"
      active={active}
      onClick={onClick}
      tooltip="Выделение области (по умолчанию)"
    />
  );
}
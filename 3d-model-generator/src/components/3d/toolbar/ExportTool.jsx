import React from 'react';
import ToolButton from './ToolButton';

export default function ExportTool({ onClick }) {
  return (
    <ToolButton
      icon="📤"
      onClick={onClick}
      tooltip="Экспортировать модель"
    />
  );
}
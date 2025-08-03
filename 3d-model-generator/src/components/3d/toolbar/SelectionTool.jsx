import React from 'react';
import ToolButton from './ToolButton';
import { TbCube3dSphere } from 'react-icons/tb';

export default function SelectionTool({ active, onClick, disabled }) {
  return (
    <ToolButton
      icon={TbCube3dSphere}
      active={active}
      onClick={onClick}
      disabled={disabled}
      tooltip="Выделить область"
    />
  );
}
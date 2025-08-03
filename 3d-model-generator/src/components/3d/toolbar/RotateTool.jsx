import React from 'react';
import ToolButton from './ToolButton';
import { TbCube3dSphere } from "react-icons/tb";
import { PiCubeFocusFill  } from "react-icons/pi";

export default function RotateTool({ active, onClick, disabled }) {
  return (
    <ToolButton
      icon={PiCubeFocusFill }
      active={active}
      onClick={onClick}
      disabled={disabled}
      tooltip="Контроллер камеры (по умолчанию)"
    />
  );
}
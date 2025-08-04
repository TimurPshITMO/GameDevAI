import ToolButton from './ToolButton';
import { Md3dRotation } from "react-icons/md";

export default function RotateTool({ active, onClick, disabled }) {
  return (
    <ToolButton
      icon={ Md3dRotation  }
      active={active}
      onClick={onClick}
      disabled={disabled}
      tooltip="Контроллер камеры (по умолчанию)"
    />
  );
}
import ToolButton from "./ToolButton";
import { BsGrid3X3 } from "react-icons/bs";
import { PiCubeDuotone } from "react-icons/pi";

export default function MaterialTool({ onClick, disabled, materialType }) {
  
  const nextMaterial =
    materialType == 1?[PiCubeDuotone, 'текстуру']:
    [BsGrid3X3, 'сетку']
  return (
    <ToolButton
      icon={nextMaterial[0]}
      onClick={onClick}
      disabled={disabled}
      tooltip={`Включить ${nextMaterial[1]}`}
    />
  );
}
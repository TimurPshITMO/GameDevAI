import { TbCube3dSphereOff } from 'react-icons/tb';
import ToolButton from './ToolButton';

export default function UndoTool({ active, onClick, disabled }) {
  return (
    <ToolButton
      icon={TbCube3dSphereOff}
      active={active}
      onClick={onClick}
      tooltip="Отменить выделение"
      disabled={disabled}
      style={{
        width:45,
        height:45,  
        color:'white',
        backgroundColor:'#ff5252',
        border:'rgba(255, 107, 107, 0.3)'
    }}
    />
  );
}
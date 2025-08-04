import React, { useState } from 'react';
import ToolButton from './ToolButton';
import { MdFileDownload } from "react-icons/md";

export default function ExportTool({ onClick, disabled }) {
  return (
    <ToolButton
      icon={MdFileDownload}
      onClick={onClick}
      disabled={disabled}
      tooltip="Экспортировать модель"
    />
  );
}
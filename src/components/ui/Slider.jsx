import React from 'react';

export default function Slider({ label, min = 1, max = 100,  barLabels = [], value, setValue}) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type="range" min={min} max={max} value={value} onChange={(e)=>setValue(e.target.value)}/>
      <div className="quality-labels">
        {barLabels.map((barLabel, id) => (<span key={`slider_span${id}`}>{barLabel}</span>))}
      </div>
    </div>
  );
}
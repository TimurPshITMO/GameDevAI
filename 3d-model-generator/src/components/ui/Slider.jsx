import React from 'react';

export default function Slider({ label, min = 1, max = 100, defaultValue = 50,  barLabels = []}) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type="range" min={min} max={max} defaultValue={defaultValue} />
      <div className="quality-labels">
        {barLabels.map(barLabel => (<span>{barLabel}</span>))}
      </div>
    </div>
  );
}
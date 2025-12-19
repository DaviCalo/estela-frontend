import React from "react";
import "./InfoBlock.css";

function InfoBlock({ label, name, value, onChange, type }) {
  return (
    <div className="info-block">
      <label className="label">{label}</label>
      <input className="info-block-input" type={type} name={name} value={value || ""} onChange={onChange} />
    </div>
  );
}

export default InfoBlock;

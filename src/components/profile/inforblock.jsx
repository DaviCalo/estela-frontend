import React from "react";
import "./inforblock.css";

function InfoBlock({ label, name, value, onChange }) {
  return (
    <div className="info-block">
      <label className="label">{label}</label>
      <input type="text" name={name} value={value || ""} onChange={onChange} />
    </div>
  );
}

export default InfoBlock;

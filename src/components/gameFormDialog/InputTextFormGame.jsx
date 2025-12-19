import React from 'react';
import './InputTextFormGame.css';

const InputTextFormGame = ({ 
  label, 
  placeholder, 
  name, 
  value, 
  onChange, 
  isTextArea = false,
  typer = "text",
  required = false,
  width = "100%"
}) => {
  return (
    <div className="input-game-container" style={{ width: width }}>
      <label className="input-game-label">
        {label} {required && <span className="required-tag">(obrigatório)</span>}
      </label>
      
      {isTextArea ? (
        <textarea
          name={name}
          className="input-game-field textarea-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={typer}
          name={name}
          className="input-game-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default InputTextFormGame;
import React, { useState } from "react";
import { ReactComponent as EyesIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as EyesSlashIcon } from "../../assets/icons/eye-slash.svg";
import "./InfoBlock.css";

function InfoBlockPassoword({ label, name, value, onChange }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const inputType = isVisible ? "text" : "password";

  return (
    <div className="info-block">
      <label className="label">{label}</label>
      <div className="input-container-passoword">
        <input
          className="info-block-input"
          type={inputType}
          name={name}
          value={value || ""}
          onChange={onChange}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          minlength="8"
        />

        <button
          type="button"
          onClick={toggleVisibility}
          className="toggle-password"
          aria-label={isVisible ? "Esconder senha" : "Mostrar senha"}
        >
          {isVisible ? <EyesIcon /> : <EyesSlashIcon />}
        </button>
      </div>
    </div>
  );
}

export default InfoBlockPassoword;

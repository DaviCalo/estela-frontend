import React from 'react';
import './StepperBar.css';

const StepperBar = ({ currentStep }) => {
  const steps = ["Detalhes", "Características", "Mídias", "Especificações"];

  return (
    <div className="stepper-container">
      <div className="stepper-line-background"></div>
      <div 
        className="stepper-line-progress" 
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      ></div>

      <div className="steps-wrapper">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div 
              key={label} 
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >

              <span className="step-label">{label}</span>
              
              <div className="step-circle">
                {isCompleted ? (
                  <span className="check-icon">✓</span>
                ) : (
                  <div className="inner-circle"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperBar;
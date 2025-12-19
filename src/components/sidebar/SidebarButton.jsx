import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SidebarButton = ({ label, Icon, isActive, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonClasses = `${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`;
    return (
        <div 
            id="button-wrapper" 
            onClick={onClick}
            className={buttonClasses}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Icon className="input-icon" /> 
            <button
                id="sidebar-button"
                className="button-stitch"
                aria-current={isActive ? 'page' : undefined}
            >
                {label}
            </button>
        </div>
    );
};

SidebarButton.propTypes = {
  label: PropTypes.string.isRequired,
  Icon : PropTypes.elementType.isRequired,
  isActive : PropTypes.bool.isRequired,
  onClick : PropTypes.func
};

export default SidebarButton;
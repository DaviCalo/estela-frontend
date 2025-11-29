import React, { useState } from 'react';

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

export default SidebarButton;
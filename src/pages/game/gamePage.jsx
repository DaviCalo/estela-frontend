import React from "react";
import './gamePage.css';
import Sidebar from '../../components/sidebar/sidebar.jsx';

const GamePage = () => {
    return (
        <div className="home-container">
            <div id="full">
                <Sidebar activeItem="games" />
                <div id="content">
                   
                </div>
            </div>
        </div>
    );
};

export default GamePage;
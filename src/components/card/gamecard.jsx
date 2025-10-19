import cs from '../../../src/images/cs.png';
import React from "react";
import './gamecard.css';

const gamecard = () => {
    return (
        <div className="game-card" id="game-card">
            <img src={cs} alt="Logo cs"/>
            <span>Counter-Strike 2</span>
        </div>
    );
};

export default gamecard;
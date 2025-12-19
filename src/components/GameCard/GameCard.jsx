import cs from '../../../src/assets/images/cs.png';
import React from "react";
import './GameCard.css';

const GameCard = () => {
    return (
        <div className="game-card" id="game-card">
            <img src={cs} alt="Logo cs"/>
            <span>Counter-Strike 2</span>
        </div>
    );
};

export default GameCard;

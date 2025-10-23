import React from "react";
import './cardhome.css';
import gameHomeImg from '../../assets/images/game-home-img.png';

const Cardhome = () => {
    return (
        <div id="wrapper">
            <div id="imgholder"></div>
            <div id="gameinfo">
                <div id="img" style={{ backgroundImage: `url(${gameHomeImg})` }}>
                </div>
                <strong>Nome do Jogo</strong>
                <p>Preço</p>
            </div>
        </div>
    );
};

export default Cardhome;
import './sidebar.css';
import React from "react";
import logo from '../../../src/assets/images/logo.png';
import Gamecard from '../card/gamecard.jsx';

const Sidebar = () => {
    return (
        <div id="sidebar">
            <img src={logo} alt="Logo" id="Logo"/>
                <div id="sidebar-button-wrapper">
                    <div id="button-wrapper">
                        <span className="input-icon">@</span>
                         <button id="sidebar-button" className="button-stitch button-stitch-selected">LOJA</button>
                    </div>
                   <div id="button-wrapper">
                        <span className="input-icon">@</span>
                        <button id="sidebar-button" className="button-stitch button-stitch-unselected">MEU PERFIL</button>
                   </div>
                    <div id="button-wrapper">
                        <span className="input-icon">@</span>
                        <button id="sidebar-button" className="button-stitch button-stitch-unselected">LISTA DE DESEJOS</button>
                    </div>
                    
                </div>
                
            <div id="sidebar-games-wrapper">
                <p>MEUS JOGOS</p>
                <Gamecard />
                <Gamecard />
                <Gamecard />
            </div>
        </div>
    );
};

export default Sidebar;

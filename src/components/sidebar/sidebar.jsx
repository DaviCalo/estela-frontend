import React from "react";
import logo from "../../../src/assets/images/logo.png";
import Gamecard from "../card/gamecard.jsx";
import { ReactComponent as IconHome } from "../../assets/icons/home.svg";
import { ReactComponent as IconUser } from "../../assets/icons/contact-book.svg";
import { ReactComponent as IconHeart } from "../../assets/icons/heart.svg";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <img src={logo} alt="Logo" id="Logo" />
      <div id="sidebar-button-wrapper">
        <div id="button-wrapper">
          <IconHome className="input-icon" />
          <button
            id="sidebar-button"
            className="button-stitch button-stitch-selected"
          >LOJA
          </button>
        </div>
        <div className="line"></div>
        <div id="button-wrapper">
          <IconUser className="input-icon" />
          <button
            id="sidebar-button"
            className="button-stitch button-stitch-unselected"
          >MEU PERFIL
          </button>
        </div>
        <div className="line"></div>
        <div id="button-wrapper">
          <IconHeart className="input-icon" />
          <button
            id="sidebar-button"
            className="button-stitch button-stitch-unselected"
          >LISTA DE DESEJOS
          </button>
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

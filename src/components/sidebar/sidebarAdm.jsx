import React from "react";
import logo from "../../assets/images/logo.png";
import { ReactComponent as ReportIcon } from "../../assets/icons/report.svg";
import { ReactComponent as GameIcon } from "../../assets/icons/game.svg";
import { ReactComponent as CartIcon } from "../../assets/icons/cart.svg";
import { ReactComponent as  UserIcon } from "../../assets/icons/contact-book.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import "./sidebar.css";


const SidebarAdm = () => {
  return (
    <div id="sidebar">
      <img src={logo} alt="Logo" id="Logo" />
      <div id="sidebar-button-wrapper">
        <div id="button-wrapper">
          <ReportIcon className="input-icon" />
          <button
            id="sidebar-button"
            className="button-stitch button-stitch-selected"
          >RELATÓRIOS
          </button>
        </div>
        <div className="line"></div>
        <div id="button-wrapper">
          <GameIcon className="input-icon" />
          <button
            id="sidebar-button"
            className="button-stitch button-stitch-unselected"
          >JOGOS
          </button>
        </div>
        <div className="line"></div>
        <div id="button-wrapper">
          <CartIcon className="input-icon" />
          <button
            id="sidebar-button"
            className="button-stitch button-stitch-unselected"
          >VENDAS
          </button>
        </div>
        <div className="line"></div>
        <div id="button-wrapper">
          <UserIcon className="input-icon" />
          <button
            id="sidebar-button"
            className="button-stitch button-stitch-unselected"
          >MEU PERFIL
          </button>
        </div>
        <div className="line"></div>
        <div id="button-wrapper">
          <HomeIcon className="input-icon" />
          <button
            id="sidebar-button"
            className="button-stitch button-stitch-unselected"
          >LOJA
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdm;

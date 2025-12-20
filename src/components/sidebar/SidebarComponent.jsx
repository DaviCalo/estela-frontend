import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import PropTypes from 'prop-types';
import { ReactComponent as ReportIcon } from "../../assets/icons/report.svg";
import { ReactComponent as GameIcon } from "../../assets/icons/game.svg";
import { ReactComponent as CartIcon } from "../../assets/icons/cart.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/contact-book.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as IconHeart } from "../../assets/icons/heart.svg";
import Gamecard from "../GameCard/GameCard.jsx";
import LocalStorageManager from "../../utils/LocalStorageManager.js";
import SidebarButton from "./SidebarButton.jsx";
import "./Sidebar.css";

const menuItemsStandard = [
  { label: "LOJA", id: "store", Icon: HomeIcon, route: "/home" },
  { label: "MEU PERFIL", id: "profile", Icon: UserIcon, route: "/profile" },
  {
    label: "LISTA DE DESEJOS",
    id: "wishlist",
    Icon: IconHeart,
    route: "/wishlist",
  },
];

const menuItemsAdm = [
  { label: "RELATÓRIOS", id: "reports", Icon: ReportIcon, route: "/reports" },
  { label: "JOGOS", id: "games", Icon: GameIcon, route: "/games" },
  { label: "VENDAS", id: "sales", Icon: CartIcon, route: "/sales" },
  { label: "MEU PERFIL", id: "profile", Icon: UserIcon, route: "/profile" },
  { label: "LOJA", id: "store", Icon: HomeIcon, route: "/home" },
];

const SidebarComponent = ({activeItem}) => {
  const navigate = useNavigate();
  const [isAdm, setIsAdm] = useState(false);

  useEffect(() => {
    if (LocalStorageManager.getLoggedInUserFromLocalStorage() != null) {
      const user = LocalStorageManager.getLoggedInUserFromLocalStorage();
      if (user.isADM.toLowerCase() === 'true') {
        setIsAdm(true);
      }
    }
  }, [setIsAdm]);

  const menuItems = isAdm ? menuItemsAdm : menuItemsStandard;

  const handleItemClick = (route) => {
    navigate(route);
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <div id="sidebar">
      <img src={logo} alt="Logo" id="Logo" onClick={handleLogoClick}/>
      <div id="sidebar-button-wrapper">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <SidebarButton
              label={item.label}
              Icon={item.Icon}
              isActive={activeItem === item.id}
              onClick={() => handleItemClick(item.route)}
            />
            {index < menuItems.length - 1 && <div className="line"></div>}
          </React.Fragment>
        ))}
      </div>
      {!isAdm ? (
        <div id="sidebar-games-wrapper">
          <p>MEUS JOGOS</p>
          <Gamecard />
          <Gamecard />
          <Gamecard />
        </div>
      ) : null}
    </div>
  );
};

SidebarComponent.propTypes = {
  activeItem: PropTypes.string.isRequired
};

export default SidebarComponent;
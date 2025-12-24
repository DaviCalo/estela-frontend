import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../assets/images/logo.png";
import { ReactComponent as ReportIcon } from "../../assets/icons/report.svg";
import { ReactComponent as GameIcon } from "../../assets/icons/game.svg";
import { ReactComponent as CartIcon } from "../../assets/icons/cart.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/contact-book.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as IconHeart } from "../../assets/icons/heart.svg";
import GameCardSideBar from "../gameCardSideBar/GameCardSideBar.jsx";
import LocalStorageManager from "../../utils/LocalStorageManager.js";
import SidebarButton from "./SidebarButton.jsx";
import ApiGame from "../../api/ApiGame.js";
import { useLocation } from "react-router-dom";
import "./Sidebar.css";

const menuItemsStandard = [
  { label: "LOJA", id: "/store", Icon: HomeIcon, route: "/store" },
  { label: "MEU PERFIL", id: "/profile", Icon: UserIcon, route: "/profile" },
  {
    label: "LISTA DE DESEJOS",
    id: "/wishlist",
    Icon: IconHeart,
    route: "/wishlist",
  },
];

const menuItemsAdm = [
  { label: "RELATÓRIOS", id: "/reports", Icon: ReportIcon, route: "/reports" },
  { label: "JOGOS", id: "/games", Icon: GameIcon, route: "/games" },
  { label: "VENDAS", id: "/sales", Icon: CartIcon, route: "/sales" },
  { label: "MEU PERFIL", id: "/profile", Icon: UserIcon, route: "/profile" },
  { label: "LOJA", id: "/store", Icon: HomeIcon, route: "/store" },
];

const SidebarComponent = () => {
  const navigate = useNavigate();
  const [isAdm, setIsAdm] = useState(false);
  const [myGames, setMyGames] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const isLogged = LocalStorageManager.getLoggedInUserFromLocalStorage()
    ? true
    : false;

  useEffect(() => {
    if (LocalStorageManager.getLoggedInUserFromLocalStorage() != null) {
      const user = LocalStorageManager.getLoggedInUserFromLocalStorage();
      if (user.isADM.toLowerCase() === "true") {
        setIsAdm(true);
      } else {
        ApiGame.getMyGames(user.userid).then((data) => {
          if (data) {
            setMyGames(data);
          }
        });
      }
    }
  }, [isAdm]);

  const menuItems = isAdm ? menuItemsAdm : menuItemsStandard;

  const handleItemClick = (route) => {
    if (isLogged) {
      navigate(route);
    } else {
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    navigate("/store");
  };

  return (
    <div id="sidebar">
      <img src={logo} alt="Logo" id="Logo" onClick={handleLogoClick} />
      <div id="sidebar-button-wrapper">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <SidebarButton
              label={item.label}
              Icon={item.Icon}
              isActive={currentPath === item.id}
              onClick={() => handleItemClick(item.route)}
            />
            {index < menuItems.length - 1 && <div className="line"></div>}
          </React.Fragment>
        ))}
      </div>
      {!isAdm && myGames && isLogged ? (
        <div id="sidebar-games-wrapper">
          <p>MEUS JOGOS</p>
          {myGames.map((game) => (
            <GameCardSideBar
              key={game.gameId}
              name={game.name}
              urlImage={ApiGame.getMediaUrl(game.iconUrl)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

SidebarComponent.propTypes = {
  activeItem: PropTypes.string.isRequired,
};

export default SidebarComponent;

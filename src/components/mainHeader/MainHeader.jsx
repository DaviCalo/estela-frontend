import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocalStorageManager from "../../utils/LocalStorageManager.js";
import CartWidget from "../cartWidget/CartWidgetComponet.jsx";
import { ReactComponent as SearchIcon } from "../../assets/icons/bx-search-alt-2.svg";
import "./MainHeader.css";

const MainHeader = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [search, setsearch] = useState(false);
  const isLogged = LocalStorageManager.getLoggedInUserFromLocalStorage()
    ? true
    : false;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (search.trim() !== "") {
        navigate(`/search/${encodeURIComponent(search)}`);
      }
    }
  };

  return (
    <header
      className={`sticky-header ${
        isScrolled ? "header-solid" : "header-transparent"
      }`}
      id="mainHeader"
    >
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="search-input"
          onChange={(e) => setsearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="header-actions">
        <CartWidget onNavigateCart={() => navigate("/cart")} />
        {!isLogged && (
          <Link to="/login" className="login-link">
            <button className="login-btn">Fazer Login</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default MainHeader;

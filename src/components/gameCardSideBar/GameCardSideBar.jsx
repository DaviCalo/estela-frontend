import React from "react";
import "./GameCardSideBar.css";

const GameCardSideBar = ({ name, urlImage }) => {
  return (
    <div className="game-card">
      <img src={urlImage} alt={name} className="game-card-cover" />
      <span>{name}</span>
    </div>
  );
};

export default GameCardSideBar;

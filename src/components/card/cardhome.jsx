import React from "react";
import game from "../../api/game.js";
import "./cardhome.css";

const Cardhome = ({ name, price, coverUrl }) => {
  const coverImageUrl = game.getUrlCover(coverUrl);
  const priceBr = formatter.format(price);
  return (
    <div className="wrapper-card">
      <div className="img-cover-game">
        <img src={coverImageUrl} alt="" className="imgCover" />
      </div>
      <div className="game-info">
        <strong>{name}</strong>
        <p>{`R$ ${priceBr}`}</p>
      </div>
    </div>
  );
};

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default Cardhome;

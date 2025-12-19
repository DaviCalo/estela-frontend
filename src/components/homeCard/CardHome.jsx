import React from "react";
import game from "../../api/ApiGame.js";
import "./CardHome.css";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const CardHome = ({ name, price, coverUrl }) => {
  const coverImageUrl = game.getUrlCover(coverUrl);

  let priceText;
  let priceClass = "game-price";

  if (price === 0 || price === null || typeof price === "undefined") {
    priceText = "Gratuito";
    priceClass += " free-highlight";
  } else {
    const priceBr = formatter.format(price);
    priceText = `R$ ${priceBr}`;
  }

  return (
    <div className="game-card-wrapper">
      <div className="game-card-image-wrapper">
        <img
          src={coverImageUrl}
          alt={`Capa do jogo ${name}`}
          className="game-card-image"
        />
      </div>

      <div className="game-card-footer">
        <p className="game-card-title">{name}</p>
        <h2 className={priceClass}>{priceText}</h2>
      </div>
    </div>
  );
};

export default CardHome;

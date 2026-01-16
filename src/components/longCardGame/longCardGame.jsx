import React from "react";
import ApiGame from "../../api/ApiGame";
import {formatCurrency} from "../../utils/formatters"
import "./LongGameCard.css";

const LongGameCard = ({ game, onNavigate }) => {

  return (
    <div className="long-card-game" onClick={() => onNavigate(game.name)}>

      <div className="long-card-game-img-wrapper">
        <img 
          src={ApiGame.getMediaUrl(game.coverUrl)} 
          alt={game.name} 
          className="long-card-game-img" 
        />
      </div>

      <div className="long-card-game-info">
        <h3 className="long-card-game-name">{game.name}</h3>
      </div>

      <div className="long-card-game-price">
        {formatCurrency(game.price)}
      </div>
      
    </div>
  );
};

export default LongGameCard;
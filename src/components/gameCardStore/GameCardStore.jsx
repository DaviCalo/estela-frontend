import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HeartIcon } from "../../assets/icons/bx-heart.svg";
import { ReactComponent as HeartOutlineIcon } from "../../assets/icons/bx-heart-outline.svg";
import ApiGame from "../../api/ApiGame.js";
import ApiWishlist from "../../api/ApiWishlist.js";
import { formatCurrency } from "../../utils/formatters.js";
import LocalStorageManager from "../../utils/LocalStorageManager.js";
import "./GameCardStore.css";

const GameCardStore = ({
  gameId,
  name,
  price,
  coverUrl,
  isWishlist,
  onChamgeWislist,
}) => {
  const navigate = useNavigate();
  const coverImageUrl = ApiGame.getMediaUrl(coverUrl);

  let priceText;

  if (price === 0 || price === null || typeof price === "undefined") {
    priceText = "Gratuito";
  } else {
    priceText = formatCurrency(price);
  }

  const handleCardClick = () => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    navigate(`/game/${encodeURIComponent(slug)}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    const userId = LocalStorageManager.getLoggedInUserFromLocalStorage()
      ? LocalStorageManager.getLoggedInUserFromLocalStorage().userid
      : null;
    const isAdm = LocalStorageManager.getLoggedInUserFromLocalStorage()
      ? LocalStorageManager.getLoggedInUserFromLocalStorage().isADM
      : null;
    if (userId !== null && isAdm === "false") {
      if (isWishlist) {
        ApiWishlist.removeWishlist(userId, gameId);
      } else {
        ApiWishlist.addWishlist(userId, gameId);
      }
      setTimeout(() => {
        onChamgeWislist();
      }, 2000);
    } else if (isAdm === "false") {
      navigate("/login");
    }
  };

  return (
    <div className="game-card-store" onClick={handleCardClick}>
      <div className="game-card-store-image-wrapper">
        <img
          src={coverImageUrl}
          alt={`Capa do jogo ${name}`}
          className="game-card-store-image"
        />
      </div>
      <div className="game-card-store-footer">
        <h3 className="game-card-store-title">{name}</h3>
        <div className="game-card-store-actions">
          <button className="game-card-store-buy-btn">{priceText}</button>

          <button
            className="game-card-store-wishlist-btn"
            onClick={handleWishlistClick}
          >
            {isWishlist ? <HeartIcon /> : <HeartOutlineIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCardStore;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/bx-left-arrow-circle.svg";
import { ReactComponent as RightLeftIcon } from "../../assets/icons/bx-right-arrow-circle.svg";
import GameCardStore from "../gameCardStore/GameCardStore.jsx";
import "./GameCarousel.css";

const GameCarousel = ({
  title,
  subtitle,
  games,
  verifyWishlist,
  handleWishlistToggle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const itemsToShow = 3;
  const safeGames = games || [];
  const totalItems = safeGames.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - itemsToShow ? 0 : prevIndex + 1
    );
  }, [totalItems, itemsToShow]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - itemsToShow : prevIndex - 1
    );
  };

  useEffect(() => {
    if (totalItems <= itemsToShow) return;

    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [nextSlide, isHovered, totalItems, itemsToShow]);

  if (totalItems === 0) return null;

  return (
    <div
      className="game-carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="game-carousel-header">
        <div className="game-carousel-titles">
          <h2 className="game-carousel-title">{title}</h2>
          {subtitle && <p className="game-carousel-subtitle">{subtitle}</p>}
        </div>

        {totalItems > itemsToShow && (
          <div className="game-carousel-arrows">
            <button onClick={prevSlide} className="game-carousel-arrow-btn">
              <ArrowLeftIcon />
            </button>
            <button onClick={nextSlide} className="game-carousel-arrow-btn">
              <RightLeftIcon />
            </button>
          </div>
        )}
      </div>

      <div className="game-carousel-viewport">
        <div
          className="game-carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {safeGames.map((game) => (
            <div
              className="game-carousel-item"
              key={game.gameId}
              style={{ minWidth: `${100 / itemsToShow}%` }}
            >
              <GameCardStore
                gameId={game.gameId}
                name={game.name}
                price={game.price}
                coverUrl={game.coverUrl}
                isWishlist={verifyWishlist(game.gameId)}
                onChamgeWislist={handleWishlistToggle}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCarousel;

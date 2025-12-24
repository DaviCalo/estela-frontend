import React, { useState, useEffect, useMemo } from "react";
import banner from "../../assets/images/bannerhk.png";
import ApiGame from "../../api/ApiGame.js";
import ApiWishlist from "../../api/ApiWishlist.js";
import LocalStorageManager from "../../utils/LocalStorageManager.js";
import GameCarousel from "../../components/gameCarrosel/GameCarousel.jsx";
import "./StorePage.css";

const StorePage = () => {
  const [listOfGames, setListOfGames] = useState(null);
  const [listOfGamesInWishlist, setlistOfGamesInWishlist] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await ApiGame.getAllGame();
        setListOfGames(games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();

    const getWishlist = async (userId) => {
      try {
        const gamesWishlist = await ApiWishlist.getWishlist(userId);
        setlistOfGamesInWishlist(gamesWishlist);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    const userId = LocalStorageManager.getLoggedInUserFromLocalStorage()
      ? LocalStorageManager.getLoggedInUserFromLocalStorage().userid
      : null;
    if (userId !== null && userId !== "") {
      getWishlist(userId);
    }
  }, []);

  const isWishlist = (gameId) => {
    if (listOfGamesInWishlist !== undefined) {
      return listOfGamesInWishlist.some((item) => {
        return item === gameId;
      });
    } else {
      return false;
    }
  };

  const onGetWislist = async () => {
    try {
      const userId = LocalStorageManager.getLoggedInUserFromLocalStorage()
        ? LocalStorageManager.getLoggedInUserFromLocalStorage().userid
        : null;
      const gamesWishlist = await ApiWishlist.getWishlist(userId);
      setlistOfGamesInWishlist(gamesWishlist);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const freeGames = useMemo(() => {
    if (!listOfGames) return [];
    return listOfGames.filter(
      (game) => game.price === 0 || game.price === null
    );
  }, [listOfGames]);

  const recentGames = useMemo(() => {
    if (!listOfGames) return [];
    return [...listOfGames].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  }, [listOfGames]);

  return (
    <div>
      <img src={banner} alt="" id="banner-image" />

      <GameCarousel
        title="Lançamentos"
        subtitle="Veja as novidades populares desse mês"
        games={recentGames}
        verifyWishlist={isWishlist}
        handleWishlistToggle={onGetWislist}
      />

      <GameCarousel
        title="Jogos grátis"
        subtitle="Os gratuitos mais famosos da STELA!"
        games={freeGames}
        verifyWishlist={isWishlist}
        handleWishlistToggle={onGetWislist}
      />
    </div>
  );
};

export default StorePage;

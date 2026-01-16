import React, { useState, useEffect, useMemo } from "react";
import ApiGame from "../../api/ApiGame.js";
import ApiCheckout from "../../api/ApiCheckout.js";
import CartStorageManager from "../../utils/CartStorageManager.js";
import LocalStorageManager from "../../utils/LocalStorageManager.js";

const CartPage = () => {
  const [listOfCart, setListOfCart] = useState(
    CartStorageManager.getCartFromLocalStorage() || []
  );

  const [listOfGames, setListOfGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllGames = async () => {
      if (!listOfCart || listOfCart.length === 0) {
        setListOfGames([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const promises = listOfCart.map((gameId) =>
          ApiGame.getGameDetailsById(gameId)
        );
        const results = await Promise.all(promises);
        const validGames = results.filter(
          (game) => game !== null && game !== undefined
        );

        setListOfGames(validGames);
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGames();
  }, [listOfCart]);

  const handleRemoveItem = (gameId) => {
    const updatedCartIds = CartStorageManager.removeGameIdFromCart(gameId);
    setListOfCart(updatedCartIds);
    setListOfGames((prev) => prev.filter((game) => game.gameId !== gameId));
  };

  const totalValue = useMemo(() => {
    return listOfGames.reduce((acc, game) => acc + (game.price || 0), 0);
  }, [listOfGames]);

  const onBuy = async () => {
    const userId = LocalStorageManager.getLoggedInUserFromLocalStorage()
      ? LocalStorageManager.getLoggedInUserFromLocalStorage().userid
      : null;
    ApiCheckout.buyGames(userId, listOfCart);
  };

  if (loading) {
    return <div className="cart-loading">Carregando carrinho...</div>;
  }
  
  return (
      <div className="cart-page-list-container">
        {listOfGames.map((game) => (
      <div 
        key={game.gameId} 
        className="cart-item" 
        style={{ "--bg-image": `url(${ApiGame.getMediaUrl(game.urlCover)})` }}
      >
        <img src={ApiGame.getMediaUrl(game.urlCover)} alt={game.name} />
        <div>
          <h3>{game.name}</h3>
          <p>R${game.price}</p>
        </div>
        <button onClick={() => handleRemoveItem(game.gameId)}>Remover</button>
      </div>
    ))}
      </div>
  );
};

export default CartPage;

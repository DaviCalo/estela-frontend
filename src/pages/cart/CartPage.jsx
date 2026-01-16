import React, { useState, useEffect, useMemo } from "react";
import ApiGame from "../../api/ApiGame.js";
import ApiCheckout from "../../api/ApiCheckout.js";
import CartStorageManager from "../../utils/CartStorageManager.js";
import { useNotification } from "../../components/notificationProvider/NotificationProvider.jsx";
import LocalStorageManager from "../../utils/LocalStorageManager.js";
import CartCard from "../../components/cartCard/cartCard.jsx";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const [listOfCart, setListOfCart] = useState(
    CartStorageManager.getCartFromLocalStorage() || []
  );

  const navigate = useNavigate();

  const [listOfGames, setListOfGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

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
    try {
      const userId = LocalStorageManager.getLoggedInUserFromLocalStorage()
        ? LocalStorageManager.getLoggedInUserFromLocalStorage().userid
        : null;

      if (!userId) {
        navigate("/login");
        showNotification("Você precisa estar logado para comprar", "error");
        return;
      }
      await ApiCheckout.buyGames(userId, listOfCart);
      CartStorageManager.deleteCart();
      showNotification("Compra Realizada com sucesso", "success");
      navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <div className="cart-loading">Carregando carrinho...</div>;
  }

  return (
    <div className="cart-page-container">
      <h1 className="title-page">Carrinho de Compras</h1>

      <div className="cart-page-list-container">
          <CartCard  />
 

        <div className="cart-page-info">
          <h2>Leia antes de Comprar!</h2>
          <ul>
            <li>Na fase beta, é impossível para o usuário pedir reembolso.</li>
            <li>
              Verifique os requisitos de sistema e os Termos de Uso dos jogos
              escolhidos antes de realizar a compra.
            </li>
            <li>
              Todos os itens do nosso catálogo são entregues <u>apenas</u> de
              forma digital por meio de um download autorizado marcado e
              associado diretamente na conta do usuário, e estão sujeitos a
              política de reembolso.
            </li>
            <li>
              Os itens possuem limite de compra de apenas uma (1) unidade por
              conta.
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="cart-summary">
        <div className="total-section">
          <span className="total-label">Valor Total</span>
          <span className="total-amount">R$ {totalValue.toFixed(2)}</span>
        </div>
        <button className="buy-btn" onClick={onBuy}>
          Confirmar Compra
        </button>
      </div>
    </div>
  );
};

export default CartPage;

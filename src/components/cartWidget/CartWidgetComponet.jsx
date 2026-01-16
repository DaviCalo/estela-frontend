import React, { useState, useEffect } from "react";
import { ReactComponent as CartIcon } from "../../assets/icons/bx-cart.svg";
import CartStorageManager from "../../utils/CartStorageManager";

const CartWidget = ({ onNavigateCart }) => {
  const [cartCount, setCartCount] = useState(CartStorageManager.getCartCount());

  useEffect(() => {
    const updateCount = () => {
      setCartCount(CartStorageManager.getCartCount());
    };

    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <button className="cart-btn" onClick={onNavigateCart}>
      <CartIcon />
      {cartCount > 0 && (
        <span className="cart-badge">{cartCount}</span>
      )}
    </button>
  );
};

export default CartWidget;
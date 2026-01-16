const CartStorageManager = {
    saveCartToLocalStorage: (cartIds) => {
        try {
            localStorage.setItem("shoppingCart", JSON.stringify(cartIds));
            window.dispatchEvent(new Event("cartUpdated")); 
            
        } catch (error) {
            console.error("Could not save cart data to localStorage:", error);
        }
    },

    getCartFromLocalStorage: () => {
        try {
            const cartString = localStorage.getItem("shoppingCart");
            if (!cartString) return [];
            return JSON.parse(cartString);
        } catch (error) {
            localStorage.removeItem("shoppingCart");
            return [];
        }
    },

    addGameIdToCart: (gameId) => {
        const currentCart = CartStorageManager.getCartFromLocalStorage();
        if (!currentCart.includes(gameId)) {
            currentCart.push(gameId);
            CartStorageManager.saveCartToLocalStorage(currentCart);
            return true;
        }
        return false;
    },

    removeGameIdFromCart: (gameId) => {
        const currentCart = CartStorageManager.getCartFromLocalStorage();
        const newCart = currentCart.filter(id => id !== gameId);
        CartStorageManager.saveCartToLocalStorage(newCart);
        return newCart;
    },

    deleteCart: () =>{
         localStorage.setItem("shoppingCart", JSON.stringify([]));
    },
    
    getCartCount: () => {
        const cart = CartStorageManager.getCartFromLocalStorage();
        return cart ? cart.length : 0;
    }
}

export default CartStorageManager;
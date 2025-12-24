import ApiClient from "./base/ApiClient.js";

const ApiWishlist = {
  addWishlist: async (userId, gameId) => {
    try {
      await ApiClient.post(
        "/wishlist",
        { userId, gameId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      return error;
    }
  },
  removeWishlist: async (userId, gameId) => {
    try {
      await ApiClient.delete("/wishlist",
        {
          params: { userId, gameId }
        }
      );
      return true;
    } catch (error) {
      return error;
    }
  },
  getWishlist: async (userId) => {
    try {
      const response = await ApiClient.get("/wishlist", {
        params: { userId },
      });
      return response.data.games;
    } catch (error) {
      return error;
    }
  },
};

export default ApiWishlist;

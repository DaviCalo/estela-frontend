import ApiClient from './base/ApiClient.js';

const ApiCheckout = {
    buyGames: async (userId, gamesId) => {
        try {
            const response = await ApiClient.post(
                '/checkout',
                {
                    userId,
                    gamesId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data.games;
        } catch (error) {
            console.error('Erro ao efetuar a compra:', error);
            return false;
        }
    },
};

export default ApiCheckout;
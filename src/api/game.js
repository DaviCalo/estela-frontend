import apiClient from './base/apiClient.js';

const game = {
    getAllGame: async () => {
        try {
            const response = await apiClient.get(
                '/games'
            );

            return response.data.games;
        } catch (error) {
            console.error('Erro ao pegar todos os jogos:', error);
            return false;
        }
    },
    getUrlCover: (coverUrl) => {
        return `${apiClient.defaults.baseURL}/game/cover/${coverUrl}`;
    }
};

export default game;
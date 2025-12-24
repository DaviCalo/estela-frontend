import ApiClient from './base/ApiClient.js';
import { unformatCurrency } from '../utils/formatters.js';

const ApiGame = {
    getAllGame: async () => {
        try {
            const response = await ApiClient.get(
                '/games/list'
            );

            return response.data.games;
        } catch (error) {
            console.error('Erro ao pegar todos os jogos:', error);
            return false;
        }
    },
    getMediaUrl: (mediaName) => {
        return `${ApiClient.defaults.baseURL}/game/media/${mediaName}`;
    },
    registerGame: async (gameData) => {
        try {
            const formData = new FormData();
            formData.append('name', gameData.name);
            formData.append('description', gameData.description);
            formData.append('price', unformatCurrency(gameData.price.toString()));
            formData.append('categoryIds', JSON.stringify(gameData.categoryIds));
            formData.append('characteristics', gameData.characteristics);
            formData.append('hardDriveSpace', gameData.diskSpace);
            formData.append('graphicsCard', gameData.videoCard);
            formData.append('memory', gameData.memory);
            formData.append('operatingSystem', gameData.operatingSystem);
            formData.append('processor', gameData.processor);
            formData.append('coverGame', gameData.coverImage);
            formData.append('iconImage', gameData.iconImage);
            for (let i = 0; i < gameData.screenshots.length; i++) {
                formData.append(`screenshots_${i}`, gameData.screenshots[i]);
            }

            console.log("Enviando dados do jogo:", gameData);

            await ApiClient.post('/game', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return true;
        } catch (error) {
            console.error("Erro ao cadastrar jogo:", error);
            return false;
        }
    }, updateGame: async (gameId, gameData) => {
        const formData = new FormData();

        formData.append("gameId", gameId);

        formData.append("name", gameData.name);
        formData.append('price', unformatCurrency(gameData.price.toString()));
        formData.append("description", gameData.description);
        formData.append("characteristics", gameData.characteristics);

        formData.append("operatingSystem", gameData.operatingSystem);
        formData.append("processor", gameData.processor);
        formData.append("memory", gameData.memory);
        formData.append("hardDriveSpace", gameData.diskSpace);
        formData.append("graphicsCard", gameData.videoCard);

        if (gameData.categoryIds && gameData.categoryIds.length > 0) {
            formData.append('categoryIds', JSON.stringify(gameData.categoryIds));
        }

        if (gameData.coverImage instanceof File) {
            formData.append("coverGame", gameData.coverImage);
        }

        if (gameData.iconImage instanceof File) {
            formData.append("iconImage", gameData.iconImage);
        }

        for (let i = 0; i < gameData.screenshots.length; i++) {
            formData.append(`screenshots_${i}`, gameData.screenshots[i]);
        }

        try {
            await ApiClient.put('/game', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return true;
        } catch (error) {
            console.error("Erro de conexão:", error);
            return false;
        }
    },
    deleteById: async (gameId) => {
        try {
            await ApiClient.delete(
                `/game?gameId=${gameId}`
            );
            return true;
        } catch (error) {
            console.error('Erro ao deletar jogo:', error);
            return false;
        }
    },
    getListOfGameDetails: async () => {
        try {
            const response = await ApiClient.get(
                '/adm/games'
            );

            return response.data.games;
        } catch (error) {
            console.error('Erro ao pegar todos os jogos:', error);
            return false;
        }
    },
    getGameDetailsById: async (gameId) => {
        try {
            const response = await ApiClient.get(
                `/game?gameId=${gameId}`
            );
            return response.data.game;
        } catch (error) {
            console.error('Erro ao pegar detalhes do jogo:', error);
            return false;
        }
    },
    getMyGames: async (userId) => {
        try {
            const response = await ApiClient.get(
                `/my-games?userId=${userId}`
            );
            return response.data.games;
        } catch (error) {
            console.error('Erro ao pegar jogos do usuário:', error);
            return false;
        }
    },
};

export default ApiGame;
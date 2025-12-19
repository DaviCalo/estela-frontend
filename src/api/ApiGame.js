import ApiClient from './base/ApiClient.js';

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
    getUrlCover: (coverUrl) => {
        return `${ApiClient.defaults.baseURL}/game/cover/${coverUrl}`;
    },
    registerGame: async (gameData) => {
        try {
            const formData = new FormData();
            formData.append('name', gameData.name);
            formData.append('description', gameData.description);
            formData.append('price', gameData.price);

            formData.append('categoryIds', JSON.stringify(gameData.categoryIds));
            formData.append('characteristics', gameData.characteristics);
            formData.append('hardDriveSpace', gameData.diskSpace);
            formData.append('graphicsCard', gameData.videoCard);
            formData.append('memory', gameData.memory);
            formData.append('operatingSystem', gameData.operatingSystem);
            formData.append('processor', gameData.processor);
            formData.append('coverGame', gameData.coverImage);
            formData.append('iconImage', gameData.iconImage);
            for (let i = 0; i < gameData.media.length; i++) {
                formData.append(`mediaGame${i}`, gameData.media[i]);
            }

            console.log("Enviando dados do jogo:", gameData);

            const response = await ApiClient.post('/game', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.success;
        } catch (error) {
            console.error("Erro ao cadastrar jogo:", error);
            return false;
        }
    }, updateGame: async (gameId, gameData) => {
        const formData = new FormData();

        formData.append("gameId", gameId);

        formData.append("name", gameData.name);
        formData.append("price", gameData.price);
        formData.append("description", gameData.description);
        formData.append("characteristics", gameData.caracteristics);

        formData.append("operatingSystem", gameData.operatingSystem);
        formData.append("processor", gameData.processor);
        formData.append("memory", gameData.memory);
        formData.append("hardDriveSpace", gameData.diskSpace); 
        formData.append("graphicsCard", gameData.videoCard);

        if (gameData.categoryIds && gameData.categoryIds.length > 0) {
            formData.append("categoryIds", gameData.categoryIds.join(","));
        }

        if (gameData.coverImage instanceof File) {
            formData.append("coverGame", gameData.coverImage);
        }

        if (gameData.iconImage instanceof File) {
            formData.append("iconImage", gameData.iconImage);
        }

        if (gameData.media && Array.isArray(gameData.media)) {
            gameData.media.forEach((file, index) => {
                if (file instanceof File) {
                    formData.append(`midiaGame${index + 1}`, file);
                }
            });
        }

        try {
             const response = await ApiClient.put('/game', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.ok) {
                return true;
            } else {
                const errorData = await response.json();
                console.error("Erro no update:", errorData);
                return false;
            }
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
    }
};

export default ApiGame;
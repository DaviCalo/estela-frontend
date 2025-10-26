import apiClient from './base/apiClient';

const user = {
     updateUser: async (userid, email, password, name, nickname) => {
        try {
            const response = await apiClient.put(
                '/user',
                { userid, email, password, name, nickname  },
            );

            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil:', error);
            return false;
        }
    },

    getUserById: async (userid) => {
        try {
            const response = await apiClient.get(
                '/user',
                { params: { userid } }
            );

            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil:', error);
            return false;
        }
    },

    getProfilePhoto: (userid) => {
        return `http://localhost:8081/estela-backend/api/profilephoto?userid=${userid}`;
    },

    updateProfilePhoto: async (userid, newPhotoData) => {
        try {
            const response = await apiClient.put(
                '/profilephoto',
                newPhotoData,
                { params: { userid } }
            );

            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil:', error);
            return false;
        }
    },
};

export default user;
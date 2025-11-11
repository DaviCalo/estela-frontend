import apiClient from './base/apiClient';

const user = {
    updateUser: async (userId, email, password, name, nickname) => {
        try {
            await apiClient.put(
                '/user',
                { userId, email, password, name, nickname },
            );
            return true;
        } catch (error) {
            return error;
        }
    },

    getUserById: async (userid) => {
        try {
            const response = await apiClient.get(
                '/user',
                { params: { userid } }
            );

            return response.data.user;
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil:', error);
            return false;
        }
    },

    getProfilePhoto: (userid) => {
        return `http://localhost:8081/estela-backend/api/profilephoto?userid=${userid}&t=${Date.now()}`;
    },

    logoutUser: async () => {
        try {
            await apiClient.get('/logout');
            return true;
        } catch (error) {
            console.error('Erro no logout:', error);
            return false;
        }
    },

    deleteAccount: async (userid) => {
        try {
            await apiClient.delete(
                '/user',
                { params: { userid } }
            );
            return true;
        } catch (error) {
            console.error('Erro no delete da conta:', error);
            return false;
        }
    },

    updateProfilePhoto: async (userid, newPhotoData) => {
        const formData = new FormData();
        formData.append("profilephoto", newPhotoData);
        console.log(formData)
        try {
            await apiClient.put(
                '/profilephoto',
                formData,
                {
                    params: { userid },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return true;
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil:', error);
            return false;
        }
    },
};

export default user;
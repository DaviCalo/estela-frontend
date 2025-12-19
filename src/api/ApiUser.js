import ApiClient from './base/ApiClient.js';

const ApiUser = {
    updateUser: async (userId, email, password, name, nickname) => {
        try {
            await ApiClient.put(
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
            const response = await ApiClient.get(
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
        return `${ApiClient.defaults.baseURL}/profilephoto?userid=${userid}&t=${Date.now()}`
    },

    logoutUser: async () => {
        try {
            await ApiClient.get('/logout');
            return true;
        } catch (error) {
            console.error('Erro no logout:', error);
            return false;
        }
    },

    deleteAccount: async (userid) => {
        try {
            await ApiClient.delete(
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
            await ApiClient.put(
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

export default ApiUser;
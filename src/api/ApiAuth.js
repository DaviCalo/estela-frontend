import LocalStorageManager from "../utils/LocalStorageManager.js";
import ApiClient from './base/ApiClient.js'

const ApiAuth = {
    login: async (email, password) => {
        try {
            const response = await ApiClient.post('/login', { email, password });
            LocalStorageManager.saveUserDataToLocalStorage(response.data.user);
            return true;
        } catch (error) {
            console.error('Erro durante o login:', error);
            return false;
        }
    },

    register: async (email, password, name, nickname) => {
        try {
            const response = await ApiClient.post('/register', { email, password, name, nickname });
            LocalStorageManager.saveUserDataToLocalStorage(response.data.user);
            console.log('Usuário registrado com sucesso:', response.data.user);
        } catch (error) {
            console.error('Erro durante o login:', error);
            return false;
        }
        return true;
    },

    logout: async () => {
        try {
            await ApiClient.post('/logout');
            LocalStorageManager.clearUserDataFromLocalStorage();
        } catch (error) {
            console.error('Erro durante o logout:', error);
            return false;
        }
    },
};

export default ApiAuth;
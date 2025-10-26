import localStorageManager from '../utils/localStorageManager';
import apiClient from './base/apiClient';

const auth = {
    login: async (email, password) => {
        try {
            const response = await apiClient.post('/login', { email, password });
            localStorageManager.saveUserDataToLocalStorage(response.data.user);
            return true;
        } catch (error) {
            console.error('Erro durante o login:', error);
            return false;
        }
    },

    register: async (email, password, name, nickname) => {
        try {
            const response = await apiClient.post('/register', { email, password, name, nickname });
            localStorageManager.saveUserDataToLocalStorage(response.data.user);
        } catch (error) {
            console.error('Erro durante o login:', error);
            return false;
        }
        return true;
    },

    logout: async () => {
        try {
            await apiClient.post('/logout');
            localStorageManager.clearUserDataFromLocalStorage();
        } catch (error) {
            console.error('Erro durante o logout:', error);
            return false;
        }
    },
};

export default auth;
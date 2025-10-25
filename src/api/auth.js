import apiClient from './base/apiClient';

const auth = {
    login: async (email, password) => {
        try {
            const response = await apiClient.post('/login', { email, password });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha no login.');
            }

            document.cookie = `name=${response.data.name}; user_id=${response.data.user_id}; profile_image=${response.data.profile_image}; path=/; SameSite=Lax`;

            return true;
        } catch (error) {
            console.error('Erro durante o login:', error);
            return false;
        }
    },

    register: async (email, password, name, nickname) => {
        try {
            const response = await apiClient.post('/register', { email, password, name, nickname });

            if (!response.ok) {
                throw new Error('Falha no registro.');
            }

            document.cookie = `name=${response.data.name}; user_id=${response.data.user_id}; profile_image=${response.data.profile_image}; path=/; SameSite=Lax`;
        } catch (error) {
            console.error('Erro durante o login:', error);
            return false;
        }
        return true;

    },

    logout: async () => {
        const PAST_DATE = 'Thu, 01 Jan 1970 00:00:00 UTC';
        const COOKIE_OPTIONS = 'expires=' + PAST_DATE + '; path=/; SameSite=Lax';
        document.cookie = `name=; ${COOKIE_OPTIONS}`;
        document.cookie = `user_id=; ${COOKIE_OPTIONS}`;
        document.cookie = `profile_image=; ${COOKIE_OPTIONS}`;
    },
};

export default auth;
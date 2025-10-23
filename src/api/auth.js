const API_BASE_URL = 'https://localhost:8081/estela-backend/api';

const auth = {
    login: async (email, password) => {
        try{
             const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha no login.');
        }

        const data = await response.json();
        document.cookie = `name=${data.name}; user_id=${data.user_id}; profile_image=${data.profile_image}; path=/; SameSite=Lax`;
        } catch (error) {
            console.error('Erro durante o login:', error);
            return false;
        }
        return true;
    },

    register: async (email, password, name, nickname) => {
        try{
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(email, password, name, nickname),
            });

            if (!response.ok) {
                throw new Error('Falha no registro.');
            }

            const data = await response.json();
            document.cookie = `name=${data.name}; user_id=${data.user_id}; profile_image=${data.profile_image}; path=/; SameSite=Lax`;
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

    requestPasswordReset: async (email) => {
        await fetch(`${API_BASE_URL}/password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        return 'Link de recuperação enviado.';
    }
};

export default auth;
import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:8081/estela-backend/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/*
apiClient.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('authToken'); 
        
        if (authToken) {

            config.headers['Authorization'] = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);*/

export default apiClient;
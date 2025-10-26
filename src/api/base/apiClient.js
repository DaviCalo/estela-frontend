import axios from 'axios';

const BASE_URL = 'http://localhost:8081/estela-backend/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
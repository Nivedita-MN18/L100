import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Hardcoded for MVP, should be env var
    headers: {
        'Content-Type': 'application/json',
    },
});

export const shortenUrl = async (originalUrl, alias) => {
    try {
        const response = await api.post('/api/shorten', { url: originalUrl, alias });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getStats = async (shortCode) => {
    try {
        const response = await api.get(`/api/stats/${shortCode}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

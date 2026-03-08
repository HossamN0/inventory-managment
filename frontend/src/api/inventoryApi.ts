import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
});

export const getItems = async () => {
    const response = await api.get('/items');
    return response.data;
};

export const getItem = async (id: string) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
};

export const createItem = async (data: any) => {
    const response = await api.post('/items', data);
    return response.data;
};

export const updateItem = async ({ id, data }: { id: string; data: any }) => {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
};

export const deleteItem = async (id: string) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
};

export default api;

import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api/anh-dong';

export const getImages = async () => {
    const response = await axios.get(`${API_BASE_URL}/upload`);
    return response.data;
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const deleteImage = async (id) => {
    return axios.delete(`${API_BASE_URL}/delete/${id}`);
};
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const createAxiosInstance = (baseURL: string) =>
  axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

export const axiosInstance = createAxiosInstance(API_URL);


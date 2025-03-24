import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  });
  return instance;
};

export const axiosInstanceNoHeader = createAxiosInstance(API_URL);

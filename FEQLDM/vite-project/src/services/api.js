import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/api",
});

// Hàm gọi API chung cho các phương thức
const apiService = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

export default apiService;

import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// const API_URL = 'https://32e5-117-5-40-137.ngrok-free.app/api';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
};

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Skip token refresh for refresh token requests to avoid infinite loops
      const isRefreshRequest = error.config?.url?.includes('/refresh-token');
      if (isRefreshRequest) {
        return Promise.reject(error);
      }

      // Handle 401 Unauthorized error
      if (error.response?.status === 401) {
        if (isRefreshing) {
          // If token refresh is in progress, wait for the new token
          return new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              error.config.headers.Authorization = `Bearer ${token}`;
              resolve(instance(error.config));
            });
          });
        }

        isRefreshing = true;

        try {
          const response = await import('./authService').then(m => m.refreshToken());
          const newAccessToken = response.data.accessToken;
          isRefreshing = false;
          onTokenRefreshed(newAccessToken);
          
          // Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(error.config);
        } catch (refreshError) {
          isRefreshing = false;
          // If refresh token fails, redirect to login
          localStorage.clear();
          window.location.href = '#';
          return Promise.reject(refreshError);
        }
      }

      // Handle 403 Forbidden error
      if (error.response?.status === 403) {
        localStorage.clear();
        window.location.href = '#';
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance(API_URL);

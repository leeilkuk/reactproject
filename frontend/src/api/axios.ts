import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // The base URL for all API requests
});

// Request interceptor to add the JWT token to the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    // In a real app, you might get the token from a more secure place
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor to handle global errors, e.g., 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      // Clear token from storage by calling the store's logout action
      // This avoids direct manipulation of localStorage here
      // useAuthStore.getState().logout(); // This can cause import cycles, better to handle in components

      // A simple redirect is often sufficient
      if (window.location.pathname !== '/login') {
        // To prevent a hard reload which loses state, you might use a navigation utility
        // But for simplicity, a hard reload is clear.
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

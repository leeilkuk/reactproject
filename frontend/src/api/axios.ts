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
      // Clear token from storage
      localStorage.removeItem('access_token');
      // Redirect to login page, preventing a loop if already on login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

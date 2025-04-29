import axios from 'axios';

const API_URL = 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Important for CORS with credentials
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('Request headers:', config.headers);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    console.log('Response headers:', response.headers);
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      },
      responseHeaders: error.response?.headers
    });
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await api.post('/api/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'An error occurred during login' };
    }
  },

  signup: async (username, email, password) => {
    try {
      console.log('Attempting signup with:', { username, email });
      const response = await api.post('/api/auth/signup', { username, email, password });
      console.log('Signup response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'An error occurred during signup' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Add a test connection function
  testConnection: async () => {
    try {
      console.log('Testing connection to backend...');
      console.log('API URL:', API_URL);
      const response = await api.get('/');
      console.log('Backend connection test response:', response.data);
      return true;
    } catch (error) {
      console.error('Backend connection test failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
        responseHeaders: error.response?.headers
      });
      return false;
    }
  }
};

export default api; 
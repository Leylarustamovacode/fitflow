import axios from 'axios';

// Base URL for API
const API_BASE_URL = 'http://localhost:3000/user';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Get all users
  getUsers: () => api.get('/'),
  
  // Register new user
  register: (name, surname, email, password) => 
    api.post('/register', { name, surname, email, password }),
  
  // Login with email and password (first step)
  login: (email, password) => 
    api.post('/login', { email, password }),
  
  // Confirm with verification code (second step)
  confirm: (confirmPassword) => 
    api.post('/confirm', { confirmPassword }),
  
  // Test mail function (development only)
  testMail: () => api.post('/test-mail'),
};

// User API functions
export const userAPI = {
  // Get user profile
  getProfile: () => api.get('/profile'),
  
  // Update user profile
  updateProfile: (userData) => api.put('/profile', userData),
  
  // Change password
  changePassword: (currentPassword, newPassword) => 
    api.put('/password', { currentPassword, newPassword }),
  
  // Delete account
  deleteAccount: () => api.delete('/account'),
};

// Generic API functions
export const apiCall = {
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url),
};

export default api;
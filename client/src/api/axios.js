import axios from 'axios';

// Create an instance of axios with the backend URL
const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Matches your backend port
});

// Add a request interceptor to automatically attach the JWT token
API.interceptors.request.use((config) => {
    // This looks for the token we saved during login/verify OTP
    const token = localStorage.getItem('jwt_token'); 
    
    if (token) {
        // Attaches 'Bearer <token>' to the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;
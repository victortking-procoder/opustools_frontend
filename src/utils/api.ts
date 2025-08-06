import axios from 'axios';
import { API_BASE_URL } from '../api';

// Function to get CSRF token from cookie
function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Create a custom Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Crucial for sending and receiving session cookies (and csrftoken)
});

// Add a request interceptor to include the CSRF token and Authorization token
api.interceptors.request.use(config => {
    const csrftoken = getCookie('csrftoken');
    
    // Only add X-CSRFToken header for methods that are NOT 'GET', 'HEAD', 'OPTIONS'
    if (csrftoken && !['GET', 'HEAD', 'OPTIONS'].includes(config.method?.toUpperCase() || '')) {
        config.headers['X-CSRFToken'] = csrftoken;
    }

    // Add Authorization header if a token exists in localStorage
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        config.headers['Authorization'] = `Token ${authToken}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
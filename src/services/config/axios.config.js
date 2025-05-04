import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

/**
 * Create an axios instance with default configuration
 */
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // 30 seconds timeout
});

/**
 * Request interceptor for adding auth token
 */
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

/**
 * Response interceptor for handling common errors
 */
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx
        return response;
    }, 
    (error) => {
        // Handle specific error scenarios
        if (error.response) {
            // Server responded with a status code outside the range of 2xx
            const { status } = error.response;
            
            switch (status) {
                case 401:
                    // Unauthorized - token expired or invalid
                    localStorage.removeItem("token");
                    // Optionally redirect to login
                    if (!window.location.pathname.includes('/login')) {
                        window.location.href = "/login";
                    }
                    break;
                    
                case 403:
                    // Forbidden - CORS or CSRF issues
                    console.error("Access forbidden:", error.response.data);
                    break;
                    
                case 404:
                    // Not found
                    console.error("Resource not found:", error.response.data);
                    break;
                    
                case 500:
                    // Server error
                    console.error("Server error:", error.response.data);
                    break;
                    
                default:
                    // Other errors
                    console.error(`Error with status code ${status}:`, error.response.data);
            }
        } else if (error.request) {
            // Request was made but no response was received
            console.error("Network error - No response received:", error.request);
        } else {
            // Something happened in setting up the request
            console.error("Error setting up request:", error.message);
        }
        
        // Return a standardized error format
        return Promise.reject(
            error.response?.data?.error || 
            error.response?.data?.message || 
            error.message || 
            "An unexpected error occurred"
        );
    }
);

export default axiosInstance;
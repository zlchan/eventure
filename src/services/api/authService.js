import axiosInstance from '../config/axios.config';

/**
 * Authentication and user-related API calls
 */
export const authService = {
    /**
     * Login user and store JWT token
     * @param {string} username - User's username or email
     * @param {string} password - User's password
     * @returns {Promise<Object>} - User data and token
     */
    loginUser: async (username, password) => {
        try {
            const response = await axiosInstance.post("/auth/login", { username, password });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logoutUser: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            // Clear client-side token
            localStorage.removeItem('token');
            
            // Remove from axios headers
            delete axiosInstance.defaults.headers.common['Authorization'];
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
            window.location.href = '/login';
        }
    },
    /**
     * Register a new user
     * @param {Object} registrationData - User registration information
     * @param {string} registrationData.username - Username
     * @param {string} registrationData.email - Email
     * @param {string} registrationData.password - Password
     * @returns {Promise<Object>} - Response data
     */
    registerUser: async (registrationData) => {
        try {
            const response = await axiosInstance.post("/auth/signup", registrationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get current user information from token
     * @returns {Promise<Object>} - User profile data
     */
    getCurrentUser: async () => {
        try {
            const response = await axiosInstance.get("/users/me");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Verify if user is authenticated
     * @returns {boolean} - Authentication status
     */
    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    },

    /**
     * Logout user and remove JWT token
     * @param {boolean} redirect - Whether to redirect after logout
     */
    logoutUser: (redirect = true) => {
        localStorage.removeItem("token");
        if (redirect) {
            window.location.href = "/login";
        }
    },

    /**
     * Refresh the authentication token
     * @returns {Promise<Object>} - New token data
     */
    refreshToken: async () => {
        try {
            const response = await axiosInstance.post("/auth/refresh-token");
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

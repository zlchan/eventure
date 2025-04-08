import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// Axios instance with authorization header
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type":  "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
})

// Attach token to every request if exists
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

/** 
 * Handles user login
 * @param (string) username
 * @param (string) password
 * @returns (Promise)
 */

export const authService = {
    /**
     * Login user and store JWT token
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise}
     */
    loginUser: async (username, password) => {
        try {
            const response = await axiosInstance.post("/login", { username, password });
            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "Login fialed. Please try again.";
        }
    },
    /**
     * Register a new user
     * @param {Object} registrationData 
     * @returns {Promise}
     */
    registerUser: async (registrationData) => {
        try {
            const response = await axiosInstance.post("/auth/register", registrationData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "Registration failed. Please try again.";
        }
    },

    /**
     * Get current user from token
     * @returns {Promise}
     */
    getCurrentUser: async () => {
        try {
            const response = await axiosInstance.get("/user/me");
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Failed to fetch user";
        }
    },
    /**
     * Logout and remove JWT token
     */
    logoutUser: () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    },
    loginWithGoogle: () => {
        window.location.href = "/oauth2/authorization/google";
    }
}

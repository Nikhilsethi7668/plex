// src/services/authService.js
import api from "./Api";

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await api.post("/api/auth/register", userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Server Error");
    }
};

// Login User
export const loginUser = async (credentials) => {
    try {
        const response = await api.post("/api/auth/login", credentials);
        return response.data;
    } catch (error) {
        // Handle error when response is not available or other network issues
        throw error.response ? error.response.data : new Error("Server Error");
    }
};


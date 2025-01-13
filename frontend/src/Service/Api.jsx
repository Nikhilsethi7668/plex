// src/services/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://plexdubai1.onrender.com", // Base URL for backend
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

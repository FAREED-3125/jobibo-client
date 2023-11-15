// axiosWithCors.js

import axios from "axios";

const axiosWithCors = axios.create({
  withCredentials: true, // Include credentials with every request
  headers: {
    "Content-Type": "application/json", // Set your preferred content type
  },
});

// Apply the corsController middleware to every request
axiosWithCors.interceptors.request.use((config) => {
  // Add custom headers or other request modifications here if needed
  return config;
});

export default axiosWithCors;

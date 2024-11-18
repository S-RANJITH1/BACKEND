import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api', // Use an environment variable or default to localhost
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;

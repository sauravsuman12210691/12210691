import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // my backend port
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

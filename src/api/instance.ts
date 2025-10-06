// axiosConfig.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8888", // your backend URL
  // baseURL: "https://rental-room-backend.onrender.com", // your backend URL
});

export default instance;

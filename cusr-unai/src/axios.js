// axios.js
import axios from "axios";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://da37-103-149-116-70.ngrok-free.app/api", // Sesuaikan dengan URL API Laravel Anda
  timeout: 10000, // Sesuaikan dengan kebutuhan Anda
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Membuat interceptors untuk menambahkan token ke header permintaan
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Anda harus mengganti ini dengan cara Anda sendiri untuk mendapatkan token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const navigate = useNavigate();
    navigate("/login");
    return Promise.reject(error);
  }
);

export default instance; 

import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {

        const err = error.response.data.error;

        if (err?.code === "INVALID_TOKEN") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
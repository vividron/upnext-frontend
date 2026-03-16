import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
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

        // network error
        if (!navigator.onLine) {
            return Promise.reject(new Error("No internet connection. Please check your network."));
        }

        // request made but no response 
        if (!error.response) {
            return Promise.reject(new Error("Unable to reach server"));
        }

        const data = error.response.data;

        if (data?.code === "INVALID_TOKEN") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/signin";
            return Promise.reject(error);
        }

        if (error.response.status === 500) {
            return Promise.reject(new Error("Server error. Please try again later."));
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
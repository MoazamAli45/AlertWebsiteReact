import axios from 'axios';

const axiosParams = {
  baseURL: import.meta.env.VITE_BASE_API_URL,
};

const axiosInstance = axios.create(axiosParams);

export default axiosInstance;

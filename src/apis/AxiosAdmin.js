import axios from "axios";

const BASE_URL = 'https://toasis-server.onrender.com';
// const BASE_URL = 'http://localhost:5000';

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

axiosPublic.interceptors.request.use(
    async (config) => {
      if (!config.headers.Authorization) {
        const accesstoken = JSON.parse(localStorage?.getItem('adminToken'));

        const token=accesstoken?.token;
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

export default axiosPublic ;
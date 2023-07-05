import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

axiosPublic.interceptors.request.use(
    async (config) => {
      if (!config.headers.Authorization) {
        const accesstoken = JSON.parse(localStorage.getItem('adminToken'));
        console.log("accessToken", accesstoken.token)
        const token=accesstoken.token;
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

export default axiosPublic ;
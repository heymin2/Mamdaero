import axios from 'axios';
import useAuthStore from '@/stores/authStore';

const axiosInstance = axios.create({
  baseURL: 'https://mamdaero.o-r.kr/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = useAuthStore.getState().getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use();

export default axiosInstance;

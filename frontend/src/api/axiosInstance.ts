import axios from 'axios';
import useAuthStore from '@/stores/authStore';

const axiosInstance = axios.create({
  baseURL: 'https://mamdaero.o-r.kr/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization':
      'Bearer sk-Nfkc_qzkHma_VyNhljbKN2a4WUcFbDa23Gwzg05tWjT3BlbkFJ-MFd-YvFkOrtM6XK5WPq5O8mppFdns5MyIUSAvInYA',
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

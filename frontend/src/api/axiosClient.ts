import axios from 'axios';

// During local development, this might fall back to '/api' (handled by Vite proxy).
// On Cloudflare, it will use the public URL injected during the build process.
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  // Here should come example. withCredentials: true
});

axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token') ?? localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;

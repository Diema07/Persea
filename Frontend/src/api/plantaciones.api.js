// src/api/plantaciones.api.js
import axios from 'axios';

// Configuración global de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/plantaciones/api/v1/Plantacion/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1] || ''
  }
});

// Interceptor para añadir el token de autenticación
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const getAllTasks = () => apiClient.get('/');
export const createTask = (taskData) => apiClient.post('/', taskData);
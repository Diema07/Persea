// src/api/poda.api.js
import axios from 'axios';

// Instancia de Axios para Poda
const podaAPI = axios.create({
  baseURL: 'http://localhost:8000/mantenimiento/api/v1/Poda/',
  withCredentials: true,
});

// Obtener CSRF token
const getCSRFToken = async () => {
  const response = await axios.get('http://localhost:8000/api/csrf/', { withCredentials: true });
  return response.data.csrfToken;
};

// 1) Obtener registros por ID de plantación (GET)
export const getPodaByPlantacionId = async (plantacionId) => {
  try {
    // Ejemplo: /?plantacionId=3
    const response = await podaAPI.get(`/?plantacionId=${plantacionId}`);
    return response.data; // array de Poda
  } catch (error) {
    console.error('Error al obtener Poda:', error.response?.data || error);
    throw error;
  }
};

// 2) Obtener detalle de un registro por su ID (GET)
export const getPodaById = async (id) => {
  try {
    // Ejemplo: /5/
    const response = await podaAPI.get(`${id}/`);
    return response.data; // objeto Poda
  } catch (error) {
    console.error('Error al obtener detalle de Poda:', error.response?.data || error);
    throw error;
  }
};

// 3) Actualizar (PATCH) un registro de Poda
export const patchPoda = async (id, data) => {
  try {
    const csrfToken = await getCSRFToken();
    // PATCH /5/
    const response = await podaAPI.patch(`${id}/`, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar Poda:', error.response?.data || error);
    throw error;
  }
};

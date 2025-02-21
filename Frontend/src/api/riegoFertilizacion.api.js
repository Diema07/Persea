// src/api/riegoFertilizacion.api.js
import axios from 'axios';

// Instancia de Axios para RiegoFertilizacion
const riegoAPI = axios.create({
  baseURL: 'http://localhost:8000/mantenimiento/api/v1/RiegoFertilizacion/', // Ajusta a tu backend
  withCredentials: true,
});

// Obtener CSRF token
const getCSRFToken = async () => {
  const response = await axios.get('http://localhost:8000/api/csrf/', { withCredentials: true });
  return response.data.csrfToken;
};

// 1) Obtener registros por ID de plantación (GET)
export const getRiegoByPlantacionId = async (plantacionId) => {
  try {
    // Ejemplo: /?plantacionId=3
    const response = await riegoAPI.get(`/?plantacionId=${plantacionId}`);
    return response.data; // array de RiegoFertilizacion
  } catch (error) {
    console.error('Error al obtener Riego/Fertilización:', error.response?.data || error);
    throw error;
  }
};

// 2) Obtener detalle de un registro por su ID (GET)
export const getRiegoFertilizacionById = async (id) => {
  try {
    // Ejemplo: /5/
    const response = await riegoAPI.get(`${id}/`);
    return response.data; // objeto RiegoFertilizacion
  } catch (error) {
    console.error('Error al obtener detalle de Riego/Fertilización:', error.response?.data || error);
    throw error;
  }
};

// 3) Actualizar (PATCH) un registro de RiegoFertilizacion
export const patchRiegoFertilizacion = async (id, data) => {
  try {
    const csrfToken = await getCSRFToken();
    // PATCH /5/
    const response = await riegoAPI.patch(`${id}/`, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar Riego/Fertilización:', error.response?.data || error);
    throw error;
  }
};

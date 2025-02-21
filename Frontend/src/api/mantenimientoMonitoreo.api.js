// src/api/mantenimiento.api.js
import axios from 'axios';

// Instancia de Axios para Mantenimiento/Monitoreo
const mantenimientoAPI = axios.create({
  baseURL: 'http://localhost:8000/mantenimiento/api/v1/MantenimientoMonitoreo/',
  withCredentials: true,
});

// Obtener CSRF token
const getCSRFToken = async () => {
  const response = await axios.get('http://localhost:8000/api/csrf/', { withCredentials: true });
  return response.data.csrfToken;
};

export const getAllMantenimiento = async () => {
    try {
        const response = await mantenimientoAPI.get('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las preparaciones:', error.response?.data || error);
    }
};

// 1) Obtener registros por ID de plantación (GET)
export const getMantenimientoByPlantacionId = async (plantacionId) => {
  try {
    const response = await mantenimientoAPI.get(`/?plantacionId=${plantacionId}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener Mantenimiento/Monitoreo:', error.response?.data || error);
    throw error;
  }
};


export const patchMantenimientoMonitoreo = async (plantacionId, data) => {
  try {
    
    const plantacionIdNumber = Number(plantacionId);
    if (isNaN(plantacionIdNumber)) {
      throw new Error("plantacionId debe ser un número");
    }

    const csrfToken = await getCSRFToken();

    const response = await mantenimientoAPI.patch(`${plantacionIdNumber}/`, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar Mantenimiento/Monitoreo:', error.response?.data || error);
    throw error;
  }
};

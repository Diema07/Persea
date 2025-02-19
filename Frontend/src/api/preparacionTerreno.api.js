import axios from 'axios';

// 1. Crear una instancia de Axios con configuración global
const preparacionAPI = axios.create({
    baseURL: 'http://localhost:8000/produccion/api/v1/PreparacionTerreno/',
    withCredentials: true,  // Permite el uso de cookies
});

// 2. Función para obtener el CSRF token (igual que en plantaciones.api.js)
const getCSRFToken = async () => {
    const response = await axios.get('http://localhost:8000/api/csrf/', { withCredentials: true });
    return response.data.csrfToken;
};

// 3. Obtener todas las preparaciones (opcional, por si lo necesitas)
export const getAllPreparaciones = async () => {
    try {
        const response = await preparacionAPI.get('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las preparaciones:', error.response?.data || error);
    }
};

// 4. Obtener preparaciones filtradas por ID de plantación
export const getPreparacionByPlantacionId = async (plantacionId) => {
    try {
        const response = await preparacionAPI.get(`/?plantacionId=${plantacionId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la preparación de terreno:', error.response?.data || error);
    }
};

export const patchPreparacion = async (id, data) => {
    try {
      const csrfToken = await getCSRFToken();
      // PATCH a /produccion/api/v1/PreparacionTerreno/<id>/
      const response = await preparacionAPI.patch(`/${id}/`, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la preparación de terreno:', error);
      throw error;
    }
  };
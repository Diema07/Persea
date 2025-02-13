import axios from 'axios';

const taskAPI = axios.create({
    baseURL: 'http://localhost:8000/plantaciones/api/v1/Plantacion/',
    withCredentials: true,  // Permitir el envío de cookies de sesión
});

export const getAllTasks = () => taskAPI.get('/');  // No se necesita pasar config
export const createTask = async (task) => {
    try {
        const response = await taskAPI.post('/', task);
        console.log(response.data);
    } catch (error) {
        console.error('Error al crear la plantación:', error);
    }
};

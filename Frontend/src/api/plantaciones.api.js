import axios from 'axios';

const taskAPI = axios.create({
    baseURL: 'http://localhost:8000/plantaciones/api/v1/Plantacion/',
});

export const getAllTasks = (config) => taskAPI.get('/', config);
export const createTask = (task, config) => taskAPI.post('/', task, config);
    
import axios from 'axios';

const API_URL = 'http://localhost:8000/produccion/api/v1/PreparacionTerreno';

export const getPreparacionByPlantacionId = (plantacionId) => {
  return axios.get(`${API_URL}?plantacionId=${plantacionId}`);
};

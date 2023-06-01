import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.146:5000/user/api', // Reemplaza con la URL de tu backend
});

export default api;

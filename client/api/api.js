import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.11:5000/user/api', // Reemplaza con la URL de tu backend Estive
  // baseURL: 'http://192.168.0.146:5000/user/api', // Reemplaza con la URL de tu backend Miguel
  //baseURL: 'https://appsyncroniza-production.up.railway.app/user/api' //! URL PARA DEPLOY
 // baseURL: 'http://192.168.1.176:5000/user/api', // Reemplaza con la URL de tu backend Miguel Chile
 // baseURL: 'http://192.168.1.176:5000/user/api', // Reemplaza con la URL de tu backend Miguel Chile
  
});

export default api;

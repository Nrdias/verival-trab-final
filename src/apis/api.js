import axios from 'axios';
import address from '../constants/connection'

// Insira seu IP no arquivo connection.js em constants e rode o backend local
const api = axios.create({
    baseURL: `https://staging.sembarreiras.me`
});

export default api;

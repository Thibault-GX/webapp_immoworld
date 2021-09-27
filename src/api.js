import axios from 'axios';
axios.defaults.withCredentials = true;


const api = axios.create({
    baseURL: 'https://1888a1b.online-server.cloud/api/v1/'
});

export default api;

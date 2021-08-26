import axios from 'axios';
axios.defaults.withCredentials = true;


const api = axios.create({
    baseURL: 'https://immoworld-api.herokuapp.com/api/v1'
});

export default api;

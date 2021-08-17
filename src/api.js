import axios from 'axios';

const api = axios.create({
    baseURL: 'https://immoworld-api.herokuapp.com/api/v1'
});

export default api;

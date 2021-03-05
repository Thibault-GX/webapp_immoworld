import axios from 'axios';

const api = axios.create({
    baseURL: 'http://immoworld.manusien-ecolelamanu.fr/api/v1/'
});

export default api;

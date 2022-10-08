import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || window.location.host,
    withCredentials: true,
});

export default instance;
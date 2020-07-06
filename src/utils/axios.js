import axios from 'axios';

// Add custom configuration here.
const axiosInstance = axios.create({

    baseURL: process.env.VUE_APP_CONTEXT,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('x-auth-token')
    },

});

export default axiosInstance;

import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

instance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.token);
    if (config.headers) {
        config.headers.token = `Bearer ${token}` || ''
    }
    return config
})

instance.interceptors.response.use((response) => response, (error) => Promise.reject(error.response))

export default instance
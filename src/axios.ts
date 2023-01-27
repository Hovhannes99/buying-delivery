import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

instance.interceptors.request.use((config) => {
    const token = localStorage.accessToken
    if (config.headers) {
        config.headers.Authorization = `Bearer ${token}` || ''
    }
    return config
})

instance.interceptors.response.use((response) => response, (error) => Promise.reject(error.response))

export default instance
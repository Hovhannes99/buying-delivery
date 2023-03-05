import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

const token = localStorage.token;

if(token){
    instance.interceptors.request.use((config) => {
        if (config.headers) {
            config.headers.token = `Bearer ${JSON.parse(token)}` || ''
        }
        return config
    })
}

instance.interceptors.response.use((response) => response, (error) => Promise.reject(error.response))

export default instance
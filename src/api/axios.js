import axios from 'axios'
import useAuthStore from '../store/authStore'

const api = axios.create({
    baseURL: 'https://blog-2wmb.onrender.com',
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if(token) {
        config.headers['x-auth-token'] = token
    }
    return config
})

export default api
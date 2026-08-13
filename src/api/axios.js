import axios from 'axios'
import useAuthStore from '../store/authStore'

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if(token) {
        config.headers['x-auth-token'] = token
    }
    return config
})

export default api
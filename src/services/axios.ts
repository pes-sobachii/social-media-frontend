import axios, {InternalAxiosRequestConfig} from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

instance.interceptors.request.use((config:InternalAxiosRequestConfig) => {
    const token: string | null = window.localStorage.getItem('token')
    config.headers.Authorization = token
    return config
})

export default instance
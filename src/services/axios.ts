import axios, {InternalAxiosRequestConfig} from "axios";
import {IAuthUser} from "../Types/UserTypes";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

instance.interceptors.request.use((config:InternalAxiosRequestConfig) => {
    // window.localStorage.setItem('authUser', '')
    // const user: string | null = window.localStorage.getItem('authUser')
    const token: string | null = window.localStorage.getItem('token')
    config.headers.Authorization = token
    // config.headers.Authorization = user ? JSON.parse(user).token : null
    return config
})

export default instance
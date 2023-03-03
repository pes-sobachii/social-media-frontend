import axios from './axios'
import {ILogin, IRegisterUser} from "../Types/UserTypes";

export const UsersService = {
    async register(userData: IRegisterUser) {
        return await axios.post(`/register`, userData);
    },
    async login(userData: ILogin) {
        return await axios.post(`/login`, userData);
    },
    async getUser(id: String) {
        const {data} = await axios.get(`/users/${id}`);
        return data
    },
    async getMe() {
        const {data} = await axios.get(`/auth/me`);
        return data
    },
    async searchUsers(query: String) {
        if (!query) {
            return []
        }
        const {data} = await axios.get(`/search/${query}`);
        return data
    },
    async toggleFollow({id, follow}:{id: String, follow: boolean}) {
        const {data} = await axios.put(`/follow`, {
            id, follow
        });
        return data
    },
}
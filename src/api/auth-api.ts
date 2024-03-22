import axios, {AxiosResponse} from 'axios';
import {ResponseType} from "./todolists-api";
import {LoginType} from "../components/Login/Login";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

// types
type UserResponseType = {
    id: number
    email: string
    login: string
}

// api
export const authAPI = {
    login(loginData: LoginType) {
        return instance.post <ResponseType<{ userId?: number }>,
            AxiosResponse<ResponseType<{ userId: number }>>, LoginType>(`/auth/login`, loginData)
    },
    me() {
        return instance.get<ResponseType<UserResponseType>>('/auth/me')
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`)
    },
}
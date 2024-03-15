import axios from 'axios';
import {ResponseType} from "./tasks-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '144bee9a-122b-4e42-ab6f-42430cedca0a'
    }
})

// types
export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

// api
export const authAPI = {
    login(authData: AuthDataType) {
        return instance.post<ResponseType<{ userId?: number }>>('/auth/login', authData)
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('/auth/me')
    },
    logout(){
        return instance.delete<ResponseType>('auth/login')
    }
}
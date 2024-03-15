import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '144bee9a-122b-4e42-ab6f-42430cedca0a'
    }
})

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export enum Result_Code{
    SUCCEEDED,
    ERROR
}

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
        // Типизируя, мы говорим, что axios вернет промис,
        // который зарезолвится response от axios, внутри которого будет поле date типа TodolistType[]
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    updateTodolist(id: string, title: string) {
        return instance
            .put<ResponseType>(`/todo-lists/${id}`, {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    }
}
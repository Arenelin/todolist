import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})


// types
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

type ResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}
type TasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type DomainModelTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

// api
export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: DomainModelTaskType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
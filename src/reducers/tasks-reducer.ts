import {TaskObjectType} from '../App';
import {v1} from 'uuid';
import {AddNewTodolist, DeleteTodolist, todolistId_1, todolistId_2} from './todolists-reducer';

const initialValue: TaskObjectType = {
    [todolistId_1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React&TypeScript', isDone: false}
    ],
    [todolistId_2]: [
        {id: v1(), title: 'Milk', isDone: false},
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Apple', isDone: false}
    ],
}

export const tasksReducer = (state: TaskObjectType = initialValue, action: TasksReducer): TaskObjectType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId],
                    {id: v1(), title: action.payload.title, isDone: false}
                ]
            }
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id ? {...t, isDone: action.payload.newValue} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []}
        case 'DELETE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        default:
            return state
    }
}

type TasksReducer =
    AddNewTask
    | DeleteTask
    | ChangeStatusForTask
    | ChangeTitleForTask
    | AddNewTodolist
    | DeleteTodolist

type AddNewTask = ReturnType<typeof addNewTask>
type DeleteTask = ReturnType<typeof deleteTask>
type ChangeStatusForTask = ReturnType<typeof changeStatusForTask>
type ChangeTitleForTask = ReturnType<typeof changeTitleForTask>

export const addNewTask = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    } as const
}

export const deleteTask = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, id}
    } as const
}

export const changeStatusForTask = (todolistId: string, id: string, newValue: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            id,
            newValue
        }
    } as const
}
export const changeTitleForTask = (todolistId: string, id: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            id,
            title
        }
    } as const
}
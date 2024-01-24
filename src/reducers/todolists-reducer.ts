import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export const todolistId_1 = v1();
export const todolistId_2 = v1();

const initialValue: TodolistType[] = [
    {id: todolistId_1, title: 'What to learn', filter: 'all'},
    {id: todolistId_2, title: 'What to buy', filter: 'all'}
]

export const todolistsReducer = (state: TodolistType[] = initialValue, action: TodolistsReducer): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}]
        case 'DELETE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case 'SET-NEW-FILTER-VALUE':
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.newFilterValue}
                : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title}
                : tl)
        default:
            return state
    }
}

type TodolistsReducer = AddNewTodolist | DeleteTodolist | SetNewFilterValue | ChangeTitleForTodolist

export type AddNewTodolist = ReturnType<typeof addTodolist>
export type DeleteTodolist = ReturnType<typeof deleteTodolist>
export type SetNewFilterValue = ReturnType<typeof setNewFilterValue>
export type ChangeTitleForTodolist = ReturnType<typeof changeTitleForTodolist>

export const addTodolist = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolistId: v1(), title}
    } as const
}

export const deleteTodolist = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {todolistId}
    } as const
}

export const setNewFilterValue = (todolistId: string, newFilterValue: FilterValuesType) => {
    return {
        type: 'SET-NEW-FILTER-VALUE',
        payload: {todolistId, newFilterValue}
    } as const
}

export const changeTitleForTodolist = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId, title}
    } as const
}
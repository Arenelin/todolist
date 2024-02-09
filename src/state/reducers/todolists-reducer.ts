import {v1} from 'uuid';
import {FilterValues, TodolistType} from '../../AppWithRedux';

const initialState: TodolistType[] = [];
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.payload.todolistId)
        case 'ADD-TODOLIST' :
            return [{id: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.title} : t)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.filter} : t)
        default:
            return state
    }
}

export type ActionsType = DeleteTodolist | AddTodolist | ChangeTodolistName | ChangeTodolistFilter

export type DeleteTodolist = ReturnType<typeof deleteTodolist>
export type AddTodolist = ReturnType<typeof addTodolist>
export type ChangeTodolistName = ReturnType<typeof changeTodolistName>
export type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilter>

export const deleteTodolist = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST', payload: {todolistId}
    } as const
}
export const addTodolist = (title: string) => {
    return {
        type: 'ADD-TODOLIST', payload: {todolistId: v1(), title},
    } as const
}
export const changeTodolistName = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, title}
    } as const
}
export const changeTodolistFilter = (todolistId: string, filter: FilterValues) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, filter}
    } as const
}
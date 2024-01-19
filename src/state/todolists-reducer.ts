import {FilterValues, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    todolistId: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: string
    filter: FilterValues
}

type ActionsType =
    RemoveTodoListActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId)
        case 'ADD-TODOLIST' :
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(t => t.id === action.todolistId ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistNameAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId: todolistId, title}
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValues): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId: todolistId, filter}
}
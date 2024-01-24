import {v1} from 'uuid';
import {FilterValues, TodolistType} from '../AppWithRedux';

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

export const todolist_1 = v1();
export const todolist_2 = v1();

const initialState: TodolistType[] = [
    {id: todolist_1, title: 'What to learn', filter: 'all'},
    {id: todolist_2, title: 'What to buy', filter: 'all'},
];
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId)
        case 'ADD-TODOLIST' :
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(t => t.id === action.todolistId ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t)
        default:
            return state
    }
}

export const deleteTodolist = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId: todolistId}
}
export const addTodolist = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistName = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId: todolistId, title}
}
export const changeTodolistFilter = (todolistId: string, filter: FilterValues): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId: todolistId, filter}
}
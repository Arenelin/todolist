import {todolistsApi, TodolistType} from '../api/todolists-api';
import {AppDispatch} from '../store/store';

// types
type TodolistsReducer =
    | RemoveTodolist
    | ChangeTodolistFilter
    | AddTodolist
    | ChangeTitleForTodolist
    | SetTodolists

export type RemoveTodolist = ReturnType<typeof deleteTodolist>
export type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilter>
export type AddTodolist = ReturnType<typeof addTodolist>
export type ChangeTitleForTodolist = ReturnType<typeof changeTitleForTodolist>
export type SetTodolists = ReturnType<typeof setTodolists>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }

const initialState: TodolistDomainType[] = [];

// reducer
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsReducer): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.filterValue}
                : tl)
        case 'ADD-TODOLIST':
            return [...state, {...action.payload.todolist, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title}
                : tl)
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(t => ({...t, filter: 'all'}))
        default:
            return state;
    }
}

// actions
export const deleteTodolist = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}
export const changeTodolistFilter = (todolistId: string, filterValue: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId, filterValue}
    } as const
}
export const addTodolist = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolist}
    } as const
}
export const changeTitleForTodolist = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId, title}
    } as const
}
export const setTodolists = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', payload: {todolists}} as const)


// thunks
export const getTodolists = () => (dispatch: AppDispatch) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}
export const createTodolist = (title: string) => (dispatch: AppDispatch) => {
    todolistsApi.createTodolist(title)
        .then(res => dispatch(addTodolist(res.data.data.item)))
}

export const removeTodolist = (todolistId: string) => (dispatch: AppDispatch) => {
    todolistsApi.deleteTodolist(todolistId)
        .then(() => dispatch(deleteTodolist(todolistId)))
}

export const updateTodolist = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    todolistsApi.updateTodolist(todolistId, title)
        .then(() => dispatch(changeTitleForTodolist(todolistId, title)))
}
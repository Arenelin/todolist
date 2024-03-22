import {Result_Code, todolistsApi, TodolistType} from '../api/todolists-api';
import {AppDispatch} from '../store/store';
import {RequestStatusType, setAppStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {getTasks} from "./tasks-reducer";

// types
type TodolistsActionsType =
    | RemoveTodolist
    | SetTodolists
    | AddTodolist
    | ClearData
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof changeTitleForTodolist>
    | ReturnType<typeof setTodolistEntityStatus>

export type RemoveTodolist = ReturnType<typeof deleteTodolist>
export type AddTodolist = ReturnType<typeof addTodolist>
export type SetTodolists = ReturnType<typeof setTodolists>
export type ClearData = ReturnType<typeof clearData>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = [];

// reducer
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.filterValue}
                : tl)
        case 'ADD-TODOLIST':
            return [...state, {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title}
                : tl)
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        case "SET-TODOLIST-ENTITY-STATUS":
            return state.map(t => t.id === action.payload.id
                ? {...t, entityStatus: action.payload.status}
                : t)
        case "CLEAR-DATA":
            return []
        default:
            return state;
    }
}

// actions
export const deleteTodolist = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {todolistId}} as const)
export const changeTodolistFilter = (todolistId: string, filterValue: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, filterValue}} as const)
export const addTodolist = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', payload: {todolist}} as const)
export const changeTitleForTodolist = (todolistId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, title}} as const)
export const setTodolists = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', payload: {todolists}} as const)
export const setTodolistEntityStatus = (id: string, status: RequestStatusType) =>
    ({type: 'SET-TODOLIST-ENTITY-STATUS', payload: {id, status}} as const)
export const clearData = () =>
    ({type: 'CLEAR-DATA'} as const)


// thunks
export const getTodolists = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
            dispatch(setAppStatus('succeeded'))
            return res.data
        })
        .then(todolists => {
            todolists.map(t => dispatch(getTasks(t.id)))
        })
        .catch(e => handleServerNetworkError(e.message, dispatch))
}
export const createTodolist = (title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === Result_Code.SUCCEEDED) {
                dispatch(addTodolist(res.data.data.item))
                dispatch(setAppStatus('idle'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handleServerNetworkError(e.message, dispatch))
}
export const removeTodolist = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(setTodolistEntityStatus(todolistId, 'loading'))
    todolistsApi.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === Result_Code.SUCCEEDED) {
                dispatch(deleteTodolist(todolistId))
                dispatch(setAppStatus('idle'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handleServerNetworkError(e.message, dispatch))
        .finally(() => dispatch(setTodolistEntityStatus(todolistId, 'idle')))
}
export const updateTodolist = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsApi.updateTodolist(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === Result_Code.SUCCEEDED) {
                dispatch(setAppStatus('idle'))
                dispatch(changeTitleForTodolist(todolistId, title))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handleServerNetworkError(e.message, dispatch))
}
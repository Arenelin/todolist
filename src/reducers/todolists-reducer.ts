import {FilterValuesType} from '../components/App/App';
import {v1} from 'uuid';
import {todolistsApi, TodolistType} from '../api/todolists-api';
import {AppDispatch} from '../store/store';

export const todolist_1 = v1();
export const todolist_2 = v1();

export type TodolistDomainType = TodolistType & { filter: FilterValuesType }

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsReducer): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.filterValue}
                : tl)
        case 'ADD-TODOLIST':
            // return [...state, {id: action.payload.todolistId, title: action.payload.title, addedDate: 'all'}]
            return state
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
export const addTodolist = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolistId: v1(), title}
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

export const getTodolists = () => (dispatch: AppDispatch) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}
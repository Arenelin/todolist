import {todolistsAPI, TodolistType} from '../../../api/todolists-api';
import {AppDispatch} from '../../../App/store';

// types
export type FilterValues = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & { filter: FilterValues }
const initialState: TodolistDomainType[] = [];
type ActionsType =
    | DeleteTodolist
    | AddTodolist
    | SetTodolists
    | ReturnType<typeof changeTodolistName>
    | ReturnType<typeof changeTodolistFilter>

// reducer
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(t => ({...t, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.payload.id)
        case 'ADD-TODOLIST' :
            return [{...action.payload.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(t => t.id === action.payload.id
                ? {...t, title: action.payload.title}
                : t)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(t => t.id === action.payload.id
                ? {...t, filter: action.payload.filter}
                : t)
        default:
            return state
    }
}

// actions
export type DeleteTodolist = ReturnType<typeof deleteTodolist>
export type AddTodolist = ReturnType<typeof addTodolist>
export type SetTodolists = ReturnType<typeof setTodolists>
export const deleteTodolist = (id: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {id}}) as const
export const addTodolist = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', payload: {todolist}}) as const
export const changeTodolistName = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}}) as const
export const changeTodolistFilter = (id: string, filter: FilterValues) =>
    ({type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}}) as const
export const setTodolists = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', payload: {todolists}}) as const

// thunks
export const getTodolists = () => (dispatch: AppDispatch) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolists(res.data)))
}
export const removeTodolist = (todolistId: string) => (dispatch: AppDispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => dispatch(deleteTodolist(todolistId)))
}
export const createNewTodolist = (title: string) => (dispatch: AppDispatch) => {
    todolistsAPI.createTodolist(title)
        .then((res) => dispatch(addTodolist(res.data.data.item)))
}
export const updateTodolistTitle = (todolistId: string, newTitle: string) => (dispatch: AppDispatch) => {
    todolistsAPI.updateTodolist(todolistId, newTitle)
        .then(() => dispatch(changeTodolistName(todolistId, newTitle)))
}
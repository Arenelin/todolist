import {todolistsAPI, TodolistType} from '../../../api/todolists-api';
import {AppDispatch} from '../../../App/store';
import {setAppStatus, RequestStatusType} from '../../../App/app-reducer/app-reducer';

// types
export type FilterValues = 'all' | 'active' | 'completed';
export type RequestStatusTodolistType = Omit<RequestStatusType, 'addingTodolistEntity'> | 'addingTaskEntity'
export type TodolistDomainType = TodolistType & { filter: FilterValues, entityStatus: RequestStatusTodolistType }
const initialState: TodolistDomainType[] = [];
type ActionsType =
    | DeleteTodolist
    | AddTodolist
    | SetTodolists
    | ReturnType<typeof changeTodolistName>
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof changeTodolistEntityStatus>

// reducer
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.payload.id)
        case 'ADD-TODOLIST' :
            return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(t => t.id === action.payload.id
                ? {...t, title: action.payload.title}
                : t)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(t => t.id === action.payload.id
                ? {...t, filter: action.payload.filter}
                : t)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(t => t.id === action.payload.id
                ? {...t, entityStatus: action.payload.status}
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
export const changeTodolistEntityStatus = (id: string, status: RequestStatusTodolistType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload: {id, status}}) as const
export const setTodolists = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', payload: {todolists}}) as const

// thunks
export const getTodolists = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}
export const removeTodolist = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(deleteTodolist(todolistId))
        })
}
export const createNewTodolist = (title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('addingTodolistEntity'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolist(res.data.data.item))
            dispatch(setAppStatus('idle'))
        })
}
export const updateTodolistTitle = (todolistId: string, newTitle: string) => (dispatch: AppDispatch) => {
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
    todolistsAPI.updateTodolist(todolistId, newTitle)
        .then(() => {
            dispatch(changeTodolistName(todolistId, newTitle))
            dispatch(changeTodolistEntityStatus(todolistId, 'succeeded'))
        })
}
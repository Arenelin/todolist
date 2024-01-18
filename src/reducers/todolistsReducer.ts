import {FilterValuesType, TodolistType} from '../App';


export const todolistsReducer = (state: TodolistType[], action: TodolistsReducer): TodolistType[] => {
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
            throw new Error('I don\'t understand this type')
    }
}

type TodolistsReducer = AddNewTodolist | DeleteTodolist | SetNewFilterValue | ChangeTitleForTodolist

type AddNewTodolist = ReturnType<typeof addTodolist>
type DeleteTodolist = ReturnType<typeof deleteTodolist>
type SetNewFilterValue = ReturnType<typeof setNewFilterValue>
type ChangeTitleForTodolist = ReturnType<typeof changeTitleForTodolist>

export const addTodolist = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolistId, title}
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
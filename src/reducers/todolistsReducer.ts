import {FilterValuesType, todolistsType} from '../App';

export const todolistsReducer = (state: todolistsType[], action: TodolistsReducer): todolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.filterValue}
                : tl)
        case 'ADD-TODOLIST':
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title}
                : tl)
        default:
            return state;
    }

}

type TodolistsReducer = RemoveTodolist | ChangeTodolistFilter | AddTodolist | ChangeTitleForTodolist

type RemoveTodolist = ReturnType<typeof deleteTodolist>
type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilter>
type AddTodolist = ReturnType<typeof addTodolist>
type ChangeTitleForTodolist = ReturnType<typeof changeTitleForTodolist>

//AC
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
export const addTodolist = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolistId, title}
    } as const
}

export const changeTitleForTodolist = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId, title}
    } as const
}
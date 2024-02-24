import {FilterValuesType, todolistType} from '../components/App/App';
import {v1} from 'uuid';

export const todolist_1 = v1();
export const todolist_2 = v1();

const initialState: todolistType[] = [
    {id: todolist_1, title: 'What to learn', filter: 'all'},
    {id: todolist_2, title: 'What to buy', filter: 'all'},
];

export const todolistsReducer = (state: todolistType[] = initialState, action: TodolistsReducer): todolistType[] => {
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

export type RemoveTodolist = ReturnType<typeof deleteTodolist>
export type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilter>
export type AddTodolist = ReturnType<typeof addTodolist>
export type ChangeTitleForTodolist = ReturnType<typeof changeTitleForTodolist>

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
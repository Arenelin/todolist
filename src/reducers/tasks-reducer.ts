import {TaskObjType} from '../App';
import {v1} from 'uuid';
import {todolist_1, todolist_2} from './todolists-reducer';

const initialState: TaskObjType = {
    [todolist_1]: [
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ],
    [todolist_2]: [
        {id: v1(), title: 'Book', isDone: false},
        {id: v1(), title: 'Milk', isDone: true},
    ],
}

export const tasksReducer = (state: TaskObjType = initialState, action: TasksReducer): TaskObjType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId],
                    {id: v1(), title: action.payload.title, isDone: false}
                ]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id ? {...t, isDone: action.payload.newValue} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        default:
            return state
    }
}

type TasksReducer =
    DeleteTasksOfDeletedTodolist
    | RemoveTask
    | AddNewTask
    | ChangeStatusTask
    | ChangeTitle
    | AddTasksForNewTodolist

type DeleteTasksOfDeletedTodolist = ReturnType<typeof deleteTasksOfDeletedTodolist>
type RemoveTask = ReturnType<typeof deleteTask>
type AddNewTask = ReturnType<typeof addNewTask>
type ChangeStatusTask = ReturnType<typeof changeStatusTask>
type ChangeTitle = ReturnType<typeof changeTitle>
type AddTasksForNewTodolist = ReturnType<typeof addTasksForNewTodolist>

export const deleteTasksOfDeletedTodolist = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}

export const deleteTask = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, id}
    } as const
}

export const addNewTask = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    } as const
}
export const changeStatusTask = (todolistId: string, id: string, newValue: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            id,
            newValue
        }
    } as const
}
export const changeTitle = (todolistId: string, id: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            id,
            title
        }
    } as const
}
export const addTasksForNewTodolist = (todolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolistId}
    } as const
}
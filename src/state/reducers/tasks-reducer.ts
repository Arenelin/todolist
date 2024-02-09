import {v1} from 'uuid';
import {AddTodolist, DeleteTodolist} from './todolists-reducer';
import {TasksState} from '../../AppWithRedux';


const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: TasksReducer): TasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], {
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }]
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id
                        ? {...t, isDone: action.payload.newValue}
                        : t)
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id
                        ? {...t, title: action.payload.newTitle}
                        : t)
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
    RemoveTask
    | AddTask
    | ChangeTaskStatus
    | ChangeTaskTitle
    | AddTodolist
    | DeleteTodolist

type RemoveTask = ReturnType<typeof deleteTask>
type AddTask = ReturnType<typeof addNewTask>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatus>
type ChangeTaskTitle = ReturnType<typeof changeTitleForTask>
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
export const changeTaskStatus = (todolistId: string, id: string, newValue: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            id,
            newValue
        }
    } as const
}
export const changeTitleForTask = (todolistId: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            id,
            newTitle
        }
    } as const
}


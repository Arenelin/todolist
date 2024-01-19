import {TasksState} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodoListActionType} from './todolists-reducer';

export const tasksReducer = (state: TasksState, action: TasksReducer): TasksState => {
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
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        default:
            throw new Error('I don\'t understand this type')
    }
}

type TasksReducer =
    RemoveTask
    | AddTask
    | ChangeTaskStatus
    | ChangeTaskTitle
    | AddTodolistActionType
    | RemoveTodoListActionType

type RemoveTask = ReturnType<typeof removeTask>
type AddTask = ReturnType<typeof addTask>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatus>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitle>
export const removeTask = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, id}
    } as const
}

export const addTask = (todolistId: string, title: string) => {
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
export const changeTaskTitle = (todolistId: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            id,
            newTitle
        }
    } as const
}


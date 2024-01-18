import {TaskObjectType} from '../App';
import {v1} from 'uuid';

export const tasksReducer = (state: TaskObjectType, action: TasksReducer): TaskObjectType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId],
                    {id: v1(), title: action.payload.title, isDone: false}
                ]
            }
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            }
        case 'ADD-TASK-FOR-NEW-TODOLIST':
            return {...state, [action.payload.todolistId]: []}
        case 'DELETE-TASKS-FOR-REMOVED-TODOLIST':
            delete state[action.payload.todolistId]
            return state
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
        default:
            throw new Error('I don\'t understand this type')
    }
}

type TasksReducer =
    AddNewTask
    | DeleteTask
    | AddTasksForNewTodolist
    | DeleteTasksForRemovedTodolist
    | ChangeStatusForTask
    | ChangeTitleForTask

type AddNewTask = ReturnType<typeof addNewTask>
type DeleteTask = ReturnType<typeof deleteTask>
type AddTasksForNewTodolist = ReturnType<typeof addTasksForNewTodolist>
type DeleteTasksForRemovedTodolist = ReturnType<typeof deleteTasksForRemovedTodolist>
type ChangeStatusForTask = ReturnType<typeof changeStatusForTask>
type ChangeTitleForTask = ReturnType<typeof changeTitleForTask>

//AC
export const addNewTask = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    } as const
}

export const deleteTask = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, id}
    } as const
}

export const addTasksForNewTodolist = (todolistId: string) => {
    return {
        type: 'ADD-TASK-FOR-NEW-TODOLIST',
        payload: {todolistId}
    } as const
}

export const deleteTasksForRemovedTodolist = (todolistId: string) => {
    return {
        type: 'DELETE-TASKS-FOR-REMOVED-TODOLIST',
        payload: {todolistId}
    } as const
}

export const changeStatusForTask = (todolistId: string, id: string, newValue: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            id,
            newValue
        }
    } as const
}
export const changeTitleForTask = (todolistId: string, id: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            id,
            title
        }
    } as const
}
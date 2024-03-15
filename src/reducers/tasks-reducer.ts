import {AddTodolist, RemoveTodolist, SetTodolists} from './todolists-reducer';
import {AppDispatch, AppRootState} from "../store/store";
import {DomainModelTaskType, tasksApi, TaskType} from "../api/tasks-api";
import {updateTaskField} from "../utils/updateTaskField";

// types
type TasksReducer =
    | RemoveTodolist
    | RemoveTask
    | AddNewTask
    | ChangeTask
    | AddTodolist
    | SetTodolists
    | sEtTasks

type RemoveTask = ReturnType<typeof deleteTask>
type AddNewTask = ReturnType<typeof addNewTask>
type ChangeTask = ReturnType<typeof changeTask>
type sEtTasks = ReturnType<typeof setTasks>

export type ModelTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export type TaskObjType = {
    [key: string]: TaskType[]
}
const initialState: TaskObjType = {}

// reducer
export const tasksReducer = (state: TaskObjType = initialState, action: TasksReducer): TaskObjType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [...state[action.payload.task.todoListId], action.payload.task]
            }
        case "CHANGE-TASK": {
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId]
                    .map(t => t.id === action.payload.task.id
                        ? action.payload.task
                        : t)
            }
        }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }
        case 'SET-TODOLISTS':
            const stateCopy = {...state}
            action.payload.todolists.forEach(t => stateCopy[t.id] = [])
            return stateCopy
        case "SET-TASKS":
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        default:
            return state
    }
}

// actions
export const deleteTask = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId}
    } as const
}
export const setTasks = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {todolistId, tasks}
    } as const
}

export const addNewTask = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {task}
    } as const
}
export const changeTask = (task: TaskType) => {
    return {
        type: 'CHANGE-TASK',
        payload: {task}
    } as const
}


// thunks

export const getTasks = (todolistId: string) => (dispatch: AppDispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks(todolistId, res.data.items))
        })
}
export const addTask = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    tasksApi.createTask(todolistId, title)
        .then(res => dispatch(addNewTask(res.data.data.item)))
}

export const removeTask = (todolistId: string, taskId: string) => (dispatch: AppDispatch) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(() => dispatch(deleteTask(todolistId, taskId)))
}

export const updateTask = (todolistId: string, taskId: string, modelTask: ModelTaskType) =>
    (dispatch: AppDispatch, getState: () => AppRootState) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error('Task is not defined')
        }
        const model: DomainModelTaskType = updateTaskField(task, modelTask)
        tasksApi.updateTask(todolistId, taskId, model)
            .then(res => dispatch(changeTask(res.data.data.item)))
    }
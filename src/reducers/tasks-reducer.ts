import {AddTodolist, ClearData, RemoveTodolist, SetTodolists} from './todolist-reducer';
import {AppDispatch, AppRootState} from "../store/store";
import {DomainModelTaskType, tasksApi, TaskType} from "../api/tasks-api";
import {updateTaskField} from "../utils/updateTaskField";
import {RequestStatusType, setAppStatus} from "./app-reducer";
import {Result_Code} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

// types
type TasksActionsType =
    | RemoveTodolist
    | AddTodolist
    | SetTodolists
    | ClearData
    | ReturnType<typeof deleteTask>
    | ReturnType<typeof addNewTask>
    | ReturnType<typeof changeTask>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof setTaskEntityStatus>

export type ModelTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type TaskObjType = {
    [key: string]: TaskDomainType[]
}
const initialState: TaskObjType = {}

// reducer
export const tasksReducer = (state: TaskObjType = initialState, action: TasksActionsType): TaskObjType => {
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
                [action.payload.task.todoListId]:
                    [{...action.payload.task, entityStatus: 'idle'}, ...state[action.payload.task.todoListId]]
            }
        case "CHANGE-TASK": {
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId]
                    .map(t => t.id === action.payload.task.id
                        ? {...action.payload.task, entityStatus: 'idle'}
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
                [action.payload.todolistId]: action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
            }
        case "SET-TASK-ENTITY-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id
                        ? {...t, entityStatus: action.payload.status}
                        : t)
            }
        case "CLEAR-DATA":
            return {}
        default:
            return state
    }
}

// actions
export const deleteTask = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const)
export const setTasks = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', payload: {todolistId, tasks}} as const)
export const addNewTask = (task: TaskType) =>
    ({type: 'ADD-TASK', payload: {task}} as const)
export const changeTask = (task: TaskType) =>
    ({type: 'CHANGE-TASK', payload: {task}} as const)

export const setTaskEntityStatus = (todolistId: string, id: string, status: RequestStatusType) =>
    ({type: 'SET-TASK-ENTITY-STATUS', payload: {todolistId, id, status}} as const)

// thunks
export const getTasks = (todolistId: string) => (dispatch: AppDispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks(todolistId, res.data.items))
            dispatch(setAppStatus('idle'))
        })
        .catch(e => handleServerNetworkError(e.message, dispatch))
}
export const addTask = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    tasksApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === Result_Code.SUCCEEDED) {
                dispatch(setAppStatus('idle'))
                dispatch(addNewTask(res.data.data.item))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handleServerNetworkError(e.message, dispatch))
}

export const removeTask = (todolistId: string, taskId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(setTaskEntityStatus(todolistId, taskId, 'loading'))
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === Result_Code.SUCCEEDED) {
                dispatch(setAppStatus('idle'))
                dispatch(deleteTask(todolistId, taskId))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handleServerNetworkError(e.message, dispatch))
        .finally(() => dispatch(setTaskEntityStatus(todolistId, taskId, 'idle')))
}

export const updateTask = (todolistId: string, taskId: string, modelTask: ModelTaskType) =>
    (dispatch: AppDispatch, getState: () => AppRootState) => {
        dispatch(setAppStatus('loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error('Task is not defined')
        }
        const model: DomainModelTaskType = updateTaskField(task, modelTask)
        tasksApi.updateTask(todolistId, taskId, model)
            .then(res => {
                if (res.data.resultCode === Result_Code.SUCCEEDED) {
                    dispatch(setAppStatus('idle'))
                    dispatch(changeTask(res.data.data.item))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(e => handleServerNetworkError(e.message, dispatch))
    }
import {AddTodolist, ClearData, DeleteTodolist, SetTodolists} from '../todolistsReducer/todolists-reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModel} from '../../../api/tasks-api';
import {AppDispatch, AppRootState} from '../../../App/store';
import {createTaskModel} from '../../../utils/createTaskModel';
import {RequestStatusType, setAppStatus} from '../../../App/app-reducer/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';
import {Result_Code} from "../../../api/todolists-api";

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksState = {
    [key: string]: TaskDomainType[]
}
const initialState: TasksState = {}
type ActionsType =
    | AddTodolist
    | DeleteTodolist
    | SetTodolists
    | ClearData
    | ReturnType<typeof deleteTask>
    | ReturnType<typeof addNewTask>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof changeTaskValues>
    | ReturnType<typeof changeTaskEntityStatus>


// reducer
export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
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
                [action.payload.task.todoListId]:
                    [{...action.payload.task, entityStatus: 'idle'}, ...state[action.payload.task.todoListId]]
            };
        case 'UPDATE-TASK':
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, ...action.payload.domainModel}
                        : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        case 'SET-TODOLISTS':
            debugger
            const stateCopy = {...state}
            action.payload.todolists.forEach(t => stateCopy[t.id] = [])
            return stateCopy
        case 'SET-TASKS':
            debugger
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
            }
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, entityStatus: action.payload.status}
                        : t
                    )
            }
        case "CLEAR-DATA":
            return {}
        default:
            return state
    }
}

// actions
export const deleteTask = (todolistId: string, id: string) =>
    ({type: 'REMOVE-TASK', payload: {todolistId, id}}) as const
export const addNewTask = (task: TaskType) =>
    ({type: 'ADD-TASK', payload: {task}}) as const
export const changeTaskValues = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', payload: {todolistId, taskId, domainModel}}) as const
export const setTasks = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', payload: {todolistId, tasks}}) as const
export const changeTaskEntityStatus = (todolistId: string, taskId: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TASK-ENTITY-STATUS', payload: {todolistId, taskId, status}}) as const

// thunks
export const getTasks = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks(todolistId, res.data.items))
        })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => dispatch(setAppStatus('idle')))
}
export const removeTask = (todolistId: string, taskId: string) => (dispatch: AppDispatch) => {
    dispatch(changeTaskEntityStatus(todolistId, taskId, 'loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode !== Result_Code.SUCCEEDED) {
                handleServerAppError(res.data, dispatch)
            } else {
                dispatch(deleteTask(todolistId, taskId))
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => dispatch(changeTaskEntityStatus(todolistId, taskId, 'idle')))
}
export const addTask = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode !== Result_Code.SUCCEEDED) {
                handleServerAppError(res.data, dispatch)
            } else {
                dispatch(addNewTask(res.data.data.item))
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => dispatch(setAppStatus('idle')))
}
export const updateTask = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: AppDispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error('task is not found in the state')
        }
        const apiModel: UpdateTaskModel = createTaskModel(task, {...domainModel})

        dispatch(setAppStatus('loading'))
        tasksAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode !== Result_Code.SUCCEEDED) {
                    handleServerAppError(res.data, dispatch)
                } else {
                    dispatch(changeTaskValues(todolistId, taskId, domainModel))
                }
            })
            .catch(error => {
                handleServerNetworkError(error.message, dispatch)
            })
            .finally(() => dispatch(setAppStatus('idle')))
    }
}
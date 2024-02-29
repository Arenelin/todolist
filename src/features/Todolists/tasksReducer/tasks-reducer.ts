import {AddTodolist, DeleteTodolist, SetTodolists} from '../todolistsReducer/todolists-reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModel} from '../../../api/tasks-api';
import {AppDispatch, AppRootState} from '../../../App/store';
import {createTaskModel} from '../../../utils/createTaskModel';

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksState = {
    [key: string]: TaskType[]
}
const initialState: TasksState = {}
type ActionsType =
    | AddTodolist
    | DeleteTodolist
    | SetTodolists
    | ReturnType<typeof deleteTask>
    | ReturnType<typeof addNewTask>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof changeTaskValues>

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
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
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
            const stateCopy = {...state}
            action.payload.todolists.forEach(t => stateCopy[t.id] = [])
            return stateCopy
        case 'SET-TASKS':
            return {...state, [action.payload.todolistId]: action.payload.tasks}
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

// thunks
export const getTasks = (todolistId: string) => (dispatch: AppDispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => dispatch(setTasks(todolistId, res.data.items)))
}
export const removeTask = (todolistId: string, taskId: string) => (dispatch: AppDispatch) => {
    tasksAPI.deleteTask(todolistId, taskId).then(() => dispatch(deleteTask(todolistId, taskId)))
}
export const addTask = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => dispatch(addNewTask(res.data.data.item)))
}
export const updateTask = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: AppDispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error('task is not found in the state')
        }
        const apiModel: UpdateTaskModel = createTaskModel(task, {...domainModel})

        tasksAPI.updateTask(todolistId, taskId, apiModel)
            .then(() => dispatch(changeTaskValues(todolistId, taskId, domainModel)))
    }
}
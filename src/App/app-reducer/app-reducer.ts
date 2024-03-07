// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'addingTodolistEntity'
type ErrorType = string | null
export type ApplicationStateType = {
    status: RequestStatusType
    error: ErrorType
}
type ActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>

const initialState: ApplicationStateType = {
    status: 'idle',
    error: null
}

// reducer
export const appReducer = (state: ApplicationStateType = initialState, action: ActionsType): ApplicationStateType => {
    switch (action.type) {
        case 'APP-SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP-SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

// actions
export const setAppStatus = (status: RequestStatusType) =>
    ({type: 'APP-SET-STATUS', payload: {status}} as const)
export const setAppError = (error: ErrorType) =>
    ({type: 'APP-SET-ERROR', payload: {error}} as const)
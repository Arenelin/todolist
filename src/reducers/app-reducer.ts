// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType
}
type InitialStateType = typeof initialState

type AppActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>

// reducer
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-APP-STATUS":
            return {...state, status: action.payload.status}
        case "SET-APP-ERROR":
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

// actions
export const setAppStatus = (status: RequestStatusType) =>
    ({type: 'SET-APP-STATUS', payload: {status}} as const)
export const setAppError = (error: ErrorType) =>
    ({type: 'SET-APP-ERROR', payload: {error}} as const)
// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false as boolean
}
type InitialStateType = typeof initialState
export type SetAppStatus = ReturnType<typeof setAppStatus>
export type SetAppError = ReturnType<typeof setAppError>
type AppActionsType =
    | ReturnType<typeof setIsInitialized>
    | SetAppError
    | SetAppStatus

// reducer
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-APP-STATUS":
            return {...state, status: action.payload.status}
        case "SET-APP-ERROR":
            return {...state, error: action.payload.error}
        case "SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// actions
export const setAppStatus = (status: RequestStatusType) =>
    ({type: 'SET-APP-STATUS', payload: {status}} as const)
export const setAppError = (error: ErrorType) =>
    ({type: 'SET-APP-ERROR', payload: {error}} as const)
export const setIsInitialized = (value: boolean) =>
    ({type: 'SET-IS-INITIALIZED', value}) as const
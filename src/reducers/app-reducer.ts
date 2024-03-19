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
export const setAppStatus = (status: RequestStatusType) => {
    return {
        type: 'SET-APP-STATUS',
        payload: {status}
    } as const
}
export const setAppError = (error: ErrorType) => {
    return {
        type: 'SET-APP-ERROR',
        payload: {error}
    } as const
}


// thunks

// export const getTasks = (todolistId: string) => (dispatch: AppDispatch) => {
//     tasksApi.getTasks(todolistId)
//         .then(res => {
//             dispatch(setTasks(todolistId, res.data.items))
//         })
// }

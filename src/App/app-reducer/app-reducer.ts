// types
import {AppDispatch} from "../store";
import {authAPI} from "../../api/auth-api";
import {setIsLoggedIn} from "../../features/Login/auth-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {Result_Code} from "../../api/todolists-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
export type ApplicationStateType = {
    status: RequestStatusType
    error: ErrorType
    isInitialized: boolean
}
type ActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppInitialized>

const initialState: ApplicationStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

// reducer
export const appReducer = (state: ApplicationStateType = initialState, action: ActionsType): ApplicationStateType => {
    switch (action.type) {
        case 'APP-SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP-SET-ERROR':
            return {...state, error: action.payload.error}
        case "APP-SET-IS-INITIALIZED": {
            return {...state, isInitialized: action.payload.value}
        }
        default:
            return state
    }
}

// actions
export const setAppStatus = (status: RequestStatusType) =>
    ({type: 'APP-SET-STATUS', payload: {status}} as const)
export const setAppError = (error: ErrorType) =>
    ({type: 'APP-SET-ERROR', payload: {error}} as const)
export const setAppInitialized = (value: boolean) =>
    ({type: 'APP-SET-IS-INITIALIZED', payload: {value}} as const)

// thunks

export const initializeApp = () => (dispatch: AppDispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode !== Result_Code.SUCCEEDED) {
                dispatch(setIsLoggedIn(false))
            } else {
                dispatch(setIsLoggedIn(true))
            }
            dispatch(setAppInitialized(true))
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
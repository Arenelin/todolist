import {SetAppError, setAppStatus, SetAppStatus, setIsInitialized} from "./app-reducer";
import {authAPI} from "../api/auth-api";
import {AppDispatch} from "../store/store";
import {LoginType} from "../components/Login/Login";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Result_Code} from "../api/todolists-api";
import {clearData} from "./todolist-reducer";


// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatus
    | SetAppError

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value}) as const


// thunks
export const login = (data: LoginType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === Result_Code.SUCCEEDED) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatus('idle'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}
export const authMe = () => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === Result_Code.SUCCEEDED) {
            dispatch(setIsLoggedInAC(true))
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    } finally {
        dispatch(setIsInitialized(true))
    }
}
export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === Result_Code.SUCCEEDED) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatus('idle'))
            dispatch(clearData())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}
import {AppDispatch} from "../../App/store";
import {authAPI, AuthDataType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatus} from "../../App/app-reducer/app-reducer";
import {Result_Code} from "../../api/todolists-api";

// types
const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoggedIn>

// reducer
export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.payload.value}
        }
        default:
            return state
    }
}

// actions
export const setIsLoggedIn = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', payload: {value}}) as const

// thunks
export const login = (authData: AuthDataType) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(authData)
        .then(res => {
            if (res.data.resultCode !== Result_Code.SUCCEEDED) {
                handleServerAppError(res.data, dispatch)
            } else {
                dispatch(setIsLoggedIn(true))
            }
        })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => dispatch(setAppStatus('idle')))
}

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode !== Result_Code.SUCCEEDED) {
                handleServerAppError(res.data, dispatch)
            } else {
                dispatch(setIsLoggedIn(false))
            }
        })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => dispatch(setAppStatus('idle')))
}

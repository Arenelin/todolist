import {ResponseType} from "../api/todolists-api";
import {AppDispatch} from "../store/store";
import {setAppError, setAppStatus} from "../reducers/app-reducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
    if (data.messages.length > 0) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}
export const handleServerNetworkError = (error: { message:string }, dispatch: AppDispatch) => {
    dispatch(setAppError(error ? error.message : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}
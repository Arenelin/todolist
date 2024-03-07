import {setAppError, setAppStatus} from '../App/app-reducer/app-reducer';
import {ResponseType} from '../api/tasks-api';
import {AppDispatch} from '../App/store';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages.length > 0) {
        dispatch(setAppError(data.messages[0]))
        dispatch(setAppStatus('failed'))
    } else {
        dispatch(setAppError('Some error occurred'))
        dispatch(setAppStatus('failed'))
    }
}
export const handleServerNetworkError = (errorMessage: string, dispatch: AppDispatch) => {
    dispatch(setAppError(errorMessage ? errorMessage : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}
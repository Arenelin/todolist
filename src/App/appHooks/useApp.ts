import {useCallback} from 'react';
import {createNewTodolist} from '../../features/Todolists/todolistsReducer/todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {ErrorType, RequestStatusType} from "../app-reducer/app-reducer";

export const useApp = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>(state =>
        state.application.status)
    const addNewTodolist = useCallback((title: string) => {
        dispatch(createNewTodolist(title))
    }, [dispatch, createNewTodolist])

    return {addNewTodolist, status}
}
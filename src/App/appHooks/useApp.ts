import {useCallback} from 'react';
import {createNewTodolist} from '../../features/Todolists/todolistsReducer/todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

export const useApp = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state =>
        state.application.status)
    const addNewTodolist = useCallback((title: string) => {
        dispatch(createNewTodolist(title))
    }, [dispatch, createNewTodolist])

    return {addNewTodolist, status}
}
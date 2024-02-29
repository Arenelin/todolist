import {useSelector} from 'react-redux';
import {AppRootState} from '../store';
import {useCallback, useEffect} from 'react';
import {createNewTodolist, getTodolists, TodolistDomainType} from '../../features/Todolists/todolistsReducer/todolists-reducer';
import {useAppDispatch} from '../../hooks/hooks';

export const useApp = ()=>{
    const dispatch = useAppDispatch()
    const todolists =
        useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    useEffect(() => {
       dispatch(getTodolists())
    }, []);
    const addNewTodolist = useCallback((title: string) => {
        dispatch(createNewTodolist(title))
    }, [dispatch, createNewTodolist])

    return {todolists, addNewTodolist}
}
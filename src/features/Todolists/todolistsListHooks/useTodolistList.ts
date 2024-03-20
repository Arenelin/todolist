import {useCallback, useEffect} from 'react';
import {createNewTodolist, getTodolists, TodolistDomainType} from '../todolistsReducer/todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {logout} from "../../Login/auth-reducer";

export const useTodolistList = (demo: boolean) => {
    const dispatch = useAppDispatch()
    const todolists =
        useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!demo && isLoggedIn) {
            dispatch(getTodolists())
        }
    }, []);
    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch, logout])
    const addNewTodolist = useCallback((title: string) => {
        dispatch(createNewTodolist(title))
    }, [dispatch, createNewTodolist])

    return {todolists, addNewTodolist, logoutHandler, isLoggedIn}
}
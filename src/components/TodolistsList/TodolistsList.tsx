import React, {useCallback, useEffect} from 'react';
import {Todolist} from "../Todolist";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {createTodolist, getTodolists, TodolistDomainType} from "../../reducers/todolist-reducer";
import {Navigate} from "react-router-dom";
import {AddItemForm} from "../AddItemForm/AddItemForm";

export const TodolistsList = () => {
    const dispatch = useAppDispatch();
    const todolists =
        useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const todolistsList = todolists.map(tl => <Todolist key={tl.id} todolist={tl}/>)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodolists())
        }
    }, []);
    const addNewTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch, createTodolist])

    if (!isLoggedIn) return <Navigate to={'/login'}/>
    return (
        <>
            <AddItemForm callback={addNewTodolist}/>
            {todolistsList}
        </>
    );
};


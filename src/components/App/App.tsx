import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {createTodolist, getTodolists, TodolistDomainType} from '../../reducers/todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {Todolist} from "../Todolist";

function App() {
    const dispatch = useAppDispatch();
    const todolists =
        useAppSelector<TodolistDomainType[]>(state => state.todolists)

    const addNewTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch, createTodolist])

    useEffect(() => {
        dispatch(getTodolists())
    }, []);

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {todolists.map(tl => <Todolist key={tl.id} todolist={tl}/>)}
        </div>
    );
}

export default App;
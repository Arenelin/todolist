import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {createTodolist, getTodolists, TodolistDomainType} from '../../reducers/todolist-reducer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {Todolist} from "../Todolist";
import {RequestStatusType} from "../../reducers/app-reducer";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";

function App() {
    const dispatch = useAppDispatch();
    const todolists =
        useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const status =
        useAppSelector<RequestStatusType>(state => state.app.status)

    const addNewTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch, createTodolist])

    useEffect(() => {
        dispatch(getTodolists())
    }, []);

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AddItemForm  callback={addNewTodolist}/>
            {status === 'loading' && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="secondary" />
            </Stack>}
            {todolists.map(tl => <Todolist key={tl.id} todolist={tl}/>)}
        </div>
    );
}

export default App;
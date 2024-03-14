import React from 'react';
import './App.css';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {useApp} from './appHooks/useApp';
import {TodolistsList} from '../features/Todolists/TodolistsList';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";

type AppProps = {
    demo?: boolean
}

export const App: React.FC<AppProps> = (props) => {
    const {demo = false} = props;
    const {addNewTodolist, status} = useApp()
    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                    <AddItemForm callback={addNewTodolist}/>
                    {status === 'loading' &&
                        <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
                            <LinearProgress color="secondary"/>
                            <LinearProgress color="success"/>
                            <LinearProgress color="inherit"/>
                        </Stack>}
                </div>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login />}/>
                </Routes>
            </div>
        </BrowserRouter>

    );
}
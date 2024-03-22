import React, {useEffect} from 'react';
import '../../App.css';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {RequestStatusType} from "../../reducers/app-reducer";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {TodolistsList} from "../TodolistsList/TodolistsList";
import {authMe, logout} from "../../reducers/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

function App() {
    const dispatch = useAppDispatch();
    const status =
        useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized =
        useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn =
        useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(authMe())
    }, []);
    const logoutHandler = () => {
        dispatch(logout())
    }
    if (!isInitialized) return <CircularProgress/>
    return (
        <div className="App">
            <ErrorSnackbar/>
            {status === 'loading' && <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
                <LinearProgress color="secondary"/>
            </Stack>}
            {isLoggedIn && <Button onClick={logoutHandler} variant={'contained'} color={'primary'}>Log Out</Button>}
            <Routes>
                <Route path={'/'} element={<TodolistsList/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'*'} element={<Navigate to={'/error404'}/>}/>
                <Route path={'/error404'} element={<h1>PAGE NOT FOUND</h1>}/>
            </Routes>
        </div>
    );
}

export default App;
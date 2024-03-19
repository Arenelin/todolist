import React, {useEffect} from 'react';
import './App.css';
import {TodolistsList} from '../features/Todolists/TodolistsList';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import {useApp} from "./appHooks/useApp";
import {LoadingCircle} from "../components/loadingCircle/LoadingCircle";
import {useAppDispatch} from "../hooks/hooks";
import {initializeApp} from "./app-reducer/app-reducer";

type AppProps = {
    demo?: boolean
}

export const App: React.FC<AppProps> = (props) => {
    const dispatch = useAppDispatch()
    const {demo = false} = props;
    const {status, isInitialized} = useApp()
    useEffect(() => {
        dispatch(initializeApp())
    }, []);
// debugger
    if (!isInitialized) {
        return <LoadingCircle/>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                {status === 'loading' &&
                    <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
                        <LinearProgress color="secondary"/>
                    </Stack>}
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
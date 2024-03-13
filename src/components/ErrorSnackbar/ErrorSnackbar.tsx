import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {ErrorType, setAppError} from "../../App/app-reducer/app-reducer";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

export const ErrorSnackbar = () => {
    const error = useAppSelector<ErrorType>(state => state.application.error)
    const dispatch = useAppDispatch()
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null))
    };

    return (
        <div>
            <Snackbar
                open={!!error}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}
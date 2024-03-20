import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {ErrorType, setAppError} from "../../reducers/app-reducer";

export const ErrorSnackbar = () => {
    const error = useAppSelector<ErrorType>(state => state.app.error)
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null))
    };
    return (
        <div>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}
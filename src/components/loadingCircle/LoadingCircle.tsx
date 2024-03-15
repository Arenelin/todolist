import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const LoadingCircle = () => {
    return (
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', height:'100vh'}}>
            <CircularProgress/>
        </Box>
    );
}
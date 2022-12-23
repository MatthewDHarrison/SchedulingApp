import React from 'react';
import {
    BrowserRouter,
} from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { AppTheme } from './Theme'
import Router from './Router';


function App() {
    return (
        <>
            <ThemeProvider theme={AppTheme} >
                <BrowserRouter>
                    <Router />
                </BrowserRouter >
            </ThemeProvider>
        </>
    );
}

export default App;


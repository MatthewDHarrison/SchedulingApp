import { createTheme } from '@mui/material/styles';

export const AppTheme = createTheme({

    palette: {
        primary: {
            main: '#fff',
            contrastText: '#111',
        },
        secondary: {
            main: '#000'
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,

    },

});

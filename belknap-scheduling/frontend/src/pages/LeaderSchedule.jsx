import * as React from 'react';
import { ApiCall } from "../components/ApiCall";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const days = ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Tuesday', 'Thursday', 'Friday'];
const keys = ['T11', 'H11', 'F11', 'S11', 'T21', 'H21', 'F21', 
              'T12', 'H12', 'F12', 'S12', 'T22', 'H22', 'F22',
              'T13', 'H13', 'F13', 'S13', 'T23', 'H23', 'F23']
             


export default function LeaderSchedule() {
    const [wk, setWk] = React.useState(1);
    const [sched, setSched] = React.useState(Object.fromEntries(keys.map(k => [k, {periods: []}])));
    const [loaded, setLoaded] = React.useState(false);
    const dataFetchedRef = React.useRef(false);

    React.useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        
        ApiCall(
            "GET",
            `masterSchedule`
        ).then((data) => {
            if (!loaded) {
                for (let i = 0; i < data.length; i++) {
                    let temp = sched;
                    console.log(data);
                    temp[data[i][0]].periods.push(data[i][1])
                    setSched(temp)
                }
            }    
            console.log(sched);
            setLoaded(true);
        })
    }, [])

    if (loaded) {
        return (
            <Container component="main" maxWidth="xl">
                <Box sx={{ flexGrow: 1, p: 2, mt: 10, mb: 20}}
                        padding="40px"
                        borderRadius="10px"
                        backgroundColor="#ddd">
                    <Typography align="center" variant="h2">Lifeguarding Schedule Week {wk}</Typography>
                    <Grid
                        container
                        spacing={2}
                        columns={8}
                        sx={{
                        mt: 3,
                        '--Grid-borderWidth': '1px',
                        borderTop: 'var(--Grid-borderWidth) solid',
                        borderLeft: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider',
                        '& > div': {
                            borderRight: 'var(--Grid-borderWidth) solid',
                            borderBottom: 'var(--Grid-borderWidth) solid',
                            borderColor: 'divider',
                        },
                        }}
                    >   
                        <Grid item xs={1}></Grid>
                        {[...Array(7)].map((_, index) => (
                        <Grid align-items="center" item key={index} xs={1} minHeight={10}>
                            <Typography variant="h7" align="center">
                                {days[index]}
                            </Typography>
                        </Grid>
                        ))}

                        <Grid item xs={1}>First Period</Grid>

                        {keys.slice(0,7).map((key, index) => (<Grid item xs={1} minHeight={400} sx={sched[key].periods.length > 0 ? {} : {bgcolor: '#555'}}>
                            <Stack>
                                {sched[key].periods.slice(0, -1).map((name, i) => (
                                    <Typography sx={{fontWeight: 'bold'}}key={i}>
                                        {name}
                                    </Typography>
                                ))}
                                
                            </Stack>
                        </Grid>))}
        
                        
                        <Grid item xs={1}>Second Period</Grid>

                        {keys.slice(7,14).map((key, index) => (<Grid item xs={1} minHeight={400} sx={sched[key].periods.length > 0 ? {} : {bgcolor: '#555'}}>
                            <Stack>
                                {sched[key].periods.slice(0, -1).map((name, i) => (
                                    <Typography sx={{fontWeight: 'bold'}}key={i}>
                                        {name}
                                    </Typography>
                                ))}
                                
                            </Stack>
                        </Grid>))}

                        <Grid item xs={1}>Third Period</Grid>

                        {keys.slice(14,21).map((key, index) => (<Grid item xs={1} minHeight={400} sx={sched[key].periods.length > 0 ? {} : {bgcolor: '#555'}}>
                            <Stack>
                                {sched[key].periods.slice(0, -1).map((name, i) => (
                                    <Typography sx={{fontWeight: 'bold'}}key={i}>
                                        {name}
                                    </Typography>
                                ))}
                                
                            </Stack>
                        </Grid>))}
                    </Grid>
                    <Button variant="contained" sx={{mt: 5}} onClick={() => {wk === 2 ? setWk(1) : setWk(2)}}>
                        Show week {wk === 2 ? 1 : 2}
                    </Button>
                </Box>
            </Container>

        );
    } else {
        return <>Loading...</>
    }
}
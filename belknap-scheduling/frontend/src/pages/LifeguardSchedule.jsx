import * as React from 'react';
import { ApiCall } from "../components/ApiCall";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const keys = ['U1A', 'M1A', 'T1A', 'W1A', 'H1A', 'F1A', 'S1A', 'U1P', 'M1P', 
              'T1P', 'W1P', 'H1P', 'F1P', 'S1P', 'U2A', 'M2A', 'T2A', 'W2A', 
              'H2A', 'F2A', 'S2A', 'U2P', 'M2P', 'T2P', 'W2P', 'H2P', 'F2P', 'S2P']

const keys_1 = ['U1A', 'M1A', 'T1A', 'W1A', 'H1A', 'F1A', 'S1A', 'U1P', 'M1P', 'T1P', 'W1P', 'H1P', 'F1P', 'S1P']
const keys_2 = ['U2A', 'M2A', 'T2A', 'W2A', 'H2A', 'F2A', 'S2A', 'U2P', 'M2P', 'T2P', 'W2P', 'H2P', 'F2P', 'S2P']


const LifeguardScheduleRow = ({keySlice, sched}) => {
    return (<>
        {keySlice.map((key, index) => (
            <Grid item key={index} xs={1} minHeight={400} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#555'}}>
                <Stack>
                    {sched[key].certs.slice(0, -1).map((name, i) => (
                        <Typography sx={{fontWeight: 'bold'}}key={i}>
                            {name}
                        </Typography>
                    ))}
                    {sched[key].uncerts.slice(0, -1).map((name, i) => (
                        <Typography key={i}>
                            {name}
                        </Typography>
                    ))}
                </Stack>
            </Grid>
        ))}
    </>)
}

const CadetBeachRow = ({keySlice, sched}) => {
    return (<>
        {keySlice.map((key, index) => (
            <Grid item key={index} xs={1} minHeight={30} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#555'}}>
                <Stack>
                    <Typography sx={{fontWeight: 'bold'}}>
                        {sched[key].certs.slice(-1)}
                    </Typography>
                    <Typography>
                        {sched[key].uncerts.slice(-1)}
                    </Typography>
                </Stack>
            </Grid>
        ))}
    </>)
}

export default function LifeguardSchedule() {
    const [wk, setWk] = React.useState(1);
    const [sched, setSched] = React.useState(Object.fromEntries(keys.map(k => [k, {certs: [], uncerts: []}])));
    const [loaded, setLoaded] = React.useState(false);
    const dataFetchedRef = React.useRef(false);

    React.useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        
        ApiCall(
            "GET",
            `lifeguardSchedule`
        ).then((data) => {
            if (!loaded) {
                for (let i = 0; i < data.length; i++) {
                    let temp = sched;
                    // let certs_ray = data[i][1].split(",").slice(0, -1);
                    // let uncerts_ray = data[i][2].split(",").slice(0, -1);
                    // temp[data[i][0]] = {certs: certs_ray, uncerts: uncerts_ray};
                    if (data[i][4]) {
                        temp[data[i][1]].certs.push(data[i][2] + ' ' + data[i][3])
                    } else {
                        temp[data[i][1]].uncerts.push(data[i][2] + ' ' + data[i][3])
                    }
                    setSched(temp)
                }
            }    
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
                        <Grid item xs={1}>A.M. G.S.</Grid>
                        <LifeguardScheduleRow keySlice={wk === 1 ? keys_1.slice(0, 7) : keys_2.slice(0,7)} sched={sched}/> 
                                  
                        <Grid item xs={1}>A.M. Cadet Beach</Grid>
                        <CadetBeachRow keySlice={wk === 1 ? keys_1.slice(0, 7) : keys_2.slice(0,7)} sched={sched}/>

                        <Grid item xs={1}>P.M. G.S.</Grid>
                        <LifeguardScheduleRow keySlice={wk === 1 ? keys_1.slice(7, 14) : keys_2.slice(7,14)} sched={sched}/>

                        <Grid item xs={1}>P.M. Cadet Beach</Grid>
                        <CadetBeachRow keySlice={wk === 1 ? keys_1.slice(7, 14) : keys_2.slice(7,14)} sched={sched}/>
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
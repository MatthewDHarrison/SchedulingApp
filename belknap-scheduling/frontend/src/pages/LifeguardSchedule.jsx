import * as React from 'react';
import { ApiCall } from "../components/ApiCall";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const keys_1 = ['U1A', 'M1A', 'T1A', 'W1A', 'H1A', 'F1A', 'S1A', 'U1P', 'M1P', 'T1P', 'W1P', 'H1P', 'F1P', 'S1P']
const keys_2 = ['U2A', 'M2A', 'T2A', 'W2A', 'H2A', 'F2A', 'S2A', 'U2P', 'M2P', 'T2P', 'W2P', 'H2P', 'F2P', 'S2P']

export default function LifeguardSchedule() {
    const [wk, setWk] = React.useState(1);
    const [sched, setSched] = React.useState({'U1A': {certs: [], uncerts: []},
                                              'U1P': {certs: [], uncerts: []},
                                              'M1A': {certs: [], uncerts: []},
                                              'U2A': {certs: [], uncerts: []},
                                              'M2A': {certs: [], uncerts: []},
                                              'M2P': {certs: [], uncerts: []},
                                              'S2A': {certs: [], uncerts: []},
                                              'S2P': {certs: [], uncerts: []}});
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        ApiCall(
            "GET",
            `lifeguardSchedule`
        ).then((data) => {
            for (let i = 0; i < data.length; i++) {
                let temp = sched;
                let certs_ray = data[i][1].split(",").slice(0, -1);
                let uncerts_ray = data[i][2].split(",").slice(0, -1);
                temp[data[i][0]] = {certs: certs_ray, uncerts: uncerts_ray};
                setSched(temp)
            }
            setLoaded(true);
        })
    }, [])

    React.useEffect(() => {
        console.log(sched)
    }, [sched])
    if (loaded) {
        return (
            <Container component="main" maxWidth="xl">
                <Box sx={{ flexGrow: 1, p: 2, mt: 10}}
                        padding="40px"
                        borderRadius="10px"
                        backgroundColor="#ddd">
                    <Typography align="center" variant="h2">Week {wk}</Typography>
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

                        {wk === 1 ? keys_1.slice(0,7).map((key, index) => (
                        <Grid item key={index} xs={1} minHeight={400} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#333'}}>
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
                        )) : keys_2.slice(0,7).map((key, index) => (
                        <Grid item key={index} xs={1} minHeight={400} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#333'}}>

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
                        </Grid>))}

                        <Grid item xs={1}>A.M. Cadet Beach</Grid>

                        {wk === 1 ? keys_1.slice(0,7).map((key, index) => (
                        <Grid item key={index} xs={1} minHeight={30} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#333'}}>
                            <Stack>
                                <Typography sx={{fontWeight: 'bold'}}>
                                    {sched[key].certs.slice(-1)}
                                </Typography>
                                <Typography>
                                    {sched[key].uncerts.slice(-1)}
                                </Typography>
                            </Stack>
                        </Grid>
                        )) : keys_2.slice(0,7).map((key, index) => (
                        <Grid item key={index} xs={1} minHeight={30} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#333'}}>
                            <Stack>
                            <Typography sx={{fontWeight: 'bold'}}>
                                    {sched[key].certs.slice(-1)}
                                </Typography>
                                <Typography>
                                    {sched[key].uncerts.slice(-1)}
                                </Typography>
                            </Stack>
                        </Grid>))}
                        
                        <Grid item xs={1}>P.M. G.S.</Grid>

                        {wk === 1 ? keys_1.slice(7,14).map((key, index) => (
                        <Grid item key={index} xs={1} minHeight={400} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#333'}}>
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
                        )) : keys_2.slice(7,14).map((key, index) => (
                        <Grid item key={index} xs={1} minHeight={400} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#333'}}>
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
                        </Grid>))}

                        <Grid item xs={1}>P.M. Cadet Beach</Grid>

                        {wk === 1 ? keys_1.slice(7,14).map((key, index) => (
                        <Grid item key={index} xs={1} minHeight={30} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#333'}}>
                            <Stack>
                                <Typography sx={{fontWeight: 'bold'}}>
                                    {sched[key].certs.slice(-1)}
                                </Typography>
                                <Typography>
                                    {sched[key].uncerts.slice(-1)}
                                </Typography>
                            </Stack>
                        </Grid>
                        )) : keys_2.slice(7,14).map((key, index) => (
                        <Grid item key={index} xs={1} minHeight={30} sx={sched[key].certs.length > 0 ? {} : {bgcolor: '#333'}}>
                            <Stack>
                            <Typography sx={{fontWeight: 'bold'}}>
                                    {sched[key].certs.slice(-1)}
                                </Typography>
                                <Typography>
                                    {sched[key].uncerts.slice(-1)}
                                </Typography>
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
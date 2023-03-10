import * as React from 'react';
import { ApiCall } from "../components/ApiCall";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack, Grid } from '@mui/material';
import { Container  } from "react-smooth-dnd";
import LeaderDailyDragSched from '../components/LeaderDailyDragSched';
import LeaderSchedPreview from '../components/LeaderSchedPreview';

const days = ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Tuesday', 'Thursday', 'Friday'];

const keys = ['T11', 'T12', 'T13', 'H11', 'H12', 'H13', 'F11', 'F12', 'F13', 'S11', 'S12', 'S13',
              'T21', 'T22', 'T23', 'H21', 'H22', 'H23', 'F21', 'F22', 'F23'];
             


export default function LeaderSchedule() {
    const [sched, setSched] = React.useState({});
    const [page, setPage] = React.useState(0);
    const dataFetchedRef = React.useRef(false);

    React.useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        
        ApiCall(
            "GET",
            `masterSchedule`
        ).then((data) => {

            let temp = Object.fromEntries(keys.map(k => [k, {periods: []}]));
            for (let i = 0; i < data.length; i++) {
                temp[data[i][0]].periods.push(data[i][1])
            }
            setSched(temp)
        })
    }, [])

    return (sched['T11'] && 
        <Container component="main" maxWidth="xl">
            <Grid container justifyContent="center">
                <Grid item>
                    <Box maxWidth="lg" sx={{ flexGrow: 1, p: 2, mt: 10, mb: 20}}
                        padding="40px"
                        borderRadius="10px"
                        backgroundColor="#ddd">
                        {page === 7 ? <LeaderSchedPreview sched={sched} setSched={setSched} page={page} /> : <LeaderDailyDragSched sched={sched} setSched={setSched} page={page}/>}

                        <Stack direction="row" spacing={2} sx={{mt: 5}}>
                            {days.map((day, index) => (
                                <Button key={index} variant="contained" onClick={() => {setPage(index)}}>
                                    {day}
                                </Button>
                            ))}
                            <Button variant="contained" onClick={() => {setPage(7)}}>
                                View Schedule Preview
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
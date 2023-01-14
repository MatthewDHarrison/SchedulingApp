import * as React from 'react';
import { ApiCall } from "../components/ApiCall";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
// import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import ReactDOM from "react-dom";
import { Container, Draggable } from "react-smooth-dnd";
import {arrayMoveMutable} from "array-move";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import LeaderDailyDragSched from '../components/LeaderDailyDragSched';
import LeaderSchedPreview from '../components/LeaderSchedPreview';

const days = ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Tuesday', 'Thursday', 'Friday'];

const keys = ['T11', 'T12', 'T13', 'H11', 'H12', 'H13', 'F11', 'F12', 'F13', 'S11', 'S12', 'S13',
              'T21', 'T22', 'T23', 'H21', 'H22', 'H23', 'F21', 'F22', 'F23'];
const periods = ['First Period', 'Second Period', 'Third Period']
             


export default function LeaderSchedule() {
    const [sched, setSched] = React.useState(Object.fromEntries(keys.map(k => [k, {periods: []}])));
    const [loaded, setLoaded] = React.useState(false);
    const [page, setPage] = React.useState(0);
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
                
            </Container>

        );
    } else {
        return <>Loading...</>
    }
}
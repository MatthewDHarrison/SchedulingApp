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


const days = ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Tuesday', 'Thursday', 'Friday'];
// const keys = ['T11', 'H11', 'F11', 'S11', 'T21', 'H21', 'F21', 
//               'T12', 'H12', 'F12', 'S12', 'T22', 'H22', 'F22',
//               'T13', 'H13', 'F13', 'S13', 'T23', 'H23', 'F23']
const keys = ['T11', 'T12', 'T13', 'H11', 'H12', 'H13', 'F11', 'F12', 'F13', 'S11', 'S12', 'S13',
              'T21', 'T22', 'T23', 'H21', 'H22', 'H23', 'F21', 'F22', 'F23'];
const periods = ['First Period', 'Second Period', 'Third Period']
             


export default function LeaderDailyDragSched({sched, setSched, page}) {
    console.log(sched);

    const onDrop = ({removedIndex, addedIndex, payload}) => {
        console.log(payload.key);
        let temp = {...sched};
        arrayMoveMutable(temp[payload.key].periods, removedIndex, addedIndex);
        setSched(temp);
    };

 
    return (
        <>
            <Typography align="center" variant="h2">Programming Schedule -- {days[page]}</Typography>
            <Grid
                container
                spacing={2}
                columns={10}
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
                {periods.map((period, index) => (
                <Grid align-items="center" item key={index} xs={3} minHeight={10}>
                    <Typography variant="h7" align="center">
                        {period}
                    </Typography>
                </Grid>
                ))}

                <Grid item xs={1}>{days[page]}</Grid>

                {keys.slice(0 + page * 3,3 + page * 3).map((key, index) => (<Grid item key={key} xs={3} minHeight={400} sx={sched[key].periods.length > 0 ? {} : {bgcolor: '#555'}}>
                    <List>
                        <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}
                                    getChildPayload={(ind) => {return {key}}}>
                            {sched[key].periods.map((name, i) => (
                                <Draggable key={i}>
                                    <ListItem>
                                        <ListItemText primary={name} />
                                        <ListItemSecondaryAction>
                                            <ListItemIcon className="drag-handle">
                                            <DragHandleIcon />
                                            </ListItemIcon>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Draggable>
                            ))}
                        </Container>
                    </List>
                </Grid>))}
            </Grid>
        </>
    );
}
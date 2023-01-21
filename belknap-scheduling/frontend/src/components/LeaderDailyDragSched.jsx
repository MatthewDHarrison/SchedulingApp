import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { Container, Draggable } from "react-smooth-dnd";
import {arrayMoveMutable} from "array-move";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DragHandleIcon from "@mui/icons-material/DragHandle";


const days = ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Tuesday', 'Thursday', 'Friday'];

const keys = ['T11', 'T12', 'T13', 'H11', 'H12', 'H13', 'F11', 'F12', 'F13', 'S11', 'S12', 'S13',
              'T21', 'T22', 'T23', 'H21', 'H22', 'H23', 'F21', 'F22', 'F23'];
const periods = ['First Period', 'Second Period', 'Third Period']
             


export default function LeaderDailyDragSched({sched, setSched, page}) {

    const onDrop = ({removedIndex, addedIndex, payload}) => {
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

                {keys.slice(0 + page * 3,3 + page * 3).map((key, _) => (<Grid item key={key} xs={3} minHeight={400} minWidth={200} sx={sched[key].periods.length > 0 ? {} : {bgcolor: '#555'}}>
                    <List>
                        <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}
                                    getChildPayload={() => {return {key}}}>
                            {sched[key].periods.map((name, i) => (
                                <Draggable key={i}>
                                    <ListItem sx={{height: 30}} >
                                        <ListItemText primary={name} primaryTypographyProps={{fontSize: '14px'}}/>
                                        <ListItemSecondaryAction>
                                            <ListItemIcon className="drag-handle" sx={{'&:hover': {cursor: 'pointer'}}}>
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
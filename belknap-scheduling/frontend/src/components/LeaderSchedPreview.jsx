import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DragHandleIcon from "@mui/icons-material/DragHandle";


const days = ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Tuesday', 'Thursday', 'Friday'];
const keys = ['T11', 'H11', 'F11', 'S11', 'T21', 'H21', 'F21', 
              'T12', 'H12', 'F12', 'S12', 'T22', 'H22', 'F22',
              'T13', 'H13', 'F13', 'S13', 'T23', 'H23', 'F23']

const periods = ['First Period', 'Second Period', 'Third Period']
             
const LeaderSchedPreviewCell = ({period, keySlice, sched}) => {
    return (<>
        <Grid item xs={1}>{period}</Grid>

        {keySlice.map((key, index) => (
            <Grid item key={index} xs={1} minHeight={400} sx={sched[key].periods.length > 0 ? {} : {bgcolor: '#555'}}>
                <List sx={{listStyleType: 'decimal', pl: 4}} >
                    {sched[key].periods.slice(0,5).map((name, i) => (
                        <ListItem key={i} sx={{ display: 'list-item', fontWeight: 'bold'}}>
                            <ListItemText primary={name} />
                        </ListItem>
                    ))}
                </List>
            </Grid>))
        }
    </>)
}

export default function LeaderSchedPreview({sched, setSched, page, setPage}) {
    return (
        <>
            <Typography align="center" variant="h2">Schedule Preview (shows top 5 choices)</Typography>
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

                {days.map((day, index) => (
                <Grid align-items="center" item key={index} xs={1} minHeight={10}>
                    <Typography variant="h7" align="center">
                        {day}
                    </Typography>
                </Grid>
                ))}

                {[...Array(3)].map((_, ind) => {
                    return <LeaderSchedPreviewCell key={ind} period={periods[ind]} 
                                            keySlice={keys.slice(ind * 7, ind * 7 + 7)}
                                            sched={sched} />
                })}
                
            </Grid>
        </>
    );
}
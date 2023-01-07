import Container from "@mui/material/Container";
import { Typography, Box, Grid, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ApiCall } from "../components/ApiCall";
import React from "react";
import spinner from "../spinner.svg"


function AdminLanding() {
    const navigate = useNavigate();
    const [uFile, setUFile] = React.useState("");
    const [fileName, setFileName] = React.useState('');
    const [disableGen, setDisableGen] = React.useState(false);

    const generateLGSchedule = () => {
        setDisableGen(true)
        ApiCall('POST', 'admin/lifeguardSchedule', {uid: localStorage.getItem('userId')}).then(
            (data) => {
                if (data.users) {
                    navigate('/lifeguardSchedule');
                } else {
                    setDisableGen(false);
                    alert(data.err);
                }
            }
        );
        
    }

    const onFileChange = (e) => {
        setUFile(e.target.files[0])
    }
    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 20 }}
                    padding="40px"
                    borderRadius="10px"
                    backgroundColor="#ddd"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}><Typography variant="h3">Hello, program director!</Typography></Grid>
                        <Grid item><Typography variant="h5">To generate lifeguarding schedule from leaders with accounts click here: </Typography></Grid>
                        <Grid item>
                            <Button variant="contained" disabled={disableGen} component="label" onClick={generateLGSchedule}>
                                GENERATE SCHEDULE - WILL DELETE OLD SCHEDULE
                            </Button>
                        </Grid> 
                        <Grid item>
                            <Typography variant="h5">{uFile.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => {navigate('/lifeguardSchedule')}}>
                                GO TO LIFEGUARD SCHEDULE
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container justifyContent="center">
                    <Grid item sx={!disableGen ? {display: 'none'} : {display: 'block'}}>
                        <img src={spinner}/>
                    </Grid>
                    <Grid item sx={!disableGen ? {display: 'none'} : {display: 'block'}}>
                        <Typography color="#fff" variant="h3">This may take a minute or two...</Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default AdminLanding;

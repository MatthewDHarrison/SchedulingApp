import Container from "@mui/material/Container";
import { Typography, Box, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ApiCall } from "../components/ApiCall";
import React from "react";

function AdminLanding() {
    const navigate = useNavigate();
    const [uFile, setUFile] = React.useState("");
    const [fileName, setFileName] = React.useState('');

    const onFileUpload = () => {
        const formData = new FormData();

        formData.append(
            "staffList",
            uFile,
            uFile.name
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
                    sx={{ mt: 3 }}
                    padding="40px"
                    borderRadius="10px"
                    backgroundColor="#ddd"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}><Typography variant="h3">Hello, program director!</Typography></Grid>
                        <Grid item><Typography variant="h5">To upload staff information, click here: </Typography></Grid>
                        <Grid item>
                            <Button variant="contained" component="label">
                                CHOOSE FILE
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => {

                                        setUFile(e.target.files[0])
                                    }}
                                />
                            </Button>
                        </Grid> 
                        <Grid item>
                            <Typography variant="h5">{uFile.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={onFileUpload} disabled variant="contained">
                                UPLOAD AND CONTINUE
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default AdminLanding;

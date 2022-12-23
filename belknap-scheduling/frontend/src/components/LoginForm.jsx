import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function LoginForm({ submit }) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        submit(username, password); // to be completed - send data to backend
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    padding="40px"
                    borderRadius="10px"
                    backgroundColor="#ddd"
                >
                    <Typography
                        style={{ textAlign: "center" }}
                        component="h1"
                        variant="h5"
                    >
                        Timi-Hi!
                    </Typography>

                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className="inputRounded"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                color="secondary"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className="inputRounded"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="password"
                                onChange={(e) => setPassword(e.target.value)}
                                color="secondary"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!validateForm()}
                        size="large"
                        style={{ borderRadius: 50 }}
                        onClick={onSubmit}
                    >
                        Login
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default LoginForm;

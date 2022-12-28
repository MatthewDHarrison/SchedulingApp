import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function RegisterForm({ submit }) {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const isStrong = (p) => {
        const strongPassword = new RegExp(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
        );
        return strongPassword.test(p);
    };


    const validateForm = () => {
        return (
            username.length > 0 &&
            password.length > 0 &&
            isStrong(password) &&
            password === confirmPassword
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            username.length > 0 &&
            isStrong(password) &&
            password === confirmPassword
        ) {
            submit(username, password);
        }
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
                Welcome!
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
                    />
                </Grid>
                <Grid
                    item
                    sx={
                        isStrong(password) || password.length === 0
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                    xs={12}
                >
                    <Alert severity="error" style={{ borderRadius: 50 }}>
                        Password must be at least 8 letters, include one Uppercase
                        letter, one Lowercase letter, one numeral, and one special
                        character.
                    </Alert>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className="inputRounded"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    sx={
                        password === confirmPassword
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                    xs={12}
                >
                    <Alert severity="error" style={{ borderRadius: 50 }}>
                        Passwords do not match.
                    </Alert>
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
                Register
            </Button>
            <Typography component="p">Back to Login</Typography>
            <Button
                onClick={() => (navigate("/login"))}
                fullWidth
                variant="contained"
                size="large"
                style={{ borderRadius: 50 }}
            >
                Login
            </Button>
        </Box>
    </Container>
    </>
);
}

export default RegisterForm;

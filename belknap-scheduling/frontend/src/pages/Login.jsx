import LoginForm from "../components/LoginForm";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import { ApiCall } from "../components/ApiCall";
import React from "react";

function Login() {
    const navigate = useNavigate();
    const [showErrBlock, setShowErrBlock] = React.useState(false);
    const handleBadLogin = (errStatus) => {
        if (errStatus === "400") {
            setShowErrBlock(true);
        }
    };
    return (
        <>
            <LoginForm
                submit={async (username, password) => {
                    const body = {
                        // "email": "string",
                        username: username,
                        password: password,
                    };
                    ApiCall("POST", "user/userLogin", body, handleBadLogin).then(
                        (data) => {
                            if (data) {
                                localStorage.setItem("userId", data.uid);
                                navigate("/");
                            }
                        }
                    );
                }}
            />
            <Container component="main" maxWidth="xs">
                <Collapse in={showErrBlock}>
                    <Alert severity="error">Incorrect username or password!</Alert>
                </Collapse>
            </Container>
        </>
    );
}

export default Login;

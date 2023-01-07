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
                        username: username,
                        password: password,
                    };
                    ApiCall("POST", "users/login", body, handleBadLogin).then(
                        (data) => {
                            if (data.uid >= 0) {
                                localStorage.setItem("userId", data.uid);
                                console.log(localStorage.getItem("userId"))
                                if (data.uid == 1) {
                                    navigate("/admin");
                                } else if (data.yac == "None") {
                                    navigate(`/profile/modify/`);
                                } else {
                                    navigate('/lifeguardSchedule');
                                }
                            } else {
                                setShowErrBlock(true);
                            }
                        }
                    );
                }}
            />
            <Container component="main" maxWidth="xs">
                <Collapse in={showErrBlock}>
                    <Alert severity="error" sx={{borderRadius: "10px"}}>Incorrect username or password!</Alert>
                </Collapse>
            </Container>
        </>
    );
}

export default Login;

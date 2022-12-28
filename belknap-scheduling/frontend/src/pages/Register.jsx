import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import { ApiCall } from "../components/ApiCall";
import React from "react";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";

function Register() {
    const navigate = useNavigate();
    const [showErrBlock, setShowErrBlock] = React.useState(false);

    return (
        <>
            <RegisterForm
                submit={async (username, password) => {
                    const body = {
                        username: username,
                        password: password,
                    };
                    ApiCall("POST", "users/register", body).then(
                        (data) => {
                            console.log(data);
                            if (data.uid >= 0) {
                                localStorage.setItem("userId", data.uid);
                                console.log(data)
                                navigate(`/profile/modify/`);
                            } else {
                                setShowErrBlock(true);
                            }
                        }
                    );
                }}
            />
            <Container component="main" maxWidth="xs">
                <Collapse in={showErrBlock}>
                <Alert severity="error" sx={{borderRadius: "10px"}}>This username is already taken!</Alert>
                </Collapse>
            </Container>
        </>
    );
}

export default Register;

import ProfileModificationForm from "../components/ProfileModificationForm";
import { ApiCall } from "../components/ApiCall";
import { useNavigate } from "react-router-dom";
import React from "react";

function ProfileModificaton() {
const navigate = useNavigate();


return (
    <>
    <ProfileModificationForm
        submit={async (body) => {
            body.uid = localStorage.getItem("userId");
            ApiCall(
                "PUT",
                `users/update`,
                body
            ).then((data) => {
                if (data) {
                navigate("/");
                }
            });
        }} 
    />
    </>
);
}

export default ProfileModificaton;

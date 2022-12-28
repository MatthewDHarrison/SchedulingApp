import React from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminLanding from './pages/AdminLanding';
import ProfileModificaton from './pages/ProfileModification';


const Router = () => {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminLanding />} />
            <Route path="/profile/modify/" element={<ProfileModificaton />} />
        </Routes>
    );
}

export default Router;
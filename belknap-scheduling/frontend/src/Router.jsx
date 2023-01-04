import React from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminLanding from './pages/AdminLanding';
import ProfileModificaton from './pages/ProfileModification';
import LifeguardSchedule from './pages/LifeguardSchedule';


const Router = () => {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminLanding />} />
            <Route path="/profile/modify/" element={<ProfileModificaton />} />
            <Route path="/lifeguardSchedule" element={<LifeguardSchedule />} />
        </Routes>
    );
}

export default Router;
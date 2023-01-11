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
import LeaderSchedule from './pages/LeaderSchedule';


const Router = () => {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminLanding />} />
            <Route path="/profile/modify/" element={<ProfileModificaton />} />
            <Route path="/lifeguardSchedule" element={<LifeguardSchedule />} />
            <Route path="/leaderSchedule" element={<LeaderSchedule />} />
        </Routes>
    );
}

export default Router;
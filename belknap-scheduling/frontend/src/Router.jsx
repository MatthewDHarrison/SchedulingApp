import React from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';

import Login from './pages/Login';


const Router = () => {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default Router;
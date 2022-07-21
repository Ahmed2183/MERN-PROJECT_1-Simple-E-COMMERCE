//Private Compoment is our wraper in which we pass components as a props so Outlet handle this

import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

const PrivateComponent = () => {
    const auth = localStorage.getItem("User"); //User is our key that we define in SignUp.js and that show in our browser inspect>applictaion>localStorage
    return auth ? <Outlet/> : <Navigate to="/login"/>   
};

export default PrivateComponent;
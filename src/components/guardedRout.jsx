import React from 'react';
import { Navigate, Route, redirect } from 'react-router-dom';

const GuardedRoute = ({  isAuth, redirectPath, children }) => {
    if (!isAuth) {
        return <Navigate to={redirectPath} />
    } else {return children}
 
};

export default GuardedRoute;
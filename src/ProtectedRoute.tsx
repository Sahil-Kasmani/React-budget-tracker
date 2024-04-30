import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const IsLogin = localStorage.getItem("login");
    return IsLogin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;

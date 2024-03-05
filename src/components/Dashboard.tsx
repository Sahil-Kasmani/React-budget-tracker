import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const loggedUser = localStorage.getItem("user");
    const userName = loggedUser ? JSON.parse(loggedUser) : null;

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("login");
        navigate("/login");
    }


    return (
        <>
            {
                localStorage.getItem("login") ? (
                    <>
                        <div>Welcome - {userName.name}</div>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) :
                    <>
                        <h2 style={{ textAlign: "center", margin: "50px" }}>User is not logged in :- <Link to="/login">Login</Link></h2>
                    </>
            }
        </>
    )
}

export default Dashboard
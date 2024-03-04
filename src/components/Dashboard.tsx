import React from 'react'

const Dashboard = () => {
    const loggedUser = localStorage.getItem("user");
    const userName = loggedUser ? JSON.parse(loggedUser) : null;

    return (
        <div>Welcome - {userName.name}</div>
    )
}

export default Dashboard
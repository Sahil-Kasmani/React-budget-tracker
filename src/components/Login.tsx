import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string | number>('');
    const [pass, setPass] = useState<string | number>('');

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loggedUser = localStorage.getItem("user");
        const user = loggedUser ? JSON.parse(loggedUser) : null;

        {
            user.email === email && user.pass === pass ?
                <>
                    {navigate("/dashboard")}
                    {localStorage.setItem("login", "True")}
                </>
                : !email || !pass
                    ? alert("Please fill up the fields")
                    : !user.email && !user.pass
                        ? alert("Currently No user Exist")
                        : alert("Email or Password are invalid");
        }

    }

    return (
        <div className="main_login">

            <div className="login">

                <fieldset>
                    <h1>Login Form</h1>
                    <form id="login" autoComplete="off" noValidate onSubmit={(e) => { handleSubmit(e) }}>

                        <label htmlFor="email" id="email-label">Email <input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} type="email" id="email" name="email" placeholder="Enter your email address" required /></label>


                        <label htmlFor="password" id="password-label">Password <input value={pass} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPass(e.target.value) }} type="password" id="password" name="pass" placeholder="**************" required /></label>

                        <button type="submit" className="AuthBtn">Sign In</button>
                    </form>
                    <p>Not a member? <Link to="/">Sign up</Link></p>
                </fieldset>
            </div>
        </div>
    )
}

export default Login
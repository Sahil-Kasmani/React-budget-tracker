import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelopeOpenText,
    faLock,
} from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string | number>("");
    const [pass, setPass] = useState<string | number>("");

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loggedUser = localStorage.getItem("user");
        const user = loggedUser ? JSON.parse(loggedUser) : null;

        {
            user && user.email === email && user.pass === pass ? (
                <>
                    {navigate("/dashboard")}
                    {localStorage.setItem("login", "True")}
                </>
            ) : !email || !pass ? (
                alert("Please fill up the fields")
            ) : !user ? (
                alert("Currently No user Exist")
            ) : (
                alert("Email or Password are invalid")
            );
        }
    };

    return (
        <div className="container">
            <div className="con1">
                <img src="/images/web.jpg" alt="web_image" />
            </div>

            <div className="log">
                <fieldset>
                    <h1>Login Form</h1>
                    <form
                        id="login"
                        autoComplete="off"
                        noValidate
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <label htmlFor="email" id="email-label">
                            Email
                            <div className="inputIcon">

                                <input
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setEmail(e.target.value);
                                    }}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    required
                                />
                                <i>
                                    <FontAwesomeIcon icon={faEnvelopeOpenText} size="sm" />
                                </i>
                            </div>
                        </label>

                        <label htmlFor="password" id="password-label">
                            Password
                            <div className="inputIcon">

                                <input
                                    value={pass}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setPass(e.target.value);
                                    }}
                                    type="password"
                                    id="password"
                                    name="pass"
                                    placeholder="**************"
                                    required
                                />
                                <i>
                                    <FontAwesomeIcon icon={faLock} size="sm" />
                                </i>
                            </div>
                        </label>

                        <button type="submit" className="AuthBtn">
                            Sign In
                        </button>
                    </form>
                    <p>
                        Not a member? <Link to="/">Sign up</Link>
                    </p>
                </fieldset>
            </div>
        </div>
    );
};

export default Login;

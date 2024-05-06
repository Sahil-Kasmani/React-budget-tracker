import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
    faEnvelopeOpenText,
    faKey,
    faLock,
    faUserTag,
} from "@fortawesome/free-solid-svg-icons";

interface FormValues {
    name: string;
    email: string | number;
    uName: string | number;
    pass: string | number;
    cPass: string | number;
    CheckBox: boolean;
}

interface validError {
    [key: string]: string;
}

const Authentication: React.FC = () => {
    const [inpvalue, setInpvalue] = useState<FormValues>({
        name: "",
        email: "",
        uName: "",
        pass: "",
        cPass: "",
        CheckBox: false,
    });

    const [validationError, setValidationError] = useState<validError>({});

    const naviagte = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors: validError = {};

        const { name, email, uName, pass, cPass, CheckBox } = inpvalue;

        if (name === "") {
            errors.name = "Name field is required";
        } else if (!/^[A-Za-z\s]{2,}$/.test(name)) {
            errors.name = "Name must be contain 2 or more alphabetical characters";
        } else if (email === "") {
            errors.email = "Email field is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(String(email))) {
            errors.email = "Please enter a valid email address";
        } else if (uName === "") {
            errors.uName = "User Name Field is required";
        } else if (!/^[a-zA-Z\d]+$/.test(String(uName))) {
            errors.uName = "userName can only contains characters and numbers";
        } else if (pass === "") {
            errors.pass = "Password Field is required";
        } else if (
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(String(pass))
        ) {
            errors.pass =
                "Password must be valid (at least one digit, one lowercase, one uppercase, one special character, and 8 characters in length)";
        } else if (pass !== cPass) {
            errors.cPass = "Passwords does not match";
        } else if (!CheckBox) {
            errors.CheckBox = "Checkbox is required";
        } else {
            alert("Successfully submitted");
            let user_info = JSON.stringify({ name, email, uName, pass, cPass });
            localStorage.setItem("user", user_info);
            naviagte("/login");
        }
        setValidationError(errors);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type } = e.target;
        let value: string | boolean =
            type === "checkbox" ? e.target.checked : e.target.value;
        if (typeof value === "string") {
            value = value.trim();
        }
        setInpvalue(() => {
            return {
                ...inpvalue,
                [name]: value,
            };
        });
    };

    return (
        <div className="container">
            <div className="con1">
                <img src="/images/web.jpg" alt="web_image" />
            </div>

            <div className="auth">
                <fieldset>
                    <h1>Sign up</h1>
                    <p>Start tracking your finances today</p>
                    <form
                        id="authentication"
                        autoComplete="off"
                        onSubmit={(e) => handleSubmit(e)}
                        noValidate
                    >
                        <label htmlFor="name" id="name-label">
                            Full name
                            <div className="inputIcon">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your full name"
                                    className="jag"
                                    required
                                />
                                <i>
                                    <FontAwesomeIcon icon={faAddressCard} size="sm" />
                                </i>
                            </div>
                            {validationError.name && (
                                <li className="valiError">{validationError.name}</li>
                            )}
                        </label>

                        <label htmlFor="email" id="email-label">
                            Email
                            <div className="inputIcon">
                                <input
                                    onChange={handleChange}
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
                            {validationError.email && (
                                <li className="valiError">{validationError.email}</li>
                            )}
                        </label>

                        <label htmlFor="username" id="username-label">
                            Username
                            <div className="inputIcon">

                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="username"
                                    name="uName"
                                    placeholder="Choose a username"
                                    required
                                />
                                <i>
                                    <FontAwesomeIcon icon={faUserTag} size="sm" />
                                </i>
                            </div>
                            {validationError.uName && (
                                <li className="valiError">{validationError.uName}</li>
                            )}
                        </label>

                        <label htmlFor="password" id="password-label">
                            Password
                            <div className="inputIcon">

                                <input
                                    onChange={handleChange}
                                    type="password"
                                    id="password"
                                    name="pass"
                                    placeholder="**************"
                                    required
                                />
                                <i>
                                    <FontAwesomeIcon icon={faKey} size="sm" />
                                </i>
                            </div>
                            {validationError.pass && (
                                <li className="valiError">{validationError.pass}</li>
                            )}
                        </label>

                        <label htmlFor="c_password" id="c_password-label">
                            Confirm Password
                            <div className="inputIcon">

                                <input
                                    onChange={handleChange}
                                    type="password"
                                    id="c_password"
                                    name="cPass"
                                    placeholder="**************"
                                    required
                                />
                                <i>
                                    <FontAwesomeIcon icon={faLock} size="sm" />
                                </i>
                            </div>
                            {validationError.cPass && (
                                <li className="valiError">{validationError.cPass}</li>
                            )}
                        </label>

                        <label htmlFor="terms" id="terms-label">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    onChange={handleChange}
                                    type="checkbox"
                                    id="terms"
                                    name="CheckBox"
                                    className="inline"
                                    required
                                />
                                I agree to the Terms and Privacy Policy
                            </div>
                        </label>
                        {validationError.CheckBox && (
                            <li className="valiError">{validationError.CheckBox}</li>
                        )}

                        <button type="submit" className="AuthBtn">
                            Get started
                        </button>
                    </form>
                    <p>
                        Already a member? <Link to="/login">Log in</Link>
                    </p>
                </fieldset>
            </div>
        </div>
    );
};

export default Authentication;

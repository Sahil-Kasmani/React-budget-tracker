import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

interface FormValues {
    name: string,
    email: string | number,
    uName: string | number,
    pass: string | number,
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
        CheckBox: false
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
        } else if (uName === "") {
            errors.uName = "User Name Field is required";
        } else if (!/^[a-zA-Z\d]+$/.test(String(uName))) {
            errors.uName = "userName can only contains characters and numbers";
        } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(String(email))) {
            errors.email = ("Please enter a valid email address");
        } else if (pass === "") {
            errors.pass = "Password Field is required";
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(String(pass))) {
            errors.pass = "Password must be valid (at least one digit, one lowercase, one uppercase, one special character, and 8 characters in length)";
        } else if (pass !== cPass) {
            errors.cPass = "Passwords does not match";
        } else if (!CheckBox) {
            errors.CheckBox = "Checkbox is required";
        }
        else {
            alert("Successfully submitted");
            let user_info = JSON.stringify({ name, email, uName, pass, cPass });
            localStorage.setItem("user", user_info);
            naviagte("/login");
        }
        setValidationError(errors);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type } = e.target;
        const value = type === "checkbox" ? e.target.checked : e.target.value;
        setInpvalue(() => {
            return {
                ...inpvalue,
                [name]: value
            }
        })

    }


    return (
        <div className="container">
            <div className="con1">
                <img src="/images/web.jpg" alt="web_image" />
            </div>

            <div className="con2">

                <fieldset>
                    <h1>Sign up</h1>
                    <p>Start tracking your finances today</p>
                    <form id="authentication" autoComplete="off" onSubmit={(e) => handleSubmit(e)} noValidate>
                        <label htmlFor="name" id="name-label">Full name <input onChange={handleChange} type="text" id="name" name="name" placeholder="Your full name" required />{validationError.name && <li className="valiError">{validationError.name}</li>}</label>

                        <label htmlFor="email" id="email-label">Email <input onChange={handleChange} type="email" id="email" name="email" placeholder="Enter your email address" required />{validationError.email && <li className="valiError">{validationError.email}</li>}</label>

                        <label htmlFor="username" id="username-label">Username <input onChange={handleChange} type="text" id="username" name="uName" placeholder="Choose a username" required />{validationError.uName && <li className="valiError">{validationError.uName}</li>}</label>

                        <label htmlFor="password" id="password-label">Password <input onChange={handleChange} type="password" id="password" name="pass" placeholder="**************" required />{validationError.pass && <li className="valiError">{validationError.pass}</li>}</label>

                        <label htmlFor="c_password" id="c_password-label">Confirm Password <input onChange={handleChange} type="password" id="c_password" name="cPass" placeholder="**************" required />{validationError.cPass && <li className="valiError">{validationError.cPass}</li>}</label>

                        <label htmlFor="terms" id="terms-label"><input onChange={handleChange} type="checkbox" id="terms" name="CheckBox" className="inline" required />I agree to the Terms and Privacy Policy</label>{validationError.CheckBox && <li className="valiError">{validationError.CheckBox}</li>}

                        <button type="submit" className="AuthBtn">Get started</button>
                    </form>
                    <p>Already a member? <Link to="/login">Log in</Link></p>
                </fieldset>
            </div>
        </div>
    )
}

export default Authentication
import React, { useState } from "react"
import { Link } from "react-router-dom"

interface validError {
    [key: string]: string;
}

const Authentication: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string | number>('');
    const [uName, setUName] = useState<string | number>('');
    const [pass, setPass] = useState<string | number>('');
    const [cPass, setCPass] = useState<string | number>('');

    const [validationError, setValidationError] = useState<validError>({});



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const errors: validError = {};

        if (pass !== cPass) {
            errors.cPass = "Passwords does not match";

        } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(String(email))) {
            errors.email = ("Please enter a valid email address");
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(String(pass))) {
            errors.pass = "Password must be valid (at least one digit, one lowercase, one uppercase, one special character, and 8 characters in length)";
        } else if (!/^[A-Za-z\s]{2,}$/.test(name)) {
            errors.name = "Name must be contain 2 or more alphabetical characters";
        } else if (!/^[a-zA-Z\d]+$/.test(String(uName))) {
            errors.uName = "userName can only contains characters and numbers";
        }
        else {
            alert("Successfully submitted");
            let con = JSON.stringify({ name, email, uName, pass, cPass });
            console.log(con);
        }


        setValidationError(errors);

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "uName":
                setUName(value);
                break;
            case "pass":
                setPass(value);
                break;
            case "cPass":
                setCPass(value);
                break;
            default:
                break;
        }
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
                    <form id="authentication" onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="name" id="name-label">Full name <input value={name} onChange={handleChange} type="text" id="name" name="name" placeholder="Your full name" autoComplete="name" required />{validationError.name && <li className="valiError">{validationError.name}</li>}</label>

                        <label htmlFor="email" id="email-label">Email <input value={email} onChange={handleChange} type="email" id="email" name="email" placeholder="Enter your email address" autoComplete="email" required /></label>{validationError.email && <span className="valiError">{validationError.email}</span>}

                        <label htmlFor="username" id="username-label">Username <input value={uName} onChange={handleChange} type="text" id="username" name="uName" placeholder="Choose a username" autoComplete="username" required />{validationError.uName && <li className="valiError">{validationError.uName}</li>}</label>

                        <label htmlFor="password" id="password-label">Password <input value={pass} onChange={handleChange} type="password" id="password" name="pass" placeholder="**************" autoComplete="new-password" required />{validationError.pass && <li className="valiError">{validationError.pass}</li>}</label>

                        <label htmlFor="c_password" id="c_password-label">Confirm Password <input value={cPass} onChange={handleChange} type="password" id="c_password" name="cPass" placeholder="**************" autoComplete="con-password" required />{validationError.cPass && <li className="valiError">{validationError.cPass}</li>}</label>

                        <label htmlFor="terms" id="terms-label"><input type="checkbox" id="terms" className="inline" required />I agree to the Terms and Privacy Policy</label>

                        <button type="submit">Get started</button>
                    </form>
                    <p>Already a member? <Link to="/login">Log in</Link></p>
                </fieldset>
            </div>
        </div>
    )
}

export default Authentication
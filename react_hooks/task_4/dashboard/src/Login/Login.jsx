import { useState } from "react";
import "./Login.css";

function Login(props) {
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const validateForm = (email, password) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email) && password.length >= 8;
    };

    const handleChangeEmail = (e) => {
        const { value: email } = e.target;
        const { password } = formData;

        setFormData((prevFormData) => ({
            ...prevFormData,
            email,
        }));
        setEnableSubmit(validateForm(email, password));
    };

    const handleChangePassword = (e) => {
        const { value: password } = e.target;
        const { email } = formData;

        setFormData((prevFormData) => ({
            ...prevFormData,
            password,
        }));
        setEnableSubmit(validateForm(email, password));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (props.logIn) {
            props.logIn(email, password);
        }
    };

    const { email, password } = formData;

    return (
        <div className="App-body">
            <p>Login to access the full dashboard</p>

            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChangeEmail}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChangePassword}
                />

                <input type="submit" value="OK" disabled={!enableSubmit} />
            </form>
        </div>
    );
}

export default Login;

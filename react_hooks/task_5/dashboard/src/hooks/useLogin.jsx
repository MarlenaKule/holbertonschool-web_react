import { useState } from "react";

const useLogin = (onLogin) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [enableSubmit, setEnableSubmit] = useState(false);

    const validateForm = (currentEmail, currentPassword) => {
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return emailRegex.test(currentEmail) && currentPassword.length >= 8;
    };

    const handleChangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEnableSubmit(validateForm(newEmail, password));
    };

    const handleChangePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setEnableSubmit(validateForm(email, newPassword));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (enableSubmit && onLogin) {
            onLogin(email, password);
        }
    };

    return {
        email,
        password,
        enableSubmit,
        handleChangeEmail,
        handleChangePassword,
        handleLoginSubmit,
    };
};

export default useLogin;
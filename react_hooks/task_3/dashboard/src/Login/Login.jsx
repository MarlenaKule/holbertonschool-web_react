// Login/Login.jsx
import { useState } from "react";

function Login({ logIn = () => {} }) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const validate = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 8;
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, email: value }));
    setEnableSubmit(validate(value, formData.password));
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, password: value }));
    setEnableSubmit(validate(formData.email, value));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    logIn(formData.email, formData.password);
  };

  return (
    <div className="App-body">
      <p> Login to access the full dashboard</p>

      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChangeEmail}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChangePassword}
        />

        <input type="submit" value="OK" disabled={!enableSubmit} />
      </form>
    </div>
  );
}

export default Login;

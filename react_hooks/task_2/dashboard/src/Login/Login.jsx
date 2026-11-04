import { useState } from "react";

function Login({ logIn = () => {}, email = "", password = "" }) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email, password });

  const validateForm = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data.email) && data.password.length >= 8;
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    const newData = { ...formData, email: value };
    setFormData(newData);
    setEnableSubmit(validateForm(newData));
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    const newData = { ...formData, password: value };
    setFormData(newData);
    setEnableSubmit(validateForm(newData));
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
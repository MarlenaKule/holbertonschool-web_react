import { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      email: "",
      password: "",
      enableSubmit: false,
    };
  }

  validateForm = () => {
    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enableSubmit = emailRegex.test(email) && password.length >= 8;
    this.setState({ enableSubmit });
  };

  handleChangeEmail = (event) => {
    const email = event.target.value;
    this.setState({ email }, this.validateForm);
  };

  handleChangePassword = (event) => {
    const password = event.target.value;
    this.setState({ password }, this.validateForm);
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-body">
        <p> Login to access the full dashboard</p>

        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={this.handleChangeEmail}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleChangePassword}
          />

          <input type="submit" value="OK" disabled={!enableSubmit} />
        </form>
      </div>
    );
  }
}

export default Login;
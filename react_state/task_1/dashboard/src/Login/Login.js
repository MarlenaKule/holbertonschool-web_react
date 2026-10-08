import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
            email: "",
            password: "",
            enableSubmit: false
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    
    handleLoginSubmit(event) {
        event.preventDefault();
        this.setState({ isLoggedIn: true })
    }
    handleChangeEmail(event) {
        if (event.target.value !== "" && this.state.password !== "") {
            this.setState({ enableSubmit: true})
        } else {
            this.setState({ enableSubmit: false })
        }

        this.setState({ email: event.target.value })
    }
    handleChangePassword(event) {
        if (event.target.value !== "" && this.state.email !== "") {
            this.setState({ enableSubmit: true})
        } else {
           
            this.setState({ enableSubmit: false })
        }
        this.setState({ password: event.target.value })
    }
    render() {
        return (
            <div className={css(styles.body)}>
                <p>Login to access the full dashboard</p>
                <form onSubmit={this.handleLoginSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input type="email"
                           name="email"
                           id="email"
                           className={css(styles.input)}
                           value={this.state.email}
                           onChange={this.handleChangeEmail}
                    />
                    <label htmlFor="password">Password: </label>
                    <input type="password"
                           name="password"
                           id="password"
                           className={css(styles.input)}
                           value={this.state.password}
                           onChange={this.handleChangePassword}
                    />
                    <input type="submit" className={css(styles.button)} disabled={!this.state.enableSubmit} value="OK"/>
                </form>
            </div>
            );
    }
}

const styles = StyleSheet.create({
    body: {
        margin: 50,
        '@media only screen and (max-width: 600px)': {
            margin: 0
        }
    },
    input: {
        marginLeft: 20,
        marginRight: 20,
        '@media only screen and (max-width: 600px)': {
            marginTop: 10,
            marginBottom: 10
        }
    },
    button: {
        '@media only screen and (max-width: 600px)': {
            display: 'flex',
            marginTop: 10
        }
    }
})

export default Login;
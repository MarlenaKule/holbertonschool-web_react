import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login() {
    return (
    <div className={css(styles.body)}>
        <p>Login to access the full dashboard</p>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" className={css(styles.input)}/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" className={css(styles.input)}/>
        <button type="button" className={css(styles.button)}>OK</button>
    </div>
    );
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
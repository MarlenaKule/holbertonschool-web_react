import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import './Header.css';

function Header() {
    return (
        <header className="App-header">
            <img src={logo} className="logo" alt="Holberton logo" />
            <h1>School dashboard</h1>
        </header>
    );
}

export default Header;
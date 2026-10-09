/* eslint-disable */
import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import './Header.css';

function Header() {
    return (
        <div className="App-header">
            <img src={logo} alt="holberton logo" />
            <h1 style={{ color: '#e1003c' }}>School dashboard</h1>
        </div>
    );
}

export default Header;
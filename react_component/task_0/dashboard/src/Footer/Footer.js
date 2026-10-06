import React from 'react';
import './Footer.css';
import { getFooterCopy, getFullYear } from '../utils/util';

function Footer() {
    return (
        <footer className="App-footer">
            <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
        </footer>
    );
}

export default Footer;
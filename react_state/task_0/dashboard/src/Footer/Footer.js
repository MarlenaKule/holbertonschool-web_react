import React from 'react';
import { getFooterCopy, getFullYear } from '../utils/util';

function Footer() {
    return (
        <footer>
            <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
        </footer>
    );
}

export default Footer;
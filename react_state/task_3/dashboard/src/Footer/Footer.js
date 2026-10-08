import React, { useContext } from 'react';
import { getFooterCopy, getFullYear } from '../utils/util';
import AppContext from '../App/AppContext';

function Footer() {
    const { user } = useContext(AppContext)
    return (
        <footer>
            <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
            {user.isLoggedIn && <p><a>Contact Us</a></p>}
        </footer>
    );
}

export default Footer;
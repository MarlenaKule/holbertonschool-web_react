import { getCurrentYear, getFooterCopy } from "../utils/utils";
import "./Footer.css";

const Footer = ({ user }) => {

    return (
        <div className="App-footer">
            <p>
                Copyright {getCurrentYear()} - {getFooterCopy(true)}
            </p>
            {user.isLoggedIn && (
                <p>
                    <a href="#contact">Contact us</a>
                </p>
            )}
        </div>
    );
};

export default Footer;

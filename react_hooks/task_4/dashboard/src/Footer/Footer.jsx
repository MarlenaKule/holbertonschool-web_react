import { useContext } from "react";
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import AppContext from "../Context/context";
import "./Footer.css";

const Footer = () => {
    const { user = {} } = useContext(AppContext);

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

// Header/Header.jsx
import { useContext } from "react";
import holbertLogo from "../assets/holberton-logo.jpg";
import newContext from "../Context/context";

function Header() {
    const { user, logOut } = useContext(newContext);

    return (
        <div className="App-header">
            <img src={holbertLogo} alt="holberton logo" />
            <h1 style={{ color: "#e1003c" }}>School dashboard</h1>

            {user.isLoggedIn && (
                <div id="logoutSection">
                    Welcome {user.email} (
                    <a href="#" onClick={logOut}>
                        logout
                    </a>
                    )
                </div>
            )}
        </div>
    );
}

export default Header;
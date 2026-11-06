import logo from "../assets/holberton-logo.jpg";

import "./Header.css";

function Header({ user, logOut }) {
  const handleLogout = (e) => {
    e.preventDefault();
    logOut();
  };
  return (
    <>
      <div className="App-header">
        <img src={logo} alt="holberton logo" />
        <h1 style={{ color: "#e1003c" }}>School dashboard</h1>
      </div>

      {user.isLoggedIn && (
        <div id="logoutSection">
          Welcome {user.email} (
          <a href="#logout" onClick={handleLogout}>
            logout
          </a>
          )
        </div>
      )}
    </>
  );
}

export default Header;

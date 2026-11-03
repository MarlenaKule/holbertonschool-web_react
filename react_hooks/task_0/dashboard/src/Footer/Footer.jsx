// Footer/Footer.jsx
import { useContext } from "react";
import { getCurrentYear, getFooterCopy } from "../utils/utils.js";
import newContext from "../Context/context";

function Footer() {
  const { user } = useContext(newContext);

  return (
    <div className="App-footer">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
      {user.isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </div>
  );
}

export default Footer;
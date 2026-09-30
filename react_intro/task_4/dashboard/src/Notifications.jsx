import "./Notifications.css";
import closeIcon from "./assets/close-button.png";
import { getLatestNotification } from "./utils";

function Notifications() {

    const handleClick = () => {
        console.log("Close button has been clicked");
    }

    return (
        <div className="notification-items">
            <p>Here is the list of notifications</p>

            <ul>
                <li data-priority="default">New course available</li>
                <li data-priority="urgent">New resume available</li>
                <li dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
            </ul>
            
            <button style={{ position: "absolute", top: "15px", right: "20px" }} aria-label="Close" onClick={handleClick}>
                <img style={{ width: "10px", height: "10px" }} src={closeIcon} />
            </button>
        </div >
    )
}

export default Notifications;
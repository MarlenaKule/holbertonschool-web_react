import "./Notifications.css";
import closeIcon from "./assets/close-button.png";
import { getLatestNotification } from "./utils";

const Notifications = () => {
  return (
    <div className="notification-items">
      <button
        aria-label="Close"
        onClick={() => console.log("Close button has been clicked")}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img src={closeIcon} alt="close icon" style={{ width: "10px" }} />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        />
      </ul>
    </div>
  );
};

export default Notifications;
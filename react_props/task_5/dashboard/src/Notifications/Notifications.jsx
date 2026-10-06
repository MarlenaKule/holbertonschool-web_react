import { Fragment } from "react";
import "./Notifications.css";
import closeIcon from "../assets/close-button.png";
import NotificationItem from "./NotificationItem.jsx";

function Notifications({ notifications = [], displayDrawer = false }) {
  const handleClick = () => {
    console.log("Close button has been clicked");
  };

  let content = null;

  if (displayDrawer) {
    if (notifications.length === 0) {
      content = <p>No new notification for now</p>;
    } else {
      content = (
        <Fragment>
          <p>Here is the list of notifications</p>
          <ul>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                type={notification.type}
                value={notification.value}
                html={notification.html}
              />
            ))}
          </ul>
          <button
            style={{ position: "absolute", top: "15px", right: "20px" }}
            aria-label="Close"
            onClick={handleClick}
          >
            <img
              style={{ width: "10px", height: "10px" }}
              src={closeIcon}
              alt="close icon"
            />
          </button>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      <div className="notification-title">Your notifications</div>
      <div className="notification-items">{content}</div>
    </Fragment>
  );
}

export default Notifications;
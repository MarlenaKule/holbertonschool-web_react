// Notifications/Notifications.jsx
import React, { Fragment } from "react";
import "./Notifications.css";
import closeIcon from "../assets/close-button.png";
import NotificationItem from "./NotificationItem.jsx";

class Notifications extends React.PureComponent {
  render() {
    const {
      notifications = [],
      displayDrawer = false,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
    } = this.props;

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
                  id={notification.id}
                  type={notification.type}
                  html={notification.html}
                  value={notification.value}
                  markAsRead={markNotificationAsRead}
                />
              ))}
            </ul>
          </Fragment>
        );
      }
    }

    return (
      <Fragment>
        <div className="notification-title" onClick={handleDisplayDrawer}>
          Your notifications
        </div>
        {displayDrawer && (
          <div className="notification-items">
            {content}
            <button
              style={{ position: "absolute", top: "15px", right: "20px" }}
              aria-label="Close"
              onClick={handleHideDrawer}
            >
              <img
                style={{ width: "10px", height: "10px" }}
                src={closeIcon}
                alt="close icon"
              />
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Notifications;
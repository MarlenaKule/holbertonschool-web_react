// Notifications/Notifications.jsx
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Notifications.css";
import closeIcon from "../assets/close-button.png";
import NotificationItem from "./NotificationItem.jsx";

const Notifications = ({
  notifications = [],
  displayDrawer = false,
  handleDisplayDrawer,
  handleHideDrawer,
  markNotificationAsRead,
}) => {
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
};

Notifications.propTypes = {
  notifications: PropTypes.array,
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

const arePropsEqual = (prevProps, nextProps) => {
  if (prevProps.displayDrawer !== nextProps.displayDrawer) return false;

  const prevNotifs = prevProps.notifications || [];
  const nextNotifs = nextProps.notifications || [];

  if (prevNotifs.length !== nextNotifs.length) return false;

  const notificationsEqual = prevNotifs.every((prevNotif, index) => {
    const nextNotif = nextNotifs[index];
    return (
      prevNotif.id === nextNotif.id &&
      prevNotif.type === nextNotif.type &&
      prevNotif.value === nextNotif.value &&
      prevNotif.html === nextNotif.html
    );
  });

  if (!notificationsEqual) return false;

  if (
    prevProps.handleDisplayDrawer !== nextProps.handleDisplayDrawer ||
    prevProps.handleHideDrawer !== nextProps.handleHideDrawer ||
    prevProps.markNotificationAsRead !== nextProps.markNotificationAsRead
  ) {
    return false;
  }

  return true;
};

export default React.memo(Notifications, arePropsEqual);
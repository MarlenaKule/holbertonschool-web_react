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

// Funksioni i personalizuar i krahasimit për React.memo
const arePropsEqual = (prevProps, nextProps) => {
  // 1. Kontrollo displayDrawer
  if (prevProps.displayDrawer !== nextProps.displayDrawer) {
    return false;
  }

  // 2. Kontrollo listën e njoftimeve (length + elementet)
  const prevNotifs = prevProps.notifications || [];
  const nextNotifs = nextProps.notifications || [];

  if (prevNotifs.length !== nextNotifs.length) {
    return false;
  }

  const notificationsEqual = prevNotifs.every((prevNotif, index) => {
    const nextNotif = nextNotifs[index];
    return (
      prevNotif.id === nextNotif.id &&
      prevNotif.type === nextNotif.type &&
      prevNotif.value === nextNotif.value &&
      prevNotif.html === nextNotif.html
    );
  });

  if (!notificationsEqual) {
    return false;
  }

  // 3. Kontrollo funksionet (referencat)
  if (
    prevProps.handleDisplayDrawer !== nextProps.handleDisplayDrawer ||
    prevProps.handleHideDrawer !== nextProps.handleHideDrawer ||
    prevProps.markNotificationAsRead !== nextProps.markNotificationAsRead
  ) {
    return false;
  }

  // Të gjitha props janë të barabarta → mos re-render
  return true;
};

export default React.memo(Notifications, arePropsEqual);
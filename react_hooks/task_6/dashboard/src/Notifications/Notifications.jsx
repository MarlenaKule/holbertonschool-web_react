import { memo } from "react";
import closeIcon from "../assets/close-button.png";
import NotificationItem from "./NotificationItem";
import "./Notifications.css";

function Notifications({
    notifications = [],
    displayDrawer = false,
    handleDisplayDrawer,
    handleHideDrawer,
    markNotificationAsRead,
}) {
    return (
        <div className="notifications-container">
            <div className="notification-title" onClick={handleDisplayDrawer}>
                Your notifications
            </div>

            {displayDrawer && (
                <div className="notification-items">
                    {notifications.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <p>No new notification for now</p>
                    )}

                    <button
                        aria-label="Close"
                        onClick={handleHideDrawer}
                        className="close-button"
                    >
                        <img alt="Close Button" src={closeIcon} />
                    </button>
                </div>
            )}
        </div>
    );
}

function arePropsEqual(prevProps, nextProps) {
    return (
        prevProps.notifications === nextProps.notifications &&
        prevProps.displayDrawer === nextProps.displayDrawer &&
        prevProps.handleDisplayDrawer === nextProps.handleDisplayDrawer &&
        prevProps.handleHideDrawer === nextProps.handleHideDrawer &&
        prevProps.markNotificationAsRead === nextProps.markNotificationAsRead
    );
}

export default memo(Notifications, arePropsEqual);

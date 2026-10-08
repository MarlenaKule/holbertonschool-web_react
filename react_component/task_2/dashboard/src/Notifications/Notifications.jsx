/* eslint-disable */
import React from "react";
import closeIcon from "../assets/close-button.png";
import NotificationItem from "./NotificationItem";
import "./Notifications.css";

class Notifications extends React.Component {

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    };

    render() {
        const { notifications = [], displayDrawer = false } = this.props;

        return (
            <div className="notifications-container">
                <div className="notification-title">Your notifications</div>

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
                                            markAsRead={this.markAsRead}
                                        />
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>No new notification for now</p>
                        )}

                        <button
                            aria-label="Close"
                            onClick={() =>
                                console.log("Close button has been clicked")
                            }
                            className="close-button"
                        >
                            <img alt="Close Button" src={closeIcon} />
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Notifications;
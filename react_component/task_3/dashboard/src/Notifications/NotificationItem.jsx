/* eslint-disable */
import React from "react";

class NotificationItem extends React.Component {
    render() {
        const { type = "default", html, value, markAsRead, id } = this.props;

        const style = type === "urgent" ? { color: "red" } : { color: "blue" };

        if (html) {
            return (
                <li
                    data-notification-type={type}
                    style={style}
                    dangerouslySetInnerHTML={html}
                    onClick={() => markAsRead && markAsRead(id)}
                />
            );
        }

        return (
            <li
                data-notification-type={type}
                style={style}
                onClick={() => markAsRead && markAsRead(id)}
            >
                {value}
            </li>
        );
    }
}

export default NotificationItem;
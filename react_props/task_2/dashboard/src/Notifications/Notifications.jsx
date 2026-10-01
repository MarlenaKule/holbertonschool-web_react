import React from 'react';
import NotificationItem from './NotificationItem';

function Notifications({ notifications }) {
    return (
        <div className="Notifications">
            <p>Here is the list of notifications</p>
            <ul>
                {notifications.map((notif) => (
                    <NotificationItem
                        key={notif.id}
                        type={notif.type}
                        value={notif.value}
                        html={notif.html}
                    />
                ))}
            </ul>
        </div>
    );
}

Notifications.defaultProps = {
    notifications: [],
};

export default Notifications;

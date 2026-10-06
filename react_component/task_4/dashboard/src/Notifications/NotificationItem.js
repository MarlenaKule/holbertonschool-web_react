import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type, html, value, markAsRead, id }) {
    let list;

    if (value) {
        list = <li data-notification-type={type} onClick={() => markAsRead(id)}>{value}</li>
    } else {
        list = (
            <li data-notification-type={type} dangerouslySetInnerHTML={{ __html: html }} onClick={() => markAsRead(id)}></li>
        )
    }
    return list;
};

NotificationItem.propTypes = {
    type: PropTypes.string,
    html: PropTypes.shape({
        __html: PropTypes.string
    }),
    value: PropTypes.string,
    markAsRead: PropTypes.func,
    id: PropTypes.number
}

NotificationItem.defaultProps = {
    type: "default",
    value: "",
    html: { __html: "" },
    markAsRead: () => {},
    id: NaN
}


export default NotificationItem;
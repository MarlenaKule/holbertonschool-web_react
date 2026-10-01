import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type, html, value }) {
    let list;

    if (value) {
        list = <li data-notification-type={type}>{value}</li>
    } else {
        list = (
            <li data-notification-type={type} dangerouslySetInnerHTML={{ __html: html }}></li>
        )
    }
    return list;
};

NotificationItem.propTypes = {
    type: PropTypes.string,
    html: PropTypes.shape({
        __html: PropTypes.string
    }),
    value: PropTypes.string
}

NotificationItem.defaultProps = {
    type: "default",
    value: "",
    html: { __html: "" }
}


export default NotificationItem;
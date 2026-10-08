import React from 'react';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const NotificationItem = memo(function NotificationItem({ type, html, value, markAsRead, id }) {
    let list;

    let typeStyle = css(type === 'urgent' ? styles.urgent : styles.default, styles.mobile);

    if (value) {
        list = <li className={typeStyle} onClick={() => markAsRead(id)}>{value}</li>
    } else {
        list = (
            <li className={typeStyle} dangerouslySetInnerHTML={{ __html: html }} onClick={() => markAsRead(id)}></li>
        )
    }
    return list;
});


const styles = StyleSheet.create({
    default: {
        color: 'rgb(13, 13, 154)',
    },
    urgent: {
        color: '#E0354B'
    },
    mobile: {
        '@media only screen and (max-width: 600px)': {
            fontSize: '20px',
            padding: '10px 8px',
            listStyle: 'none',
            borderBottom: '3px solid #000'
        }
    }
})

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
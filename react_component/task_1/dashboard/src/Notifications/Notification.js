import React from 'react';
import './Notification.css';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';

function Notification({ displayDrawer, listNotifications }) {
    const handledClick = () => {
        console.log('Close button has been clicked')
    };
    return (
        <>
            <div className='menuItem'>
                <p>Your notifications</p>
            </div>
            {displayDrawer && (
                <div className='Notifications'>
                    <button style={{
                        background: 'transparent',
                        position: 'absolute',
                        right: 20,
                        border: 'none'
                    }} aria-label='Close' onClick={handledClick}><img src={closeIcon} alt='Close icon'/></button>
                    <p>Here is the list of notifications</p>
                    <ul>
                        {listNotifications === 0 && (
                            <Notification type="default" value="No new notification for now" />
                        )}

                        {listNotifications.map((notification) => (
                            <NotificationItem key={notification.id} type={notification.type}
                                value={notification.value} html={notification.html} />
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

Notification.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape)
}

Notification.defaultProps = {
    displayDrawer: false
}

export default Notification;
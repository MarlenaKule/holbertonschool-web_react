import React from 'react';
import './Notification.css';
import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/util';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';

function Notification({ displayDrawer }) {
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
                    }} aria-label='Close' onClick={handledClick}><img src={closeIcon} alt='Close icon' /></button>
                    <p>Here is the list of notifications</p>
                    <ul>
                        <NotificationItem type="default" value="New course available" />
                        <NotificationItem type="urgent" value="New resume available" />
                        <NotificationItem type='urgent' html={getLatestNotification()} />
                    </ul>
                </div>
            )}
        </>
    )
}

Notification.propTypes = {
    displayDrawer: PropTypes.bool
}

Notification.defaultProps = {
    displayDrawer: false
}

export default Notification;
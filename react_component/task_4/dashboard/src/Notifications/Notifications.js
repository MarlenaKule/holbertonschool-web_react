import React, { Component } from 'react';
import './Notification.css';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.markAsRead = this.markAsRead.bind(this);
    }
    markAsRead(id) {
        console.log(`Notification ${id} has been marked as read`)
    };
    render() {
        const { displayDrawer, listNotifications } = this.props;
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
                                value={notification.value} html={notification.html} id={notification.id} markAsRead={this.markAsRead} />
                        ))}
                    </ul>
                </div>
            )}
        </>
        )
    }
}

Notification.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape)
}

Notification.defaultProps = {
    displayDrawer: false
}

export default Notification;
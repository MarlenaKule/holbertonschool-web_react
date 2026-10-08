import React, { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';

class Notification extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;
        const menu = css(displayDrawer ? styles.menuHide : styles.menuShow);
        return (
            <>
            <div className={css(styles.menuItem)}>
                <p className={menu} onClick={handleDisplayDrawer}>Your notifications</p>
            </div>
            {displayDrawer && (
                <div className={css(styles.notification)}>
                    <button style={{
                        background: 'transparent',
                        position: 'absolute',
                        right: 20,
                        border: 'none'
                    }} aria-label='Close' onClick={handleHideDrawer}><img src={closeIcon} alt='Close icon' className={css(styles.img)}/></button>
                    <p>Here is the list of notifications</p>
                    <ul className={css(styles.ul)}>
                        {listNotifications === 0 && (
                            <Notification type="default" value="No new notification for now" />
                        )}

                        {listNotifications.map((notification) => (
                            <NotificationItem key={notification.id} type={notification.type}
                                value={notification.value} html={notification.html} id={notification.id} markAsRead={markNotificationAsRead} />
                        ))}
                    </ul>
                </div>
            )}
            </>
        )
    }
}

const opacityChange = {
    from: {
        opacity: 0.5
    },
    to: {
        opacity: 1
    }
}

const bounceAnimation = {
    '0%': {
        transform: 'translateY(0)',
    },

    '50%': {
        transform: 'translateY(-5px)',
    },

    '75%': {
        transform: 'translateY(5px)',
    },
    '100%': {
        transform: 'translateY(0px)'
    }

}

const borders = {
    '0%': {
        border: '2px dashed cyan'
    },
    '100%': {
        border: '2px dashed #E0354B',
    }
}

const styles = StyleSheet.create({
    ul: {
        '@media only screen and (max-width: 600px)': {
            padding: 0
        }

    },
    notification: {
        padding: 10,
        width: 400,
        float: 'right',
        animationName: [borders],
        animationDuration: '0.8s',
        animationIterationCount: 1,
        animationFillMode: 'forwards',
        '@media only screen and (max-width: 600px)': {
            position: 'fixed',
            zIndex: 10,
            boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.1)',
            fontSize: '20px',
            padding: 0,
            height: '100vh',
            width: '100%',
            top: 0,
            left: 0,
            backgroundColor: '#fff',
            border: 'none'
        }
    },
    img: {
        width: 15,
        height: 15
    },
    menuItem: {
        textAlign: 'right',
        backgroundColor: '#fff8f8',
        ':hover': {
            cursor: 'pointer',
            animationName: [opacityChange, bounceAnimation],
            animationIterationCount: 3,
            animationDuration: '1s, 0.5s'
        },
    },
    menuHide: {
        display: 'none'
    },
    menuShow: {
        marginRight: '8px'
    }
})

Notification.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape),
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
    markNotificationAsRead: PropTypes.func
}

Notification.defaultProps = {
    displayDrawer: false,
    listNotifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markNotificationAsRead: () => {}
}

export default Notification;
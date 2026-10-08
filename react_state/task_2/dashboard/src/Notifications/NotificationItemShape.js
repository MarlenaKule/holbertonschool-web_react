import PropTypes from 'prop-types';

const NotificationItemShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    html: PropTypes.shape({
        __html: PropTypes.string
    }),
    value: PropTypes.string
})

export default NotificationItemShape;
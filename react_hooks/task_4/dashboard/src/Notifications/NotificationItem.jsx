import { memo } from "react";
import PropTypes from "prop-types";

function NotificationItem({ type = "default", html, value, markAsRead, id }) {
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

NotificationItem.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

export default memo(NotificationItem);
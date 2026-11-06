// Notifications/NotificationItem.jsx
import { memo } from "react";

function NotificationItem({ type = "default", html, value, markAsRead, id }) {
  const style = type === "urgent" ? { color: "red" } : { color: "blue" };
  const handleClick = () => markAsRead && markAsRead(id);

  if (html) {
    return (
      <li
        data-notification-type={type}
        style={style}
        dangerouslySetInnerHTML={html}
        onClick={handleClick}
      />
    );
  }

  return (
    <li data-notification-type={type} style={style} onClick={handleClick}>
      {value}
    </li>
  );
}

export default memo(NotificationItem);

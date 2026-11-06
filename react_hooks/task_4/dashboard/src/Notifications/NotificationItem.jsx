import { memo } from "react";

const NotificationItem = memo(function NotificationItem({
  id = 0,
  type = "default",
  value = "",
  html = null,
  markAsRead = () => {},
}) {
  const style = {
    color: type === "urgent" ? "red" : "blue",
  };

  const handleClick = () => {
    markAsRead(id);
  };

  if (html) {
    return (
      <li
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={handleClick}
        style={style}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      onClick={handleClick}
      style={style}
    >
      {value}
    </li>
  );
});

export default NotificationItem;

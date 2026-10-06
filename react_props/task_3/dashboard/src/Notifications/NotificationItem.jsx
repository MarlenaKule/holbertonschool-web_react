function NotificationItem({ type, html, value }) {
  const color = type === "urgent" ? "red" : "blue";

  if (html) {
    return (
      <li
        data-notification-type={type}
        style={{ color }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <li data-notification-type={type} style={{ color }}>
      {value}
    </li>
  );
}

export default NotificationItem;
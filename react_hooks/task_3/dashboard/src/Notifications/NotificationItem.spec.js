// Notifications/NotificationItem.spec.js
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationItem from "./NotificationItem";

test("renders a default notification in blue with the right data attribute", () => {
  render(
    <ul>
      <NotificationItem type="default" value="Default message" />
    </ul>,
  );
  const item = screen.getByText(/default message/i);
  expect(item).toHaveStyle({ color: "blue" });
  expect(item).toHaveAttribute("data-notification-type", "default");
});

test("renders an urgent notification in red with the right data attribute", () => {
  render(
    <ul>
      <NotificationItem type="urgent" value="Urgent message" />
    </ul>,
  );
  const item = screen.getByText(/urgent message/i);
  expect(item).toHaveStyle({ color: "red" });
  expect(item).toHaveAttribute("data-notification-type", "urgent");
});

test("renders html content when the html prop is provided", () => {
  render(
    <ul>
      <NotificationItem
        type="urgent"
        html={{ __html: "<strong>Urgent requirement</strong>" }}
      />
    </ul>,
  );
  const strong = screen.getByText(/urgent requirement/i);
  expect(strong.tagName).toBe("STRONG");
});

test("clicking the item calls markAsRead with its id", () => {
  const markAsRead = jest.fn();
  render(
    <ul>
      <NotificationItem
        id={7}
        type="default"
        value="Click me"
        markAsRead={markAsRead}
      />
    </ul>,
  );
  fireEvent.click(screen.getByText(/click me/i));
  expect(markAsRead).toHaveBeenCalledTimes(1);
  expect(markAsRead).toHaveBeenCalledWith(7);
});

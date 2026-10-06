import { render, screen } from "@testing-library/react";
import NotificationItem from "./NotificationItem";

test("renders default notification in blue with correct data attribute", () => {
  render(
    <ul>
      <NotificationItem type="default" value="Default message" />
    </ul>
  );
  const item = screen.getByText(/default message/i);
  expect(item).toHaveStyle({ color: "blue" });
  expect(item).toHaveAttribute("data-notification-type", "default");
});

test("renders urgent notification in red with correct data attribute", () => {
  render(
    <ul>
      <NotificationItem type="urgent" value="Urgent message" />
    </ul>
  );
  const item = screen.getByText(/urgent message/i);
  expect(item).toHaveStyle({ color: "red" });
  expect(item).toHaveAttribute("data-notification-type", "urgent");
});
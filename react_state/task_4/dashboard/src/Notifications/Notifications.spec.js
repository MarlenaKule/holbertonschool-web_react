// Notifications/Notifications.spec.js
import { render, screen } from "@testing-library/react";
import Notifications from "./Notifications";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" } },
];

test("always renders the 'Your notifications' title", () => {
  render(<Notifications displayDrawer={false} notifications={[]} />);
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test("does not display notification items when displayDrawer is false", () => {
  render(<Notifications notifications={notificationsList} displayDrawer={false} />);
  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
});

test("displays notification items when displayDrawer is true", () => {
  render(<Notifications notifications={notificationsList} displayDrawer={true} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("displays 'No new notification for now' when notifications is empty", () => {
  render(<Notifications notifications={[]} displayDrawer={true} />);
  expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
});

test("clicking the title calls handleDisplayDrawer", () => {
  const handleDisplayDrawer = jest.fn();
  render(
    <Notifications notifications={[]} displayDrawer={false} handleDisplayDrawer={handleDisplayDrawer} />
  );
  screen.getByText(/your notifications/i).click();
  expect(handleDisplayDrawer).toHaveBeenCalled();
});

test("clicking the close button calls handleHideDrawer", () => {
  const handleHideDrawer = jest.fn();
  render(
    <Notifications notifications={notificationsList} displayDrawer={true} handleHideDrawer={handleHideDrawer} />
  );
  const closeButton = screen.getByRole("button", { name: /close/i });
  closeButton.click();
  expect(handleHideDrawer).toHaveBeenCalled();
});

test("clicking a notification item calls markNotificationAsRead with its id", () => {
  const markNotificationAsRead = jest.fn();
  render(
    <Notifications
      notifications={notificationsList}
      displayDrawer={true}
      markNotificationAsRead={markNotificationAsRead}
    />
  );
  screen.getByText(/new course available/i).click();
  expect(markNotificationAsRead).toHaveBeenCalledWith(1);
});
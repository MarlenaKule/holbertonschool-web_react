import { render, screen } from "@testing-library/react";
import Notifications from "./Notifications";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: "<strong>Urgent requirement</strong> - complete by EOD" },
];

test("always renders the 'Your notifications' title", () => {
  render(<Notifications displayDrawer={false} />);
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test("does not display close button, paragraph, or items when displayDrawer is false", () => {
  render(<Notifications notifications={notificationsList} displayDrawer={false} />);
  expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
});

test("displays close button, paragraph, and items when displayDrawer is true", () => {
  render(<Notifications notifications={notificationsList} displayDrawer={true} />);
  expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("displays 'No new notification for now' when displayDrawer is true and notifications is empty", () => {
  render(<Notifications notifications={[]} displayDrawer={true} />);
  expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test("logs message when close button is clicked", () => {
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  render(<Notifications notifications={notificationsList} displayDrawer={true} />);
  const closeButton = screen.getByRole("button", { name: /close/i });
  closeButton.click();
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringMatching(/close button has been clicked/i)
  );
  consoleSpy.mockRestore();
});
import { render, screen } from "@testing-library/react";
import Notifications from "./Notifications";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", value: "Urgent requirement - complete by EOD" },
];

test("renders the notifications title", () => {
  render(<Notifications notifications={notificationsList} />);
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
});

test("renders a close button", () => {
  render(<Notifications notifications={notificationsList} />);
  expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
});

test("renders 3 notification items with correct text", () => {
  render(<Notifications notifications={notificationsList} />);
  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(3);
  expect(screen.getByText(/new course available/i)).toBeInTheDocument();
  expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
});

test("logs message when close button is clicked", () => {
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  render(<Notifications notifications={notificationsList} />);
  const closeButton = screen.getByRole("button", { name: /close/i });
  closeButton.click();
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringMatching(/close button has been clicked/i)
  );
  consoleSpy.mockRestore();
});
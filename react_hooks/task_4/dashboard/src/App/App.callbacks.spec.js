import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const mockCalls = [];
jest.mock("../Notifications/Notifications", () => ({
  __esModule: true,
  default: (props) => {
    mockCalls.push(props);
    return null;
  },
}));

test("handlers keep the same reference between re-renders", async () => {
  const user = userEvent.setup();
  render(<App />);
  const first = mockCalls[mockCalls.length - 1];

  await user.type(screen.getByLabelText(/email address/i), "a");
  act(() => first.handleHideDrawer());
  const last = mockCalls[mockCalls.length - 1];

  expect(last).not.toBe(first);
  expect(last.handleDisplayDrawer).toBe(first.handleDisplayDrawer);
  expect(last.handleHideDrawer).toBe(first.handleHideDrawer);
  expect(last.markNotificationAsRead).toBe(first.markNotificationAsRead);
});
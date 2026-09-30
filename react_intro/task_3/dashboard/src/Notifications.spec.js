import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Notifications from "./Notifications";

describe("Notifications component", () => {
  test("renders the notifications title", () => {
    render(<Notifications />);

    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument();
  });

  test("renders a close button", () => {
    render(<Notifications />);

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  test("renders 3 notification items", () => {
    render(<Notifications />);

    const notifications = screen.getAllByRole("listitem");

    expect(notifications).toHaveLength(3);
  });

  test("logs message when close button is clicked", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(<Notifications />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/close button has been clicked/i),
    );

    consoleSpy.mockRestore();
  });
});

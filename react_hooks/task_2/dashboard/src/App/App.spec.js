// App/App.spec.js
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders Header component", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /school dashboard/i })
  ).toBeInTheDocument();
});

test("renders Login form by default", () => {
  render(<App />);
  expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
});

test("logging in renders CourseList and shows logout/Contact us", () => {
  render(<App />);
  fireEvent.change(document.getElementById("email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(document.getElementById("password"), {
    target: { value: "longenough" },
  });
  fireEvent.click(screen.getByDisplayValue(/ok/i));

  expect(document.getElementById("CourseList")).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});

test("clicking a notification item removes it and logs the expected message", () => {
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  render(<App />);

  fireEvent.click(screen.getByText(/your notifications/i));
  expect(screen.getByText(/new course available/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/new course available/i));

  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringMatching(/notification 1 has been marked as read/i)
  );
  expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();

  consoleSpy.mockRestore();
});
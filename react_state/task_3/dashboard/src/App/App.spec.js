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

test("does not show logoutSection by default", () => {
  render(<App />);
  expect(document.getElementById("logoutSection")).not.toBeInTheDocument();
});

test("logging in renders CourseList, hides Login, and shows logoutSection", () => {
  render(<App />);

  fireEvent.change(document.getElementById("email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(document.getElementById("password"), {
    target: { value: "longenough" },
  });
  fireEvent.click(screen.getByDisplayValue(/ok/i));

  expect(document.getElementById("CourseList")).toBeInTheDocument();
  expect(screen.queryByText(/login to access the full dashboard/i)).not.toBeInTheDocument();
  expect(document.getElementById("logoutSection")).toBeInTheDocument();
});

test("clicking logout returns to Login and hides CourseList", () => {
  render(<App />);

  fireEvent.change(document.getElementById("email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(document.getElementById("password"), {
    target: { value: "longenough" },
  });
  fireEvent.click(screen.getByDisplayValue(/ok/i));

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(document.getElementById("CourseList")).not.toBeInTheDocument();
  expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
});

test("renders Footer component", () => {
  render(<App />);
  expect(screen.getByText(/copyright/i)).toBeInTheDocument();
});

test("renders the News from the School section", () => {
  render(<App />);
  expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
  expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
});
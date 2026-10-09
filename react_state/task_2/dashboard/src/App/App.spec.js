// App/App.spec.js
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders Header component", () => {
  render(<App />);
  const heading = screen.getByRole("heading", {
    level: 1,
    name: /school dashboard/i,
  });
  expect(heading).toBeInTheDocument();
});

test("renders Login form by default", () => {
  render(<App />);
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

test("logging in via the form renders CourseList and unmounts Login", () => {
  render(<App />);

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "longenough" } });

  const submitInput = screen.getByDisplayValue(/ok/i);
  fireEvent.click(submitInput);

  expect(document.getElementById("CourseList")).toBeInTheDocument();
  expect(screen.queryByText(/login to access the full dashboard/i)).not.toBeInTheDocument();
});
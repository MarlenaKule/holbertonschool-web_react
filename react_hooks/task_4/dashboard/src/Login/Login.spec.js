// Login/Login.spec.js
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

test("renders 2 labels, 2 inputs, and 1 submit input", () => {
  render(<Login />);
  const inputs = document.querySelectorAll("input");
  const labels = document.querySelectorAll("label");

  expect(labels).toHaveLength(2);
  expect(inputs).toHaveLength(3);
});

test("submit button is disabled by default", () => {
  render(<Login />);
  const submitInput = screen.getByDisplayValue(/ok/i);
  expect(submitInput).toBeDisabled();
});

test("submit button becomes enabled only after valid email and password are entered", () => {
  render(<Login />);
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitInput = screen.getByDisplayValue(/ok/i);

  expect(submitInput).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(submitInput).toBeDisabled();

  fireEvent.change(passwordInput, { target: { value: "longenough" } });
  expect(submitInput).not.toBeDisabled();
});

test("calls logIn prop with entered email and password on submit", () => {
  const logInMock = jest.fn();
  render(<Login logIn={logInMock} />);

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "longenough" } });

  const submitInput = screen.getByDisplayValue(/ok/i);
  fireEvent.click(submitInput);

  expect(logInMock).toHaveBeenCalledWith("test@example.com", "longenough");
});
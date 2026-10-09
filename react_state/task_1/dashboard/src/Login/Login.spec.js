import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

test("renders 2 labels, 2 inputs, and 1 submit input", () => {
  render(<Login />);
  const inputs = document.querySelectorAll("input");
  const labels = document.querySelectorAll("label");

  expect(labels).toHaveLength(2);
  expect(inputs).toHaveLength(3);
});

test("focuses input when related label is clicked", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const user = userEvent.setup();
  render(<Login />);
  const labels = document.querySelectorAll("label");

  for (const label of labels) {
    const input = document.getElementById(label.htmlFor);
    await user.click(label);
    expect(input).toHaveFocus();
  }
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

  fireEvent.change(passwordInput, { target: { value: "short" } });
  expect(submitInput).toBeDisabled();

  fireEvent.change(passwordInput, { target: { value: "longenough" } });
  expect(submitInput).not.toBeDisabled();
});
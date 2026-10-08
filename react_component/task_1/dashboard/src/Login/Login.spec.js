import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

test("renders 2 labels, 2 inputs, and 1 button", () => {
  render(<Login />);
  const inputs = document.querySelectorAll("input");
  const labels = document.querySelectorAll("label");
  const buttons = screen.getAllByRole("button");

  expect(labels).toHaveLength(2);
  expect(inputs).toHaveLength(2);
  expect(buttons).toHaveLength(1);
});

test("focuses input when related label is clicked", async () => {
  const user = userEvent.setup();
  render(<Login />);
  const labels = document.querySelectorAll("label");

  for (const label of labels) {
    const input = document.getElementById(label.htmlFor);
    await user.click(label);
    expect(input).toHaveFocus();
  }
});
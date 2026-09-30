import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders h1 with School Dashboard text", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { level: 1, name: /school dashboard/i });
  expect(heading).toBeInTheDocument();
});

test("renders correct text in body and footer paragraphs", () => {
  render(<App />);

  const bodyText = screen.getByText(/login to access the full dashboard/i);
  expect(bodyText).toBeInTheDocument();

  const footerRegex = /copyright \d{4}.*holberton school/i;
  const footerNode = screen.getByText(footerRegex);
  expect(footerNode).toBeInTheDocument();
});

test("renders an image", () => {
  render(<App />);
  const image = screen.getByAltText(/holberton logo/i);
  expect(image).toBeInTheDocument();
});


test("renders 2 input elements (email and password)", () => {
  const { container } = render(<App />);
  const inputs = container.querySelectorAll("input");
  expect(inputs).toHaveLength(2);
});

test("renders 2 label elements with text Email and Password", () => {
  const { container } = render(<App />);
  const labels = container.querySelectorAll("label");
  expect(labels).toHaveLength(2);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("renders a button with the text OK", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /ok/i });
  expect(button).toBeInTheDocument();
}); 
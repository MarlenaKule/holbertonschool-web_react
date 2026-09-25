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
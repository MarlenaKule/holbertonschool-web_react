import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders the holberton logo", () => {
  render(<Header />);
  const logo = screen.getByAltText(/holberton logo/i);
  expect(logo).toBeInTheDocument();
});

test("renders the h1 with correct text", () => {
  render(<Header />);
  const heading = screen.getByRole("heading", { level: 1, name: /school dashboard/i });
  expect(heading).toBeInTheDocument();
});
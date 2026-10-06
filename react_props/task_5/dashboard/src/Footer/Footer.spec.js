import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders copyright text with current year and Holberton School", () => {
  render(<Footer />);
  const footerRegex = /copyright \d{4}.*holberton school/i;
  const footerNode = screen.getByText(footerRegex);
  expect(footerNode).toBeInTheDocument();
});
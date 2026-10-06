import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Login form when isLoggedIn is false", () => {
  render(<App isLoggedIn={false} />);
  expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
});

test("renders CourseList table when isLoggedIn is true", () => {
  render(<App isLoggedIn={true} />);
  expect(document.getElementById("CourseList")).toBeInTheDocument();
});
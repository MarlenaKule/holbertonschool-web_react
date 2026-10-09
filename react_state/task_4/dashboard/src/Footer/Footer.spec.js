// Footer/Footer.spec.js
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import newContext from "../Context/context";

test("renders copyright text with current year and Holberton School", () => {
  render(<Footer />);
  const footerRegex = /copyright \d{4}.*holberton school/i;
  expect(screen.getByText(footerRegex)).toBeInTheDocument();
});

test("does not display Contact us link when logged out", () => {
  render(<Footer />);
  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});

test("displays Contact us link when logged in", () => {
  const value = {
    user: { email: "test@example.com", password: "password123", isLoggedIn: true },
    logOut: () => {},
  };

  render(
    <newContext.Provider value={value}>
      <Footer />
    </newContext.Provider>
  );

  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});
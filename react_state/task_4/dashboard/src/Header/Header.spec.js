// Header/Header.spec.js
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import newContext from "../Context/context";

test("renders the holberton logo", () => {
  render(<Header />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test("renders the h1 with correct text", () => {
  render(<Header />);
  expect(
    screen.getByRole("heading", { level: 1, name: /school dashboard/i })
  ).toBeInTheDocument();
});

test("does not render logoutSection with default context", () => {
  render(<Header />);
  expect(document.getElementById("logoutSection")).not.toBeInTheDocument();
});

test("renders logoutSection when context user is logged in", () => {
  const value = {
    user: { email: "test@example.com", password: "password123", isLoggedIn: true },
    logOut: () => {},
  };

  render(
    <newContext.Provider value={value}>
      <Header />
    </newContext.Provider>
  );

  expect(document.getElementById("logoutSection")).toBeInTheDocument();
  expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
});

test("clicking logout calls logOut from context", () => {
  const logOutSpy = jest.fn();
  const value = {
    user: { email: "test@example.com", password: "password123", isLoggedIn: true },
    logOut: logOutSpy,
  };

  render(
    <newContext.Provider value={value}>
      <Header />
    </newContext.Provider>
  );

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(logOutSpy).toHaveBeenCalled();
});
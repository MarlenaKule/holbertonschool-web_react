import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import NewContext from "../Context/context";
// ... pjesa tjetër

test("renders the holberton logo", () => {
  render(
    <NewContext.Provider value={{ user: { isLoggedIn: false }, logOut: jest.fn() }}>
      <Header />
    </NewContext.Provider>
  );
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});
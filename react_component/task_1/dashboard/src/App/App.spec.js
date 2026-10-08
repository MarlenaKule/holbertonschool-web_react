// App/App.spec.js
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders Login form when isLoggedIn is false", () => {
  render(<App isLoggedIn={false} />);
  expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
});

test("renders CourseList table when isLoggedIn is true", () => {
  render(<App isLoggedIn={true} />);
  expect(document.getElementById("CourseList")).toBeInTheDocument();
});

test("calls logOut when ctrl+h is pressed", () => {
  const logOutMock = jest.fn();
  jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<App logOut={logOutMock} />);
  fireEvent.keyDown(window, { key: "h", ctrlKey: true });

  expect(logOutMock).toHaveBeenCalledTimes(1);

  window.alert.mockRestore();
});

test("calls window.alert with 'Logging you out' when ctrl+h is pressed", () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<App />);
  fireEvent.keyDown(window, { key: "h", ctrlKey: true });

  expect(alertSpy).toHaveBeenCalledWith("Logging you out");

  alertSpy.mockRestore();
});
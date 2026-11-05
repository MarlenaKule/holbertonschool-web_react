import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const login = async (user) => {
  await user.type(screen.getByLabelText(/email address/i), "test@example.com");
  await user.type(screen.getByLabelText(/password/i), "password123");
  await user.click(screen.getByRole("button", { name: /ok/i }));
};

describe("App", () => {
  test("is a function component", () => {
    expect(typeof App).toBe("function");
    expect(App.prototype?.isReactComponent).toBeUndefined();
  });

  test("shows the login form by default", () => {
    render(<App />);
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
  });

  test("displayDrawer is true by default", () => {
    render(<App />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test("handleHideDrawer and handleDisplayDrawer toggle the drawer", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();

    await user.click(screen.getByText(/your notifications/i));
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test("logIn sets email, password and isLoggedIn", async () => {
    const user = userEvent.setup();
    render(<App />);
    await login(user);

    expect(screen.getByText(/welcome/i)).toHaveTextContent("test@example.com");
    expect(screen.getByText(/course list/i)).toBeInTheDocument();
    expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();
  });

  test("logOut clears the user and returns to the login form", async () => {
    const user = userEvent.setup();
    render(<App />);
    await login(user);

    await user.click(screen.getByText(/logout/i));

    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveValue("");
    expect(screen.getByLabelText(/password/i)).toHaveValue("");
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  });

  test("clicking a notification removes it and logs the message", async () => {
    const user = userEvent.setup();
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<App />);

    await user.click(screen.getByText("New course available"));

    expect(screen.queryByText("New course available")).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith("Notification 1 has been marked as read");
    logSpy.mockRestore();
  });
});
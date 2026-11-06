import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";
import App from "./App";

const notificationsData = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent" },
];

const coursesData = [
  { id: 1, name: "ES6", credit: "60" },
  { id: 2, name: "Webpack", credit: "20" },
  { id: 3, name: "React", credit: "40" },
];

const respond = async (url, data) => {
  await act(async () => {
    mockAxios.mockResponseFor({ url }, { data });
  });
};

const renderApp = async () => {
  render(<App />);
  await respond("http://localhost:5173/notifications.json", notificationsData);
  await respond("http://localhost:5173/courses.json", coursesData);
};

const login = async (user) => {
  await user.type(screen.getByLabelText(/email address/i), "test@example.com");
  await user.type(screen.getByLabelText(/password/i), "password123");
  await user.click(screen.getByRole("button", { name: /ok/i }));
};

afterEach(() => {
  mockAxios.reset();
});

describe("App", () => {
  test("is a function component", () => {
    expect(typeof App).toBe("function");
    expect(App.prototype?.isReactComponent).toBeUndefined();
  });

  test("shows the login form by default", async () => {
    await renderApp();
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
  });

  test("fetches notifications when the app loads", async () => {
    await renderApp();

    expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:5173/notifications.json");
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New resume available")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test("does not fetch notifications again when the user changes", async () => {
    const user = userEvent.setup();
    await renderApp();
    await login(user);
    await respond("http://localhost:5173/courses.json", coursesData);

    const notificationCalls = mockAxios.get.mock.calls.filter(
      ([url]) => url === "http://localhost:5173/notifications.json"
    );
    expect(notificationCalls).toHaveLength(1);
  });

  test("fetches courses whenever the user state changes", async () => {
    const user = userEvent.setup();
    await renderApp();
    const callsBefore = mockAxios.get.mock.calls.filter(
      ([url]) => url === "http://localhost:5173/courses.json"
    ).length;

    await login(user);
    await respond("http://localhost:5173/courses.json", coursesData);

    const callsAfterLogin = mockAxios.get.mock.calls.filter(
      ([url]) => url === "http://localhost:5173/courses.json"
    ).length;
    expect(callsAfterLogin).toBe(callsBefore + 1);
    expect(screen.getByText("Webpack")).toBeInTheDocument();

    await user.click(screen.getByText(/logout/i));
    await respond("http://localhost:5173/courses.json", coursesData);

    const callsAfterLogout = mockAxios.get.mock.calls.filter(
      ([url]) => url === "http://localhost:5173/courses.json"
    ).length;
    expect(callsAfterLogout).toBe(callsAfterLogin + 1);
  });

  test("displayDrawer is true by default and can be toggled", async () => {
    const user = userEvent.setup();
    await renderApp();
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();

    await user.click(screen.getByText(/your notifications/i));
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test("logIn sets email, password and isLoggedIn", async () => {
    const user = userEvent.setup();
    await renderApp();
    await login(user);
    await respond("http://localhost:5173/courses.json", coursesData);

    expect(screen.getByText(/welcome/i)).toHaveTextContent("test@example.com");
    expect(screen.getByText(/course list/i)).toBeInTheDocument();
    expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();
  });

  test("logOut clears the user and returns to the login form", async () => {
    const user = userEvent.setup();
    await renderApp();
    await login(user);
    await respond("http://localhost:5173/courses.json", coursesData);

    await user.click(screen.getByText(/logout/i));
    await respond("http://localhost:5173/courses.json", coursesData);

    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveValue("");
    expect(screen.getByLabelText(/password/i)).toHaveValue("");
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  });

  test("clicking a notification removes it and logs the message", async () => {
    const user = userEvent.setup();
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    await renderApp();

    await user.click(screen.getByText("New course available"));

    expect(screen.queryByText("New course available")).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith("Notification 1 has been marked as read");
    logSpy.mockRestore();
  });
});
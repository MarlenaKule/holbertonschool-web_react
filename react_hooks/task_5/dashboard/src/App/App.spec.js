import { useContext } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockAxios from "axios";
import AppContext from "../Context/context";

jest.mock("../Header/Header", () => {
    const React = jest.requireActual("react");
    const AppContext = jest.requireActual("../Context/context").default;

    function MockHeader() {
        const { user, logOut } = React.useContext(AppContext);

        return (
            <header>
                <h1>School dashboard</h1>
                <p data-testid="header-email">{user.email}</p>
                <p data-testid="header-password">{user.password}</p>
                <p data-testid="header-logged-in">{String(user.isLoggedIn)}</p>
                <button onClick={logOut} type="button">
                    logout
                </button>
            </header>
        );
    }

    return MockHeader;
});

jest.mock("../Login/Login", () => {
    function MockLogin({ logIn }) {
        return (
            <div className="App-body">
                <p>Login to access the full dashboard</p>
                <button
                    onClick={() => logIn("test@test.com", "password123")}
                    type="button"
                >
                    Trigger login
                </button>
            </div>
        );
    }

    return MockLogin;
});

jest.mock("../Footer/Footer", () => {
    const React = jest.requireActual("react");
    const AppContext = jest.requireActual("../Context/context").default;

    function MockFooter() {
        const { user } = React.useContext(AppContext);

        return (
            <footer>
                <p>Copyright</p>
                {user.isLoggedIn && <a href="#contact">Contact us</a>}
            </footer>
        );
    }

    return MockFooter;
});

jest.mock("../Notifications/Notifications", () => {
    const React = jest.requireActual("react");

    function MockNotifications({
        notifications,
        displayDrawer,
        handleDisplayDrawer,
        handleHideDrawer,
        markNotificationAsRead,
    }) {
        const previousCallbacksRef = React.useRef({
            handleDisplayDrawer,
            handleHideDrawer,
            markNotificationAsRead,
        });
        const [callbackStability, setCallbackStability] = React.useState({
            sameHandleDisplayDrawer: true,
            sameHandleHideDrawer: true,
            sameMarkNotificationAsRead: true,
        });

        React.useEffect(() => {
            setCallbackStability({
                sameHandleDisplayDrawer:
                    previousCallbacksRef.current.handleDisplayDrawer ===
                    handleDisplayDrawer,
                sameHandleHideDrawer:
                    previousCallbacksRef.current.handleHideDrawer === handleHideDrawer,
                sameMarkNotificationAsRead:
                    previousCallbacksRef.current.markNotificationAsRead ===
                    markNotificationAsRead,
            });

            previousCallbacksRef.current = {
                handleDisplayDrawer,
                handleHideDrawer,
                markNotificationAsRead,
            };
        }, [handleDisplayDrawer, handleHideDrawer, markNotificationAsRead]);

        return (
            <section>
                <p data-testid="display-drawer">{String(displayDrawer)}</p>
                <p data-testid="same-handle-display-drawer">
                    {String(callbackStability.sameHandleDisplayDrawer)}
                </p>
                <p data-testid="same-handle-hide-drawer">
                    {String(callbackStability.sameHandleHideDrawer)}
                </p>
                <p data-testid="same-mark-notification-as-read">
                    {String(callbackStability.sameMarkNotificationAsRead)}
                </p>
                <button onClick={handleDisplayDrawer} type="button">
                    open notifications
                </button>
                <button onClick={handleHideDrawer} type="button">
                    close notifications
                </button>
                <button onClick={() => markNotificationAsRead(1)} type="button">
                    mark notification 1
                </button>
                <ul>
                    {notifications.map((notification) =>
                        notification.html ? (
                            <li
                                key={notification.id}
                                dangerouslySetInnerHTML={notification.html}
                            />
                        ) : (
                            <li key={notification.id}>{notification.value}</li>
                        )
                    )}
                </ul>
            </section>
        );
    }

    return MockNotifications;
});

jest.mock("../CourseList/CourseList", () => {
    function MockCourseList({ courses }) {
        return (
            <section>
                <p>CourseList</p>
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            {course.name} - {course.credit}
                        </li>
                    ))}
                </ul>
            </section>
        );
    }

    return MockCourseList;
});

jest.mock("../BodySection/BodySection", () => {
    function MockBodySection({ title, children }) {
        return (
            <section>
                <h2>{title}</h2>
                {children}
            </section>
        );
    }

    return MockBodySection;
});

jest.mock("../BodySection/BodySectionWithMarginBottom", () => {
    function MockBodySectionWithMarginBottom({ title, children }) {
        return (
            <section>
                <h2>{title}</h2>
                {children}
            </section>
        );
    }

    return MockBodySectionWithMarginBottom;
});

import App from "./App";

describe("App Component", () => {
    const notificationsData = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        {
            id: 3,
            type: "urgent",
            html: {
                __html: "<strong>This should be replaced</strong>",
            },
        },
    ];
    const coursesData = [
        { id: 1, name: "ES6", credit: "60" },
        { id: 2, name: "Webpack", credit: "20" },
        { id: 3, name: "React", credit: "40" },
    ];

    const getCoursesFetchCount = () =>
        mockAxios.get.mock.calls.filter(([url]) => url === "/courses.json").length;

    const renderApp = async () => {
        const rendered = render(<App />);

        await waitFor(() => {
            expect(mockAxios.get).toHaveBeenCalledWith("/notifications.json");
            expect(mockAxios.get).toHaveBeenCalledWith("/courses.json");
        });

        return rendered;
    };

    beforeEach(() => {
        mockAxios.reset();
        mockAxios.get.mockImplementation((url) => {
            if (url === "/notifications.json") {
                return Promise.resolve({ data: notificationsData });
            }

            if (url === "/courses.json") {
                return Promise.resolve({ data: coursesData });
            }

            return Promise.reject(new Error(`Unexpected URL: ${url}`));
        });
    });

    afterEach(() => {
        mockAxios.reset();
    });

    function ContextProbe() {
        const { user } = useContext(AppContext);

        return (
            <>
                <p data-testid="probe-email">{user.email}</p>
                <p data-testid="probe-password">{user.password}</p>
                <p data-testid="probe-logged-in">{String(user.isLoggedIn)}</p>
            </>
        );
    }

    it("renders the main sections", async () => {
        await renderApp();

        expect(
            screen.getByRole("heading", { name: /school dashboard/i })
        ).toBeInTheDocument();
        expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
        expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
    });

    it("retrieves notifications data when the app loads", async () => {
        await renderApp();

        await waitFor(() => {
            expect(screen.getByText("New course available")).toBeInTheDocument();
            expect(screen.getByText(/Urgent requirement/i)).toBeInTheDocument();
        });
    });

    it("retrieves courses data whenever the user state changes", async () => {
        const user = userEvent.setup();
        await renderApp();

        expect(getCoursesFetchCount()).toBe(1);

        await user.click(screen.getByRole("button", { name: /trigger login/i }));

        await waitFor(() => {
            expect(getCoursesFetchCount()).toBe(2);
        });

        expect(screen.getByText("ES6 - 60")).toBeInTheDocument();
        expect(screen.getByText("Webpack - 20")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /^logout$/i }));

        await waitFor(() => {
            expect(getCoursesFetchCount()).toBe(3);
        });
    });

    it("initializes the app with the context user object", async () => {
        render(
            <>
                <App />
                <ContextProbe />
            </>
        );

        await waitFor(() => {
            expect(mockAxios.get).toHaveBeenCalled();
        });

        expect(screen.getByTestId("header-email")).toHaveTextContent("");
        expect(screen.getByTestId("header-password")).toHaveTextContent("");
        expect(screen.getByTestId("header-logged-in")).toHaveTextContent("false");

        expect(screen.getByTestId("probe-email")).toHaveTextContent("");
        expect(screen.getByTestId("probe-password")).toHaveTextContent("");
        expect(screen.getByTestId("probe-logged-in")).toHaveTextContent("false");
    });

    it("handles display drawer show and hide actions", async () => {
        const user = userEvent.setup();
        await renderApp();

        expect(screen.getByTestId("display-drawer")).toHaveTextContent("true");

        await user.click(
            screen.getByRole("button", { name: /close notifications/i })
        );
        expect(screen.getByTestId("display-drawer")).toHaveTextContent("false");

        await user.click(
            screen.getByRole("button", { name: /open notifications/i })
        );
        expect(screen.getByTestId("display-drawer")).toHaveTextContent("true");
    });

    it("keeps notification handlers stable across re-renders", async () => {
        const user = userEvent.setup();
        await renderApp();

        expect(screen.getByTestId("same-handle-display-drawer")).toHaveTextContent("true");
        expect(screen.getByTestId("same-handle-hide-drawer")).toHaveTextContent("true");
        expect(screen.getByTestId("same-mark-notification-as-read")).toHaveTextContent("true");

        await user.click(screen.getByRole("button", { name: /trigger login/i }));

        await waitFor(() => {
            expect(screen.getByTestId("same-handle-display-drawer")).toHaveTextContent("true");
            expect(screen.getByTestId("same-handle-hide-drawer")).toHaveTextContent("true");
            expect(screen.getByTestId("same-mark-notification-as-read")).toHaveTextContent("true");
        });

        await user.click(
            screen.getByRole("button", { name: /mark notification 1/i })
        );

        await waitFor(() => {
            expect(screen.getByTestId("same-handle-display-drawer")).toHaveTextContent("true");
            expect(screen.getByTestId("same-handle-hide-drawer")).toHaveTextContent("true");
            expect(screen.getByTestId("same-mark-notification-as-read")).toHaveTextContent("true");
        });
    });

    it("updates user state on logIn", async () => {
        const user = userEvent.setup();
        await renderApp();

        await user.click(screen.getByRole("button", { name: /trigger login/i }));

        await waitFor(() => {
            expect(screen.getByTestId("header-email")).toHaveTextContent("test@test.com");
            expect(screen.getByTestId("header-password")).toHaveTextContent("password123");
            expect(screen.getByTestId("header-logged-in")).toHaveTextContent("true");
        });

        expect(screen.getByText("CourseList")).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: /contact us/i })
        ).toBeInTheDocument();
    });

    it("resets user state on logOut", async () => {
        const user = userEvent.setup();
        await renderApp();

        await user.click(screen.getByRole("button", { name: /trigger login/i }));
        await user.click(screen.getByRole("button", { name: /^logout$/i }));

        await waitFor(() => {
            expect(screen.getByTestId("header-email")).toHaveTextContent("");
            expect(screen.getByTestId("header-password")).toHaveTextContent("");
            expect(screen.getByTestId("header-logged-in")).toHaveTextContent("false");
        });

        expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
        expect(
            screen.queryByRole("link", { name: /contact us/i })
        ).not.toBeInTheDocument();
    });

    it("removes notification when marked as read", async () => {
        const user = userEvent.setup();
        await renderApp();

        await waitFor(() => {
            expect(screen.getByText("New course available")).toBeInTheDocument();
        });

        await user.click(
            screen.getByRole("button", { name: /mark notification 1/i })
        );

        expect(screen.queryByText("New course available")).not.toBeInTheDocument();
    });

    it("does not restore a removed notification when the fetch resolves later", async () => {
        const user = userEvent.setup();
        let resolveNotifications;
        const delayedNotifications = new Promise((resolve) => {
            resolveNotifications = resolve;
        });

        mockAxios.get.mockImplementation((url) => {
            if (url === "/notifications.json") {
                return delayedNotifications;
            }

            if (url === "/courses.json") {
                return Promise.resolve({ data: coursesData });
            }

            return Promise.reject(new Error(`Unexpected URL: ${url}`));
        });

        await renderApp();

        await user.click(
            screen.getByRole("button", { name: /mark notification 1/i })
        );

        resolveNotifications({ data: notificationsData });

        await waitFor(() => {
            expect(screen.queryByText("New course available")).not.toBeInTheDocument();
        });
    });
});

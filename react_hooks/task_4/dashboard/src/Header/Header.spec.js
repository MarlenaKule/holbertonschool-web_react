import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import AppContext from "../Context/context";

describe("Header Component", () => {
    it("Renders correct text", () => {
        render(
            <AppContext.Provider value={{ user: { isLoggedIn: false } }}>
                <Header />
            </AppContext.Provider>
        );

        const heading = screen.getByRole("heading", {
            level: 1,
            name: /School Dashboard/i,
        });
        expect(heading).toBeInTheDocument();
    });

    it("Renders an image", () => {
        render(
            <AppContext.Provider value={{ user: { isLoggedIn: false } }}>
                <Header />
            </AppContext.Provider>
        );

        const image = screen.getByAltText(/holberton logo/i);
        expect(image).toBeInTheDocument();
    });

    it("does not render logoutSection when user is not logged in", () => {
        render(
            <AppContext.Provider value={{ user: { isLoggedIn: false } }}>
                <Header />
            </AppContext.Provider>
        );

        const logoutSection = screen.queryByText(/Welcome/i);
        expect(logoutSection).not.toBeInTheDocument();
    });

    it("renders logoutSection when user is logged in", () => {
        const user = {
            email: "test@test.com",
            password: "password123",
            isLoggedIn: true,
        };

        render(
            <AppContext.Provider value={{ user, logOut: jest.fn() }}>
                <Header />
            </AppContext.Provider>
        );

        const logoutSection = screen.getByText(/Welcome test@test.com/i);
        expect(logoutSection).toBeInTheDocument();

        const logoutLink = screen.getByRole("link", { name: /logout/i });
        expect(logoutLink).toBeInTheDocument();
    });

    it("calls logOut function when logout link is clicked", async () => {
        const user = {
            email: "test@test.com",
            password: "password123",
            isLoggedIn: true,
        };
        const mockLogOut = jest.fn();

        render(
            <AppContext.Provider value={{ user, logOut: mockLogOut }}>
                <Header />
            </AppContext.Provider>
        );

        const logoutLink = screen.getByRole("link", { name: /logout/i });
        await userEvent.click(logoutLink);

        expect(mockLogOut).toHaveBeenCalledTimes(1);
    });
});

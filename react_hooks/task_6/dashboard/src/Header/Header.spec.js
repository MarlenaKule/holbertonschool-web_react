import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header Component", () => {
    const loggedOutUser = {
        email: "",
        password: "",
        isLoggedIn: false,
    };

    const loggedInUser = {
        email: "test@test.com",
        password: "password123",
        isLoggedIn: true,
    };

    it("renders heading", () => {
        render(<Header user={loggedOutUser} logOut={jest.fn()} />);

        expect(
            screen.getByRole("heading", { name: /school dashboard/i })
        ).toBeInTheDocument();
    });

    it("renders image", () => {
        render(<Header user={loggedOutUser} logOut={jest.fn()} />);

        expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
    });

    it("does not show logout when logged out", () => {
        render(<Header user={loggedOutUser} logOut={jest.fn()} />);

        expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
    });

    it("shows logout when logged in", () => {
        render(<Header user={loggedInUser} logOut={jest.fn()} />);

        expect(screen.getByText(/welcome test@test.com/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /logout/i })).toBeInTheDocument();
    });

    it("calls logout when clicked", async () => {
        const mockLogout = jest.fn();

        render(<Header user={loggedInUser} logOut={mockLogout} />);

        await userEvent.click(
            screen.getByRole("link", { name: /logout/i })
        );

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});
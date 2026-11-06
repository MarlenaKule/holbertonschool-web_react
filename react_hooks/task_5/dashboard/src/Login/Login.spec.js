import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

describe("Login Component", () => {

    it("Login has correct text", () => {
        render(<Login />);
        expect(
            screen.getByText(/Login to access the full dashboard/i)
        ).toBeInTheDocument();
    });

    it("renders inputs and button", () => {
        render(<Login />);
        expect(screen.getAllByRole("textbox").length).toBe(1);
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("submit button is disabled by default", () => {
        render(<Login />);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("button enables with valid input", async () => {
        render(<Login />);

        const email = screen.getByLabelText(/Email/i);
        const password = screen.getByLabelText(/Password/i);
        const button = screen.getByRole("button");

        await userEvent.type(email, "test@test.com");
        await userEvent.type(password, "password123");

        expect(button).toBeEnabled();
    });

    it("calls logIn with email and password on submit", async () => {
        const logIn = jest.fn();

        render(<Login logIn={logIn} />);

        const email = screen.getByLabelText(/Email/i);
        const password = screen.getByLabelText(/Password/i);
        const button = screen.getByRole("button");

        await userEvent.type(email, "test@test.com");
        await userEvent.type(password, "password123");

        await userEvent.click(button);

        expect(logIn).toHaveBeenCalledWith("test@test.com", "password123");
    });
});
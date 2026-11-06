import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import AppContext from "../Context/context";
import { getCurrentYear } from "../utils/utils";

describe("Footer Component", () => {
    it("renders copyright", () => {
        const year = getCurrentYear();
        render(<Footer />);
        expect(
            screen.getByText(`Copyright ${year} - Holberton School`, {
                exact: false,
            })
        ).toBeInTheDocument();
    });

    it("does NOT display contact link when logged out", () => {
        const contextValue = {
            user: { isLoggedIn: false },
        };
        render(
            <AppContext.Provider value={contextValue}>
                <Footer />
            </AppContext.Provider>
        );
        expect(
            screen.queryByRole("link", { name: /contact us/i })
        ).not.toBeInTheDocument();
    });

    it("displays contact link when logged in", () => {
        const contextValue = {
            user: {
                email: "test@test.com",
                password: "password123",
                isLoggedIn: true,
            },
        };
        render(
            <AppContext.Provider value={contextValue}>
                <Footer />
            </AppContext.Provider>
        );
        expect(
            screen.getByRole("link", { name: /contact us/i })
        ).toBeInTheDocument();
    });
});

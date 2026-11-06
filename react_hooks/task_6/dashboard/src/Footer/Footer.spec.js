import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { getCurrentYear } from "../utils/utils";

describe("Footer Component", () => {
    it("renders copyright", () => {
        render(
            <Footer
                user={{ isLoggedIn: false }}
            />
        );

        expect(
            screen.getByText(`Copyright ${getCurrentYear()}`, {
                exact: false,
            })
        ).toBeInTheDocument();
    });

    it("does not show contact when logged out", () => {
        render(<Footer user={{ isLoggedIn: false }} />);

        expect(
            screen.queryByRole("link", { name: /contact us/i })
        ).not.toBeInTheDocument();
    });

    it("shows contact when logged in", () => {
        render(
            <Footer
                user={{
                    email: "test@test.com",
                    password: "123",
                    isLoggedIn: true,
                }}
            />
        );

        expect(
            screen.getByRole("link", { name: /contact us/i })
        ).toBeInTheDocument();
    });
});
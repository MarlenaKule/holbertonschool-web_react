import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
    beforeEach(() => {
        render(<Header />);
    });

    // Test if Header renders correct text
    it("Renders correct text", () => {
        const heading = screen.getByRole("heading", {
            level: 1,
            name: /School Dashboard/i,
        });
        expect(heading).toBeInTheDocument();
    });

    // Test if Header renders image
    it("Renders an image", () => {
        const image = screen.getByAltText(/holberton logo/i);
        expect(image).toBeInTheDocument();
    });
});
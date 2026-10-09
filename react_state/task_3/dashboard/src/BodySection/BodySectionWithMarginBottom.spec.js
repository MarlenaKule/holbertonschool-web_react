import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";

describe("BodySectionWithMarginBottom Component", () => {

    it("contains div with class bodySectionWithMargin", () => {
        const { container } = render(
            <BodySectionWithMarginBottom title="Test title">
                <p>Child</p>
            </BodySectionWithMarginBottom>
        );

        const div = container.querySelector(".bodySectionWithMargin");

        expect(div).toBeInTheDocument();
    });

    it("renders the BodySection component", () => {
        render(
            <BodySectionWithMarginBottom title="Test title">
                <p>Child content</p>
            </BodySectionWithMarginBottom>
        );

        expect(screen.getByRole("heading")).toHaveTextContent("Test title");
        expect(screen.getByText("Child content")).toBeInTheDocument();
    });

});
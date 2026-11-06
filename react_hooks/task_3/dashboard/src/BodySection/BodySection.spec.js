import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BodySection from "./BodySection";

describe("BodySection Component", () => {

    it("renders heading with title prop", () => {
        render(<BodySection title="Test title" />);

        expect(screen.getByRole("heading")).toHaveTextContent("Test title");
    });

    it("renders children passed to it", () => {
        render(
            <BodySection title="Test title">
                <p>Child content</p>
            </BodySection>
        );

        expect(screen.getByText("Child content")).toBeInTheDocument();
    });

});
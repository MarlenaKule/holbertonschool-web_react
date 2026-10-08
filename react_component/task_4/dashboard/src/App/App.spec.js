import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("Renders Header component", () => {
        const heading = screen.getByRole("heading", {
            level: 1,
            name: /school dashboard/i,
        });
        expect(heading).toBeInTheDocument();
    });

    it("Renders Login Component", () => {
        const loginText = screen.getByText(/Login to access the full dashboard/i);
        expect(loginText).toBeInTheDocument();
    });

    it("Renders Footer Component", () => {
        expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
    });

    it("CourseList is rendered when isLoggedIn is false", () => {
        cleanup();

        const rendered = render(<App />);
        const container = rendered.container;

        const loginComponent = container.querySelector(".App-body");

        expect(loginComponent).toBeInTheDocument();
    });

    it("CourseList is rendered when isLoggedIn is true", () => {
        cleanup();

        const rendered = render(<App isLoggedIn={true} />);
        const container = rendered.container;

        const courseList = container.querySelector("#CourseList");

        expect(courseList).toBeInTheDocument();
    });
});
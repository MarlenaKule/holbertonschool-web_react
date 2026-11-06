import "@testing-library/jest-dom";
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import WithLogging from "./WithLogging";

afterEach(cleanup);

class MockApp extends React.Component {
    render() {
        return <h1>Hello from Mock App Component</h1>;
    }
}

describe("WithLogging HOC", () => {

    it("renders wrapped component correctly", () => {
        const WrappedMock = WithLogging(MockApp);

        render(<WrappedMock />);

        expect(
            screen.getByText("Hello from Mock App Component")
        ).toBeInTheDocument();
    });

});
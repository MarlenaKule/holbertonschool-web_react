import { render, screen } from "@testing-library/react";
import CourseListRow from "./CourseListRow";

describe("Test CourseListRow Component", () => {

    it("One column header is rendered", () => {
        render(
            <table>
                <thead>
                    <CourseListRow isHeader={true} textFirstCell={"Khiba Koenane"} />
                </thead>
            </table>
        );

        const tableHeader = screen.getByRole("columnheader");

        expect(tableHeader).toBeInTheDocument();

        expect(tableHeader).toHaveAttribute("colSpan", "2");
    });


    it("Two column headers are rendered", () => {
        render(
            <table>
                <thead>
                    <CourseListRow
                        isHeader={true}
                        textFirstCell={"Khiba"}
                        textSecondCell={"Koenane"}
                    />
                </thead>
            </table>
        );

        const tableHeaders = screen.getAllByRole("columnheader");

        expect(tableHeaders.length).toBe(2);
    });

    it("Two td elements are rendered", () => {
        render(
            <table>
                <tbody>
                    <CourseListRow textFirstCell={"Khiba"} textSecondCell={"Koenane"} />
                </tbody>
            </table>
        );

        const tableElements = screen.getAllByRole("cell");

        expect(tableElements.length).toBe(2);
    });
});
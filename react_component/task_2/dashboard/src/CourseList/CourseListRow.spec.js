import { render, screen } from "@testing-library/react";
import CourseListRow from "./CourseListRow";

test("renders one th with colSpan 2 when textSecondCell is null", () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
      </tbody>
    </table>
  );
  const headers = screen.getAllByRole("columnheader");
  expect(headers).toHaveLength(1);
  expect(headers[0]).toHaveAttribute("colspan", "2");
});

test("renders 2 th cells when textSecondCell is not null", () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
      </tbody>
    </table>
  );
  const headers = screen.getAllByRole("columnheader");
  expect(headers).toHaveLength(2);
});

test("renders 2 td elements within a tr when isHeader is false", () => {
  render(
    <table>
      <tbody>
        <CourseListRow textFirstCell="ES6" textSecondCell="60" />
      </tbody>
    </table>
  );
  const row = screen.getByRole("row");
  const cells = screen.getAllByRole("cell");
  expect(row).toBeInTheDocument();
  expect(cells).toHaveLength(2);
});
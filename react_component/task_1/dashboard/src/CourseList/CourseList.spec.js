import { render, screen } from "@testing-library/react";
import CourseList from "./CourseList";

const coursesList = [
  { id: 1, name: "ES6", credit: 60 },
  { id: 2, name: "Webpack", credit: 20 },
  {
    id: 3,
    type: "urgent",
    html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
  },
];

test("renders 5 rows when receiving 3 courses", () => {
  render(<CourseList courses={coursesList} />);
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(5);
});

test("renders 1 row when receiving an empty array", () => {
  render(<CourseList courses={[]} />);
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(1);
});

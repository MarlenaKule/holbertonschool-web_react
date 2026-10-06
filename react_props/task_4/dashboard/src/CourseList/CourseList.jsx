import "./CourseList.css";
import CourseListRow from "./CourseListRow.jsx";

function CourseList({ courses }) {
  const safeCourses = courses ?? [];

  if (safeCourses.length === 0) {
    return (
      <table id="CourseList">
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="No course available yet" />
        </tbody>
      </table>
    );
  }

  return (
    <table id="CourseList">
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
        <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
      <tbody>
        {safeCourses.map((course) => (
          <CourseListRow
            key={course.id}
            textFirstCell={course.name}
            textSecondCell={course.credit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CourseList;
import { Seq } from 'immutable';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function printBestStudents(grades) {
  const bestStudents = Seq(grades)
    .filter((student) => student.score >= 70)
    .map((student) => ({
      ...student,
      firstName: capitalize(student.firstName),
      lastName: capitalize(student.lastName),
    }))
    .toObject();

  console.log(bestStudents);
}

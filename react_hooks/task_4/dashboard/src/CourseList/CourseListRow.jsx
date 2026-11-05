import React from 'react'
import "./CourseList.css"

const CourseListRow = ({ isHeader = false, textFirstCell = '', textSecondCell = null }) => {
    return (
        <tr>
            {isHeader ? (
                textSecondCell === null ? (
                    <th className='table-cell' colSpan={2}>{textFirstCell}</th>
                ) : (
                    <>
                        <th className='table-cell' >{textFirstCell}</th>
                        <th className='table-cell'>{textSecondCell}</th>
                    </>
                )
            ) : (
                <>
                    <td className='table-cell'>{textFirstCell}</td>
                    <td className='table-cell' >{textSecondCell}</td>
                </>
            )}
        </tr>
    )
}

export default CourseListRow
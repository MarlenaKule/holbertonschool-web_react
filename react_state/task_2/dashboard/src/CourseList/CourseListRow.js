import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ isHeader, textFirstCell, textSecondCell}) {
    const styleItem = css(isHeader ? styles.th : styles.tr);
    return (
        <tr>
            {isHeader ? (
                textSecondCell ? (
                    <>
                        <th className={styleItem}>{textFirstCell}</th>
                        <th className={styleItem}>{textSecondCell}</th>
                    </>
                ) : (
                    <th colSpan={2} className={styles.th2}>{textFirstCell}</th>
                )
            ) : (
                <>
                    <td className={styleItem}>{textFirstCell}</td>
                    <td className={styleItem}>{textSecondCell}</td>
                </>
            )}
        </tr>
    )
}

const styles = StyleSheet.create({
    th: {
        borderBottom: '3px solid #eee',
        padding: '5px',
        textAlign: 'left'
    },
    th2: {
        textAlign: 'center'
    },
    tr: {
        textAlign: 'left'
    }
})

CourseListRow.propTypes = {
    isHeader: PropTypes.bool,
    textFirstCell: PropTypes.string,
    textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

CourseListRow.defaultProps = {
    isHeader: false,
    textSecondCell: null
}

export default CourseListRow;
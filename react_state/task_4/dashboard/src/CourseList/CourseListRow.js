import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ isHeader, textFirstCell, textSecondCell}) {
    const [isChecked, setIsChecked] = useState(false);
    const styleItem = css(isHeader ? styles.th : styles.tr);
    const rowChecked = {
        backgroundColor: '#e6e4e4'
    }
    const color = {
        backgroundColor: '#fff'
    }
    const handleCheckBoxChange = () => {
        setIsChecked(!isChecked);
    }
    // const check = isChecked ? rowChecked : color;
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
                    <td className={styleItem} style={isChecked ? rowChecked : color}><input type='checkbox' checked={isChecked} onChange={handleCheckBoxChange} /> {textFirstCell}</td>
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
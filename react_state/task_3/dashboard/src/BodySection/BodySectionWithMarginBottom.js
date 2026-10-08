import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';
import { StyleSheet, css } from 'aphrodite';

class BodySectionWithMarginBottom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={css(styles.bodySectionWithMargin)}>
                <BodySection {...this.props} />
            </div>
        )
    }
}

const styles = StyleSheet.create({
    bodySectionWithMargin: {
        marginBottom: 40,
    }
})

BodySectionWithMarginBottom.propTypes = {
    title: PropTypes.string
}

BodySectionWithMarginBottom.defaultProps = {
    title: ""
}

export default BodySectionWithMarginBottom;
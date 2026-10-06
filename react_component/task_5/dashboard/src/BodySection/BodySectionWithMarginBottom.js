import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';
import './BodySection.css';

class BodySectionWithMarginBottom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='bodySectionWithMargin'>
                <BodySection {...this.props} />
            </div>
        )
    }
}

BodySectionWithMarginBottom.propTypes = {
    title: PropTypes.string
}

BodySectionWithMarginBottom.defaultProps = {
    title: ""
}

export default BodySectionWithMarginBottom;
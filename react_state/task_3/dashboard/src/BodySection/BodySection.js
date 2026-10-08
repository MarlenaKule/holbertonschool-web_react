import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BodySection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, title } = this.props;
        return (
            <div className='bodySection'>
                <h2>{title}</h2>
                {children}
            </div>
        )
    }
}

BodySection.propTypes = {
    title: PropTypes.string
}

BodySection.defaultProps = {
    title: ""
}

export default BodySection;
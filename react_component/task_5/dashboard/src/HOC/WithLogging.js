import React, { Component } from 'react';

function WithLogging(wrappedComponent) {
    const componentName = wrappedComponent.displayName || wrappedComponent.name || 'Component';


    class HOC extends Component {
        componentDidMount() {
            console.log(`Component ${componentName} is mounted`);
        }
    
        componentWillUnmount() {
            console.log(`Component ${componentName} is going to unmount`);
        }

        render() {
            return <wrappedComponent {...this.props} />;
        }
    }

    HOC.displayName = `WithLogging(${componentName})`;
    return HOC;
}

export default WithLogging;

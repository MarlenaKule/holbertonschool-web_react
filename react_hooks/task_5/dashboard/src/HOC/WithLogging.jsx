/* eslint-disable */
import React from "react";

function WithLogging(WrappedComponent) {
    const wrappedName =
        WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component";

    class WithLoggingComponent extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithLoggingComponent.displayName = `WithLogging(${wrappedName})`;

    return WithLoggingComponent;
}

export default WithLogging;

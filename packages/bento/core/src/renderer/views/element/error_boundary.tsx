import React from "react";
import { Component, RefHandler } from "../../../environment/environment";

export class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  elementId: string;
  errorComponent?: Component;
  refHandler: RefHandler;
}> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    const ErrorComponent = this.props.errorComponent;
    if (this.state.hasError) {
      if (ErrorComponent) {
        return <ErrorComponent.render props={{}} ref={this.props.refHandler} />;
      }
      return (
        <div ref={this.props.refHandler}>
          Error rendering element {this.props.elementId}.
        </div>
      );
    }
    return this.props.children;
  }
}

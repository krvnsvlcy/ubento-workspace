import React from "react";
import { useEnvironmentErrorComponent } from "../states/environment.js";

class BoardErrorBoundaryClass extends React.Component<{
  children: React.ReactNode;
  errorComponent?: any;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("BoardErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    const ErrorComponent = this.props.errorComponent;
    if (this.state.hasError) {
      if (ErrorComponent) {
        return <ErrorComponent.render props={{}} ref={() => {}} />;
      }
      return (
        <div style={{ padding: "20px", color: "red" }}>
          Error rendering board.
        </div>
      );
    }
    return this.props.children;
  }
}

export function BoardErrorBoundary({ children }: { children: React.ReactNode }) {
  const ErrorComponent = useEnvironmentErrorComponent();
  return (
    <BoardErrorBoundaryClass errorComponent={ErrorComponent}>
      {children}
    </BoardErrorBoundaryClass>
  );
}

// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You could also log this to an error reporting service like Sentry
    console.error("Runtime error caught in remote module:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;

      if (typeof fallback === "function") {
        return <>{fallback(this.state.error!)}</>;
      }

      // Default crash UI if no custom fallback is provided
      return (
        fallback || (
          <div
            className="ubento-error"
            style={{ color: "red", border: "1px solid red", padding: "1rem" }}
          >
            <strong>A runtime error occurred in this module.</strong>
            <pre style={{ fontSize: "0.8em" }}>{this.state.error?.message}</pre>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

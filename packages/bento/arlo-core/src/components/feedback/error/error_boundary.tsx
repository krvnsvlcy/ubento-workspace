import React, { Component, type JSX, type PropsWithChildren } from "react";
import cx from "clsx";

interface ErrorBoundaryProps {
  fallbackRender?: (props: {
    error: Error;
    resetErrorBoundary: () => void;
  }) => JSX.Element;
  onReset?: () => void;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * A vanilla React Error Boundary component.
 * Catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    this.props.onError?.(error, errorInfo);
    console.error("[ErrorBoundary] Error caught:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallbackRender } = this.props;

    if (hasError && error) {
      if (fallbackRender) {
        return fallbackRender({
          error,
          resetErrorBoundary: this.resetErrorBoundary,
        });
      }

      return (
        <ErrorFallBack
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return children;
  }
}

export interface ErrorFallBackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  children?: React.ReactNode;
}

/**
 * Default fallback UI for the ErrorBoundary.
 */
export function ErrorFallBack({
  error,
  resetErrorBoundary,
  children,
}: ErrorFallBackProps): JSX.Element {
  return (
    <div
      className={cx(
        "flex h-full w-full flex-col items-center justify-center p-10 text-center",
        "animate-in fade-in duration-500",
      )}
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      </div>

      <h2 className="mb-2 text-xl font-bold tracking-tight text-neutral-content">
        Something went wrong
      </h2>

      <div className="mb-8 max-w-md text-sm text-neutral-content-muted">
        {children || (
          <p>{error?.message || "An unexpected error occurred in this section."}</p>
        )}
      </div>

      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className={cx(
            "rounded-lg bg-neutral-surface px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-content",
            "transition-all hover:bg-neutral-surface/80 active:scale-95",
          )}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorBoundary;

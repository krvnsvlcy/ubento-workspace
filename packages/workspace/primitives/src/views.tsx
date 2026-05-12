import React from "react";
import { BentoLoader } from "./loader";

export interface ViewProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PendingView: React.FC<ViewProps> = ({
  message = "Loading...",
}) => {
  return (
    <div
      id="pending-view"
      className={
        "h-full w-full flex flex-col items-center justify-center w-full gap-4"
      }
    >
      <BentoLoader size={24} opacity={0.5} />
      {message && (
        <p className="text-neutral-content-muted text-sm font-medium tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export const EmptyView: React.FC<ViewProps> = ({
  message = "No items found",
  className = "",
  children,
}) => {
  return (
    <div
      id="empty-view"
      className={`flex flex-col items-center justify-center min-h-[300px] w-full p-8 text-center border-2 border-dashed border-neutral-border rounded-2xl bg-neutral-surface ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-neutral-surface-hover flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-content-muted/60"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-neutral-content mb-2">
        {message}
      </h3>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export const ErrorView: React.FC<
  ViewProps & {
    error?: Error | string;
    action?: { label: string; onClick: () => void };
  }
> = ({ message = "Something went wrong", error, className = "", children }) => {
  return (
    <div
      id="error-view"
      className={`flex flex-col items-center justify-center h-full w-full p-8 text-center border border-destructive-border rounded-2xl bg-destructive-surface animate-in slide-in-from-bottom-4 duration-500 ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-destructive-surface-hover flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-destructive"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-destructive-content mb-2">
        {message}
      </h3>
      {error && (
        <p className="text-sm text-destructive-content/60 font-mono mb-4 max-w-md break-all">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

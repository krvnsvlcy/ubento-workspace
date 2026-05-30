import { Button } from "@/components/core/button.js";
import { Text } from "@/components/core/typography.js";
import { Spinner } from "@/components/feedback/spinner.js";
import React from "react";

export interface ViewProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PendingView: React.FC<ViewProps> = ({ message }) => {
  return (
    <div
      id="pending-view"
      className={
        "h-full w-full flex flex-col items-center justify-center w-full gap-4"
      }
    >
      <Spinner />
      {message && (
        <p className="text-content-muted text-sm font-medium tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export function EmptyView({
  message = "No items found",
  className = "",
  action,
}: {
  message?: string;
  className?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div
      className={`h-full w-full flex flex-col items-center justify-center p-8 gap-4 text-center ${className}`}
    >
      {message && (
        <p className="text-content-muted text-sm font-medium tracking-wide">
          {message}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function ErrorView({
  message = "Something went wrong",
  error,
  className = "",
  action,
}: ViewProps & {
  error?: Error | string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div
      className={`text-content h-full w-full flex flex-col items-center justify-center p-3 gap-4 text-center ${className}`}
    >
      {message && <Text>{message}</Text>}
      {error && (
        <p className="text-sm text-content/60 font-mono mb-4 max-w-md break-all">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}

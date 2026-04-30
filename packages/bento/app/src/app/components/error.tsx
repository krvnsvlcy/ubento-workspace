import { Button } from "@ubento/bento-primitives";
import { ReactNode } from "react";

export function ErrorView({
  message,
  details,
  action,
}: {
  message: string;
  details?: ReactNode;
  action?: {
    label: string;
    handler: () => void;
  };
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="text-red-400">{message}</div>
      {details && <div className="text-gray-400">{details}</div>}
      {action && (
        <Button variant="primary" shape="circle" onClick={action.handler}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

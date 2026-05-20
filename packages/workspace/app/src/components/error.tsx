import { PrimitiveButton as Button } from "@ubento/bento.arlo-core";
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
      <div className="text-destructive">{message}</div>
      {details && <div className="text-neutral-content-muted">{details}</div>}
      {action && (
        <Button variant="primary" shape="circle" onClick={action.handler}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

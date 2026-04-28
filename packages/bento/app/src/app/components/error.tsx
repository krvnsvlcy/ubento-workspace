export function ErrorView({
  message,
  action,
}: {
  message: string;
  action?: {
    label: string;
    handler: () => void;
  };
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="text-red-400">Error: {message}</div>
      {action && (
        <button onClick={action.handler} className="text-primary-500">
          {action.label}
        </button>
      )}
    </div>
  );
}

export function ControlPlaceholder({ placeholder }: { placeholder?: string }) {
  return (
    <div className="h-7 px-2 rounded-md border text-content-subtle">
      {placeholder}
    </div>
  );
}

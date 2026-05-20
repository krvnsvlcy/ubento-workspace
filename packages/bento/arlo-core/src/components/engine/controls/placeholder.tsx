export function ControlPlaceholder({ placeholder }: { placeholder?: string }) {
  return (
    <div className="h-7 px-2 rounded-md border text-neutral-content-subtle">
      {placeholder}
    </div>
  );
}

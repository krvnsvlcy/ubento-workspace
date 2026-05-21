export function AlertModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: 480,
      }}
    >
      {children}
    </div>
  );
}

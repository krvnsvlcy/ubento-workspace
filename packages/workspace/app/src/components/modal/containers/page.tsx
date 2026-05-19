export function PageModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        height: "90vh",
        width: "90vw",
        maxWidth: "1200px",
        maxHeight: "800px",
      }}
    >
      {children}
    </div>
  );
}

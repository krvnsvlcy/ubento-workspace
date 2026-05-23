export function RemoveButton({ onRemove }: { onRemove: () => void }) {
  return (
    <button
      className="border opacity-40 hover:opacity-100"
      style={{
        height: 10,
        width: 10,
        borderRadius: "50%",
        padding: 2,
        borderColor: "currentColor",
        flexShrink: 0,
      }}
      onClick={onRemove}
    >
      <div
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "currentColor",
        }}
      />
    </button>
  );
}

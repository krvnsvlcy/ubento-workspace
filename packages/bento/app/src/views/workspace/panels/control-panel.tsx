import React from "react";
import { useSnapshot } from "valtio";
import { WorkspaceController } from "../controller";

export function ControlPanel({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const state = useSnapshot(controller.state);
  const selectedId = state.context.selection?.[0];
  const workspace = state.boards[selectedId];

  const element =
    selectedId && workspace ? workspace.elements[selectedId] : null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          fontWeight: 600,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          letterSpacing: "0.02em",
        }}
      >
        <span>Inspector</span>
        {element && (
          <span
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              color: "#3b82f6",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {element.type}
          </span>
        )}
      </div>

      {!element ? (
        <div
          style={{
            padding: "48px 32px",
            textAlign: "center",
            opacity: 0.4,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px dashed currentColor",
              opacity: 0.3,
            }}
          />
          Select an element to edit properties
        </div>
      ) : (
        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            overflowY: "auto",
          }}
        >
          {/* Dimensions */}
          <Section title="Dimensions">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <PropertyInput
                label="Width"
                value={element.style?.width}
                onChange={(v) =>
                  controller.setElementStyle(selectedId, {
                    width: Number(v),
                  })
                }
              />
              <PropertyInput
                label="Height"
                value={element.style?.height}
                onChange={(v) =>
                  controller.setElementStyle(selectedId, {
                    height: Number(v),
                  })
                }
              />
            </div>
          </Section>

          {/* Styles */}
          <Section title="Appearance">
            <PropertyInput
              label="Background"
              value={element.style?.background || ""}
              onChange={(v) =>
                controller.setElementStyle(selectedId, { background: v })
              }
            />
            <PropertyInput
              label="Corner Radius"
              value={element.style?.cornerRadius}
              onChange={(v) =>
                controller.setElementStyle(selectedId, {
                  cornerRadius: Number(v),
                })
              }
            />
          </Section>

          {/* Stack Specific */}
          {element.type === "stack" && (
            <Section title="Layout">
              <PropertySelect
                label="Direction"
                value={(element as any).style?.direction || "row"}
                options={["row", "column"]}
                onChange={(v) =>
                  controller.setElementStyle(selectedId, {
                    direction: v as any,
                  })
                }
              />
              <PropertyInput
                label="Gap"
                value={(element as any).style?.gap}
                onChange={(v) =>
                  controller.setElementStyle(selectedId, { gap: Number(v) })
                }
              />
            </Section>
          )}
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "#52525b",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {children}
      </div>
    </div>
  );
}

function PropertyInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ color: "#71717a", fontWeight: 500 }}>{label}</span>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundColor: "#18181b",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "white",
          fontSize: "12px",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#3b82f6";
          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function PropertySelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ color: "#71717a", fontWeight: 500 }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundColor: "#18181b",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "white",
          fontSize: "12px",
          outline: "none",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

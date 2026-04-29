import React, { useState } from "react";
import { ComponentSelector } from "./component_selector";

export type InitializerProps = {
  onAddStack: (direction: "row" | "column") => void;
  onAddComponent: (moduleId: string) => void;
  className?: string;
  style?: React.CSSProperties;
};

export function Initializer({
  onAddStack,
  onAddComponent,
  className,
  style,
}: InitializerProps) {
  const [showMenu, setShowMenu] = useState(false);

  const buttonStyle: React.CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.8)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    pointerEvents: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "rgba(0,0,0,0.9)";
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "rgba(0,0,0,0.8)";
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        zIndex: 100,
        display: "flex",
        gap: "8px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: "60px",
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* Component Button */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          title="Add Component"
          style={buttonStyle}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </button>

        {showMenu && (
          <ComponentSelector
            onSelect={(moduleId) => {
              onAddComponent(moduleId);
              setShowMenu(false);
            }}
            onClose={() => setShowMenu(false)}
          />
        )}
      </div>

      {/* Row Stack Button */}
      <button
        onClick={() => onAddStack("row")}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        title="Add Row Stack"
        style={buttonStyle}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="8" height="20" x="3" y="2" rx="2" />
          <rect width="8" height="20" x="13" y="2" rx="2" />
        </svg>
      </button>

      {/* Column Stack Button */}
      <button
        onClick={() => onAddStack("column")}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        title="Add Column Stack"
        style={buttonStyle}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="8" x="2" y="3" rx="2" />
          <rect width="20" height="8" x="2" y="13" rx="2" />
        </svg>
      </button>
    </div>
  );
}

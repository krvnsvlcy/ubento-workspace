import React, { useState } from "react";
import { useBentoEngine } from "../../engine/engine";
import { StackStyle } from "../../models";
import { ComponentSelector } from "../elements/stack/component_selector";

export type InitializerProps = {
  targetId: string;
  targetType: "stack" | "board";
  className?: string;
  style?: React.CSSProperties;
};

function ControlButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-9 h-9 rounded-lg bg-accent/50 hover:bg-accent/70 text-accent-contrast flex items-center justify-center transition-all duration-200 cursor-pointer pointer-events-auto border border-accent/30"
    >
      {children}
    </button>
  );
}

export function Initializer({
  targetId,
  targetType,
  className,
  style,
}: InitializerProps) {
  const engine = useBentoEngine();
  const {
    setElementStyle,
    addElement,
    getModule,
    replaceElement,
    setBoardContent,
  } = engine;
  const [showMenu, setShowMenu] = useState(false);

  const onAddStack = (direction: "row" | "column") => {
    if (targetType === "stack") {
      const data = engine.selectActiveBoard(engine.getState());
      if (!data) return;

      // Update current stack style
      setElementStyle(targetId, {
        ...data.style,
        direction,
        gap: 1,
      } as StackStyle);

      // Add 2 colored elements directly to this stack
      addElement(targetId, {
        type: "stack",
        content: [],
        style: {
          width: { value: 1, unit: "fr" },
          height: { value: 1, unit: "fr" },
        },
      });

      addElement(targetId, {
        type: "stack",
        content: [],
        style: {
          width: { value: 1, unit: "fr" },
          height: { value: 1, unit: "fr" },
        },
      });
    } else {
      const id = addElement("root", {
        type: "stack",
        content: [],
        style: {
          direction,
          gap: 1,
          width: { value: 1, unit: "fr" },
          height: { value: 1, unit: "fr" },
        } as any,
      });
      setBoardContent(targetId, [id]);
    }
  };

  const onAddComponent = (moduleId: string) => {
    if (targetType === "stack") {
      const data = engine.selectActiveBoard(engine.getState());
      if (!data) return;

      getModule(moduleId).then((m) => {
        replaceElement(targetId, {
          type: "block",
          moduleId,
          moduleVersionId: m.latestVersionId,
          style: data.style as any,
          props: {},
        });
      });
    } else {
      getModule(moduleId).then((m) => {
        const id = addElement("root", {
          type: "block",
          moduleId,
          moduleVersionId: m.latestVersionId,
          style: {
            width: { value: 100, unit: "%" },
            height: { value: 100, unit: "%" },
          } as any,
          props: {},
        });
        setBoardContent(targetId, [id]);
      });
    }
    setShowMenu(false);
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
        containerType: "size",
        ...style,
      }}
    >
      <style>{`
        @container (width < 160px) or (height < 80px) {
          .bento-initializer-content {
            display: none !important;
          }
        }
      `}</style>
      <div
        className="bento-initializer-content"
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Component Button */}
        <div style={{ position: "relative" }}>
          <ControlButton
            onClick={() => setShowMenu(!showMenu)}
            title="Add Component"
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
          </ControlButton>

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
        <ControlButton onClick={() => onAddStack("row")} title="Add Row Stack">
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
        </ControlButton>

        {/* Column Stack Button */}
        <ControlButton
          onClick={() => onAddStack("column")}
          title="Add Column Stack"
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
        </ControlButton>
      </div>
    </div>
  );
}

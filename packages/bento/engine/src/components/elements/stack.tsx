import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSSProperties, useState } from "react";
import { useStore } from "zustand";
import { spacingBaseUnit } from "../../constants";
import { useEngineController } from "../../controller";
import { StackData } from "../../models";
import { BaseElement, getBaseStyle } from "./base_element";

import { Element } from "./element";

export function Stack({ id, data }: { id: string; data: StackData }) {
  const controller = useEngineController();
  const snap = useStore(controller);
  const isEditMode = snap.mode === "edit";
  const [showMenu, setShowMenu] = useState(false);

  const style = data.style;

  const cssStyle: CSSProperties = {
    ...getBaseStyle(style),
    gap: style.gap ? `${style.gap * spacingBaseUnit}px` : undefined,

    display: "flex",
    flexWrap: "wrap",
    flexDirection: style.direction,
    alignContent: "flex-start",
    justifyContent: style.justify,
    overflow: style.overflow,
    position: "relative",
  };

  const isEmpty = data.content.length === 0;

  const onAddStack = (direction: "row" | "column") => {
    // Update current stack style
    controller.getState().setElementStyle(id, {
      direction,
      gap: 2,
      padding: { top: 1, bottom: 1, left: 1, right: 1 },
      background: "rgba(0,0,0,0.05)",
      cornerRadius: 2,
    });

    // Add 2 colored elements directly to this stack
    controller.getState().addElement(id, {
      type: "stack",
      content: [],
      style: {
        width: 4,
        height: 4,
        background: "#3b82f6",
        cornerRadius: 1,
      },
    });

    controller.getState().addElement(id, {
      type: "stack",
      content: [],
      style: {
        width: 4,
        height: 4,
        background: "#10b981",
        cornerRadius: 1,
      },
    });
  };

  const onSelectComponent = (moduleId: string) => {
    controller
      .getState()
      .getModule(moduleId)
      .then((m) => {
        controller.getState().replaceElement(id, {
          type: "block",
          moduleId,
          moduleVersionId: m.latestVersionId,
          style: data.style as any,
          props: {},
        });
      });
    setShowMenu(false);
  };

  const innerContent = (
    <BaseElement id={id} data={data} style={cssStyle}>
      {isEmpty && isEditMode && (
        <div
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
          }}
        >
          {/* Component Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            title="Add Component"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              pointerEvents: "auto",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
            }
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

          {/* Row Stack Button */}
          <button
            onClick={() => onAddStack("row")}
            title="Add Row Stack"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              pointerEvents: "auto",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
            }
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

          {/* Column Stack Button */}
          <button
            onClick={() => onAddStack("column")}
            title="Add Column Stack"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              pointerEvents: "auto",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
            }
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

          {/* Quick Menu */}
          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: "8px",
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "8px",
                zIndex: 1000,
                minWidth: "150px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  padding: "4px 8px",
                  marginBottom: "4px",
                }}
              >
                Select Component
              </div>
              {Object.keys(snap.modules).length > 0 ? (
                Object.keys(snap.modules).map((moduleId) => (
                  <div
                    key={moduleId}
                    onClick={() => onSelectComponent(moduleId)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      color: "white",
                      fontSize: "14px",
                      transition: "background 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.1)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    {moduleId}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "8px 12px",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "12px",
                  }}
                >
                  No components found
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {data.content.map((childId) => (
        <Element key={childId} id={childId} />
      ))}
    </BaseElement>
  );

  if (!isEditMode) {
    return innerContent;
  }

  return (
    <SortableContext
      items={data.content}
      strategy={
        style.direction === "row"
          ? horizontalListSortingStrategy
          : verticalListSortingStrategy
      }
    >
      {innerContent}
    </SortableContext>
  );
}

import React, { createContext, useContext, useMemo } from "react";
import { useSnapshot } from "valtio";
import { ElementData, editorContext, BaseStyle } from "../models";
import { Component } from "./component";
import { Container } from "./core/container";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type ElementRegistry = {
  [key: string]: ElementData;
};

export const ElementRegistryContext = createContext<ElementRegistry>({});

export function ElementRegistryProvider({
  children,
  registry,
}: {
  children: React.ReactNode;
  registry: ElementRegistry;
}): React.JSX.Element {
  return (
    <ElementRegistryContext.Provider value={registry}>
      {children}
    </ElementRegistryContext.Provider>
  );
}

function getBaseStyle(style: BaseStyle): React.CSSProperties {
  return {
    width: style.width,
    height: style.height,
    minWidth: style.minWidth,
    maxWidth: style.maxWidth,
    minHeight: style.minHeight,
    maxHeight: style.maxHeight,
    backgroundColor: style.background,
    borderRadius: style.cornerRadius ? `${style.cornerRadius}px` : undefined,
    borderWidth: style.borderWidth ? `${style.borderWidth}px` : undefined,
    borderStyle: style.borderWidth ? "solid" : undefined,
    borderColor: style.borderColor,
    overflow: style.overflow,
    padding: style.padding ? `${style.padding.top ?? 0}px ${style.padding.right ?? 0}px ${style.padding.bottom ?? 0}px ${style.padding.left ?? 0}px` : undefined,
  };
}

export function Element({ id }: { id: string }): React.JSX.Element {
  const registry = useContext(ElementRegistryContext);
  const editorSnap = useSnapshot(editorContext);
  const element = registry[id];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  if (!element) {
    return <></>;
  }

  const isSelected = editorSnap.selection.includes(id);
  const isEditMode = editorSnap.mode === "edit";

  const renderContent = () => {
    if (element.type === "container") {
      return <Container content={element.content} style={element.style} />;
    }
    return (
      <div style={getBaseStyle(element.style)}>
        <Component id={element.component} props={element.props} />
      </div>
    );
  };

  const content = renderContent();

  if (!isEditMode) {
    return content;
  }

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    outline: isSelected ? "2px solid #3b82f6" : "1px dashed #4b5563",
    outlineOffset: "-1px",
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
    minHeight: "20px",
    minWidth: "20px",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation();
        if (e.shiftKey) {
          if (isSelected) {
            editorContext.selection = editorContext.selection.filter((s) => s !== id);
          } else {
            editorContext.selection.push(id);
          }
        } else {
          editorContext.selection = [id];
        }
      }}
    >
      {/* Handle Overlay */}
      <div
        style={{
          position: "absolute",
          top: -20,
          left: 0,
          backgroundColor: isSelected ? "#3b82f6" : "#4b5563",
          color: "white",
          fontSize: "10px",
          padding: "2px 6px",
          borderRadius: "4px 4px 0 0",
          pointerEvents: "none",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "4px",
          whiteSpace: "nowrap"
        }}
      >
        <span>{element.type === "container" ? "container" : `block:${element.component}`}</span>
        {isSelected && <span style={{ opacity: 0.8 }}>({id})</span>}
      </div>
      {content}
    </div>
  );
}

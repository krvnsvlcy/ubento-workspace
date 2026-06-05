import cx from "clsx";
import type { JSX, PropsWithChildren } from "react";
import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExclusiveBox, exlusiveBoxIgnoreClassName } from "./exclusive_box.js";
import { usePopperContainer } from "./popper_container.js";

function getClosestPositionedParent(el: HTMLElement): HTMLElement {
  let parent = el as HTMLElement | null;
  while (parent) {
    if (window.getComputedStyle(parent).position !== "static") {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.body;
}

function getPopperRect({
  anchorRect,
  popperRect,
  parentRect,
  position,
  align,
  offset,
}: {
  anchorRect: DOMRect;
  popperRect: DOMRect;
  parentRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  position: "top" | "bottom" | "left" | "right";
  align: "start" | "center" | "end" | "stretch";
  offset: number;
}) {
  let x = 0;
  let y = 0;
  let width = "auto" as "auto" | number;
  let height = "auto" as "auto" | number;

  switch (position) {
    case "top":
      y = anchorRect.top - offset - popperRect.height;
      break;
    case "bottom":
      y = anchorRect.bottom + offset;
      break;
    case "left":
      x = anchorRect.left - offset - popperRect.width;
      break;
    case "right":
      x = anchorRect.right + offset;
      break;
  }

  if (position === "top" || position === "bottom") {
    switch (align) {
      case "start":
        x = anchorRect.left;
        break;
      case "center":
        x = anchorRect.left + anchorRect.width / 2 - popperRect.width / 2;
        break;
      case "end":
        x = anchorRect.right - popperRect.width;
        break;
      case "stretch":
        x = anchorRect.left;
        width = anchorRect.width;
        break;
    }
  }

  if (position === "left" || position === "right") {
    switch (align) {
      case "start":
        y = anchorRect.top;
        break;
      case "center":
        y = anchorRect.top + anchorRect.height / 2 - popperRect.height / 2;
        break;
      case "end":
        y = anchorRect.bottom - popperRect.height;
        break;
      case "stretch":
        y = anchorRect.top;
        height = anchorRect.height;
        break;
    }
  }

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const maxX = windowWidth - popperRect.width - 12;
  const maxY = windowHeight - popperRect.height - 12;
  const minX = 12;
  const minY = 12;

  x = Math.min(Math.max(x, minX), maxX);
  y = Math.min(Math.max(y, minY), maxY);

  return {
    x: x - parentRect.x,
    y: y - parentRect.y,
    width,
    height,
  };
}

export const PopperContext = React.createContext<{
  anchor: HTMLElement | null;
  setAnchor: (el: HTMLElement | null) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
} | null>(null);

export function PopperProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <PopperContext.Provider value={{ isOpen, setIsOpen, anchor, setAnchor }}>
      {children}
    </PopperContext.Provider>
  );
}

export function PopperTrigger({ children }: PropsWithChildren) {
  const context = React.useContext(PopperContext);
  if (!context)
    throw new Error("PopperTrigger must be used within PopperProvider");

  const child = React.Children.only(children) as any;

  return React.cloneElement(child, {
    ref: (el: HTMLElement | null) => {
      const originalRef = child.ref;
      if (typeof originalRef === "function") originalRef(el);
      else if (originalRef) originalRef.current = el;
      context.setAnchor(el);
    },
    onClick: (e: React.MouseEvent) => {
      if (child.props && child.props.onClick) child.props.onClick(e);
      context.setIsOpen(!context.isOpen);
    },
  });
}

export function Popper({
  anchor: propAnchor,
  position,
  align,
  offset,
  children,
  exclusive,
  onClose,
  filled,
  border,
  shadow,
}: PropsWithChildren<{
  anchor?: HTMLElement;
  position?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end" | "stretch";
  exclusive?: boolean;
  offset?: number;
  onClose?: () => void;
  filled?: boolean;
  border?: boolean;
  shadow?: boolean;
}>): JSX.Element {
  const context = React.useContext(PopperContext);
  const anchor = propAnchor || context?.anchor;
  const isOpen = context ? context.isOpen : true;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [{ x, y, width, height }, setRect] = useState({
    x: 0,
    y: 0,
    width: 0 as "auto" | number,
    height: 0 as "auto" | number,
  });
  const container = usePopperContainer();

  useLayoutEffect(() => {
    if (!ref.current) return;
    if (!anchor) return;

    const popperRect = ref.current.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const containerRect =
      getClosestPositionedParent(container).getBoundingClientRect();

    setRect(
      getPopperRect({
        anchorRect,
        popperRect,
        parentRect: containerRect || {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        position: position || "bottom",
        align: align || "start",
        offset: offset || 0,
      }),
    );
  }, [isOpen, align, anchor, offset, position, container]);

  if (!isOpen || !anchor) return <></>;

  const transform = "";

  const style: React.CSSProperties = {
    position: "absolute",
    zIndex: 1000,
    top: y,
    left: x,
    width: width || "auto",
    height: height || "auto",
    transform,
    overflow: "hidden",
  };
  const className = cx(
    {
      "rounded-2xl": filled || border,
      "bg-background ": filled,
      border: border,
      "shadow-xl": shadow,
    },
    "animate-in fade-in-0 zoom-in-95",
    {
      "slide-in-from-top-2": position === "bottom",
      "slide-in-from-bottom-2": position === "top",
      "slide-in-from-left-2": position === "right",
      "slide-in-from-right-2": position === "left",
    },
    exlusiveBoxIgnoreClassName,
  );

  let content = <></>;

  if (exclusive) {
    content = (
      <ExclusiveBox
        onRef={(el) => {
          ref.current = el;
        }}
        className={className}
        style={style}
        onClose={() => {
          context?.setIsOpen(false);
          onClose?.();
        }}
      >
        {children}
      </ExclusiveBox>
    );
  } else {
    content = (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return createPortal(content, container);
}

export default Popper;

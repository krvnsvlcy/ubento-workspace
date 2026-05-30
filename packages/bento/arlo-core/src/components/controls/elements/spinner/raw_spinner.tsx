import { cx } from "class-variance-authority";
import { Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";
import React, { useState } from "react";

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

export type RawSpinnerControlProps = {
  value?: string | number;
  isMixed?: boolean;
  isUndefined?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onEnter?: () => void;
  suffix?: ReactNode;
  increment?: () => void;
  decrement?: () => void;
  startLongIncrement?: () => void;
  startLongDecrement?: () => void;
  step?: number;
  min?: number;
  max?: number;
  showIncrementors?: boolean;
  autoFocus?: boolean;
  minContent?: boolean;
  align?: "left" | "center" | "right";
};

export function RawSpinnerControl({
  value,
  isMixed,
  isUndefined,
  onChange,
  onFocus,
  onBlur,
  onEnter,
  suffix,
  increment,
  decrement,
  startLongIncrement,
  startLongDecrement,
  step,
  min,
  max,
  showIncrementors,
  autoFocus,
  minContent,
  align,
}: RawSpinnerControlProps) {
  const [mode, setMode] = useState<"edit" | "view">("view");

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();

    let initialValue = Number(value);
    if (Number.isNaN(initialValue)) {
      initialValue = 0;
    }

    let delta = 0;
    let initialized = false;
    const target = e.currentTarget as HTMLElement;
    let eventCount = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!e.movementX && !e.movementY) {
        return;
      }

      if (!initialized) {
        initialized = true;
        onFocus?.();
        target.requestPointerLock();
        return;
      }

      // prevent initial jump
      eventCount++;
      if (eventCount < 3 && Math.abs(e.movementX) > 10) {
        return;
      }

      const _step = step ?? 1;
      delta += e.movementX;
      const newValue = initialValue + delta * _step;
      const clamped = clamp(newValue, min ?? -Infinity, max ?? Infinity);
      onChange?.(clamped.toString());
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      if (initialized) {
        initialized = false;
        document.exitPointerLock();
        onBlur?.();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div
        className={cx({ "h-full w-full": !minContent })}
        style={{
          display: "flex",
          alignItems: "center",
          gap: minContent ? 0 : 5,
        }}
      >
        <input
          className={cx({ "w-full": !minContent })}
          style={{
            outline: "none",
            cursor: mode === "view" ? "ew-resize" : "text",
            minWidth: 0,
            textAlign: align,
          }}
          type="number"
          value={value}
          placeholder={isMixed ? "mixed" : isUndefined ? "unset" : ""}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
          onFocus={onFocus}
          onBlur={() => {
            onBlur?.();
            setMode("view");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
              onEnter?.();
            }
          }}
          step={step}
          min={min}
          max={max}
          onMouseDown={mode === "view" ? handleResizeStart : undefined}
          onClick={(e) => {
            if (mode === "view") setMode("edit");
            e.currentTarget.focus();
          }}
          autoFocus={autoFocus}
        />

        {suffix ? (
          <div
            className="text-content-subtle"
            style={{
              flexShrink: 0,
            }}
          >
            {suffix}
          </div>
        ) : null}

        {showIncrementors ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Minus
              className="opacity-50 hover:opacity-100 cursor-pointer size-4"
              onClick={decrement}
              onMouseDown={startLongDecrement}
            />
            <Plus
              className="opacity-50 hover:opacity-100 cursor-pointer size-4"
              onClick={increment}
              onMouseDown={startLongIncrement}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

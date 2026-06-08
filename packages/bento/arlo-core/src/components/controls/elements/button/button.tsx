import ProgressBar from "@/components/feedback/loaders/progress_bar.js";
import cx from "clsx";
import { Edit2, Minus, Plus, Settings, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import React, { forwardRef, useState } from "react";

export type ColorAccent =
  | "yellow"
  | "green"
  | "blue"
  | "red"
  | "violet"
  | "primary"
  | "neutral";

const IconMap: Record<string, any> = {
  plus: Plus,
  minus: Minus,
  trash: Trash2,
  delete: Trash2,
  edit: Edit2,
};

export const ControlButton = forwardRef<
  HTMLButtonElement,
  {
    loading?: boolean;
    label?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
    dimmed?: boolean;
    align?: "start" | "center" | "end";
    accent?: ColorAccent;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    action?: {
      icon: string;
      label: string;
      handler: () => void;
    };
  }
>(function (
  {
    loading,
    label,
    prefix,
    suffix,
    onClick,
    align = "start",
    dimmed,
    accent,
    action,
  },
  ref,
) {
  const [hovered, setHovered] = useState(false);

  const ActionIcon = action
    ? IconMap[action.icon.toLowerCase()] || Settings
    : null;

  return (
    <button
      ref={ref}
      className={cx("border w-full h-7 rounded-md", {
        "text-content": dimmed,
        "hover:bg-surface/20": !accent,
        "border-yellow/20 bg-yellow/10 hover:bg-yellow/20": accent === "yellow",
        "border-green/20 bg-green/10 hover:bg-green/20": accent === "green",
        "border-blue/20 bg-blue/10 hover:bg-blue/20": accent === "blue",
        "border-red/20 bg-red/10 hover:bg-red/20": accent === "red",
        "border-violet/20 bg-violet/10 hover:bg-violet/20": accent === "violet",
        "border-border/20 bg-main/10 hover:bg-main/20": accent === "primary",
      })}
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        justifyContent: "space-between",
        cursor: "pointer",
        overflow: "hidden",
        gap: 4,
        textAlign: align,
        paddingLeft: prefix ? 4 : 8,
        paddingRight: suffix || action ? 4 : 8,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {prefix ? (
        <div
          className="h-5 w-5"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prefix}
        </div>
      ) : (
        <></>
      )}
      <div
        style={{
          flexGrow: 1,
          overflow: "hidden",
          textWrap: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </div>
      {suffix ? (
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {suffix}
        </div>
      ) : action && hovered ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            action.handler();
          }}
          className={cx(
            "cursor-pointer h-5 w-5 rounded shrink-0 items-center opacity-50 hover:opacity-100 justify-center flex hover:bg-surface/10 border",
          )}
        >
          {ActionIcon && <ActionIcon className="h-4 w-4" />}
        </div>
      ) : (
        <></>
      )}

      {loading ? (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <ProgressBar />
        </div>
      ) : (
        <></>
      )}
    </button>
  );
});

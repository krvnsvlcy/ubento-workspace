import cx from "clsx";
import { ChevronRight } from "lucide-react";
import type { JSX, PropsWithChildren } from "react";
import React, { memo, useState } from "react";
import ProgressBar from "@/components/feedback/loaders/progress_bar.js"; 
import { TreeEntryRaw } from "@/components/data/tree/tree_entry_raw.js";

export type TreeEntryProps = PropsWithChildren<{
  ref?: React.Ref<HTMLDivElement>; // <- ✅ direct ref as prop
  depth?: number;
  icon?: React.ReactNode;
  noIcon?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  active?: boolean;
  hover?: boolean;
  loading?: boolean;
  hoverable?: boolean;
  square?: boolean;
  size?: "small" | "medium" | "large";
  accent?: boolean;
  open?: boolean;
  nested?: boolean;
  container?: boolean;
  actions?: Array<{
    icon: React.ReactNode;
    handler?: (event: React.MouseEvent) => void;
    persistent?: boolean;
  }>;
  onToggleOpen?: (open: boolean) => void;
  contentClassname?: string;
}> &
  Omit<JSX.IntrinsicElements["div"], "ref" | "prefix">;

export const TreeEntry = memo(function ({
  ref,
  hoverable = true,
  icon,
  noIcon,
  prefix,
  suffix,
  children,
  className,
  active,
  hover,
  loading,
  square,
  size = "medium",
  accent,
  open,
  nested,
  container,
  actions = [],
  onToggleOpen,
  onMouseEnter,
  onMouseLeave,
  contentClassname,
  style,
  ...props
}: TreeEntryProps) {
  const [isHovered, setHovered] = useState(false);

  const persistentActions = actions.filter((a) => a.persistent);
  const hoverActions = actions.filter((a) => !a.persistent);

  return (
    <TreeEntryRaw
      ref={ref}
      className={cx(
        "relative w-full shrink-0 grow-0 flex items-center text-content-subtle text-start overflow-hidden outline outline-1 -outline-offset-1",
        {
          "cursor-pointer": hoverable,
          "outline-transparent": !active,
          "hover:bg-surface/30": !active && !hover && hoverable && !accent,
          "focus:bg-surface/50 focus:text-content focus:outline-border":
            !active && !accent,
          "bg-surface/30 hover:bg-surface/50 text-content outline-border":
            active && !accent,
          "bg-surface/30": hover && hoverable && !accent,
          "hover:bg-base/20": !active && !hover && hoverable && accent,
          "focus:bg-base/20 focus:text-content focus:outline-accent/40":
            !active && accent,
          "bg-base/10 hover:bg-base/20 text-content outline-accent/30":
            active && accent,
          "bg-base/10 hover:bg-base/10": hover && hoverable && accent,
          "rounded-md": !square, //
          "h-7": size === "medium",
          "h-6 text-sm": size === "small",
        },
        className,
      )}
      style={{
        ...style,
        paddingRight: size === "small" ? 2 : 4,
        paddingLeft: size === "small" ? 2 : 4,
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        onMouseLeave?.(e);
      }}
      {...props}
    >
      <div
        style={{
          gap: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* prefix */}
        {nested ? (
          container ? (
            <button
              className="w-5 h-5 rounded hover:bg-surface/30 p-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onToggleOpen?.(!open);
              }}
              style={{
                flexShrink: 0,
              }}
            >
              <ChevronRight
                size={14}
                className={cx("transition-transform", {
                  "rotate-90": open,
                })}
              />
            </button>
          ) : (
            <div style={{ width: 20, flexShrink: 0 }} />
          )
        ) : (
          prefix || <div />
        )}

        {/* body */}
        <div
          style={{
            flexGrow: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 4,
            overflow: "hidden",
          }}
        >
          {!noIcon && (
            <div
              style={{
                width: 16,
                height: 16,
                flexShrink: 0,
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </div>
          )}
          <div
            className={contentClassname}
            style={{
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </div>
        </div>

        {/* suffix */}
        {(!!suffix ||
          persistentActions.length ||
          (isHovered && !!hoverActions.length)) && (
          <div
            style={{
              height: "100%",
              flexShrink: 0,
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 4,
            }}
          >
            {suffix}
            {actions.map(({ icon, handler, persistent }, index) => (
              <button
                key={index}
                className="w-5 h-5 rounded hover:bg-surface/50 p-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  handler?.(e);
                }}
                style={{
                  display: persistent || isHovered ? undefined : "none",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div
            style={{
              position: "absolute",
              bottom: -1,
              left: 0,
              right: 0,
            }}
          >
            <ProgressBar />
          </div>
        )}
      </div>
    </TreeEntryRaw>
  );
});

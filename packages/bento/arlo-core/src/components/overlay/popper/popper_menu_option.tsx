import cx from "clsx";
import React from "react";
import { PopperContext } from "./popper.js";

export type PopperMenuOptionProps = {
  label?: React.ReactNode;
  icon?: React.ReactNode | string;
  onClick: (e: React.MouseEvent) => void;
  dimmed?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  closeOnSelect?: boolean;
};

export function PopperMenuOption({
  label,
  icon,
  onClick,
  dimmed = false,
  disabled = false,
  destructive = false,
  closeOnSelect = true,
}: PopperMenuOptionProps) {
  const context = React.useContext(PopperContext);
  let iconNode = <></>;

  if (icon) {
    if (typeof icon === "string") {
      iconNode = (
        <div
          className="h-4 w-4 shrink-0 bg-neutral-content/10 rounded-sm"
          title={`Icon: ${icon}`}
        />
      );
    } else {
      iconNode = <div style={{ flexShrink: 0 }}>{icon}</div>;
    }
  }

  return (
    <div
      className={cx(
        "h-8 py-1 px-2 w-full rounded-md text-sm flex items-center gap-2",
        {
          "text-neutral-content": dimmed || disabled,
          "hover:bg-current/7": !disabled,
          "text-destructive": destructive,
        },
      )}
      style={{
        cursor: "pointer",
        overflow: "hidden",
        textWrap: "nowrap",
        textOverflow: "ellipsis",
      }}
      onClick={
        disabled
          ? undefined
          : (e) => {
              e.stopPropagation();
              e.preventDefault();
              onClick(e);
              if (closeOnSelect && context) {
                context.setIsOpen(false);
              }
            }
      }
    >
      {iconNode}
      <div
        style={{
          flexGrow: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}

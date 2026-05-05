import cx from "clsx";
import React from "react";

export type PopperMenuOptionProps = {
  label?: React.ReactNode;
  icon?: React.ReactNode | string;
  onClick: (e: React.MouseEvent) => void;
  dimmed?: boolean;
  disabled?: boolean;
};

export function PopperMenuOption({
  label,
  icon,
  onClick,
  dimmed = false,
  disabled = false,
}: PopperMenuOptionProps) {
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
        "h-6 py-1 w-full rounded text-sm flex items-center gap-1",
        {
          "text-neutral-content": dimmed || disabled,
          "hover:bg-neutral-surface/80": !disabled,
          "px-2": !icon,
          "pl-1 pr-2": icon,
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

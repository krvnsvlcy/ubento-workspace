import cx from "clsx";
import type { PropsWithChildren, ReactNode } from "react";
import { forwardRef } from "react";
import { RemoveButton } from "./remove_button.js";

function MiniControlEntryLabel({
  label,
  active,
  onRemove,
}: {
  label?: React.ReactNode;
  active?: boolean;
  onRemove?: () => void;
}) {
  const hasMenu = false;

  return (
    <div
      style={{
        flexShrink: 0,
        position: "relative",
        display: "flex",
        alignItems: "center",
        textAlign: "start",
      }}
      className={cx("h-7 ", {
        "text-content-subtle": !active,
        "hover:text-content": !active && hasMenu,
        "text-base": active,
        "text-base hover:text-base-500": active && hasMenu,
      })}
    >
      {onRemove ? <RemoveButton onRemove={onRemove} /> : <></>}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "start",
          width: 16,
        }}
        disabled={true}
      >
        {label}
      </button>
    </div>
  );
}

export const MiniControlEntry = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    icon?: ReactNode;
    label?: ReactNode;
    active?: boolean;
    onRemove?: () => void;
  }>
>(function ({ label, icon, children, active, onRemove }, ref) {
  let _label = icon ?? label;
  if (typeof _label === "string") {
    _label = _label[0].toLocaleUpperCase();
  }

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
        width: "calc(50% - 12px)",
      }}
    >
      {_label ? (
        <MiniControlEntryLabel
          label={_label}
          active={active}
          onRemove={onRemove}
        />
      ) : (
        <></>
      )}
      <div
        style={{
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
});

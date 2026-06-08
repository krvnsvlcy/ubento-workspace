import { Tooltip } from "@/components/overlay/tooltip.js";
import cx from "clsx";
import type { PropsWithChildren } from "react";
import React, { forwardRef } from "react";
import { IconButton } from "../elements/icon_button/icon_button.js";
import { RemoveButton } from "./remove_button.js";

function FullControlEntryLabel({
  label,
  active,
  onRemove,
  quickActions = [],
}: {
  label?: React.ReactNode;
  active?: boolean;
  quickActions?: {
    icon: string;
    label: string;
    handler: () => void;
  }[];
  onRemove?: () => void;
}) {
  const hasMenu = false;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        flexShrink: 0,
      }}
      className={cx("h-7", {
        "text-content-subtle": !active,
        "hover:text-content": !active && hasMenu,
        "text-main-300": active,
        "text-main-300 hover:text-main-500": active && hasMenu,
      })}
    >
      <div className="group grow h-full overflow-hidden flex items-center gap-1">
        {onRemove ? <RemoveButton onRemove={onRemove} /> : <></>}
        <button
          className="h-full"
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            textAlign: "start",
            overflow: "hidden",
          }}
          disabled={true}
        >
          <div
            style={{
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              textWrap: "nowrap",
              position: "relative",
            }}
          >
            {label}
          </div>
        </button>
        {quickActions.map((quickAction) => (
          <div className="hidden group-hover:block opacity-50 hover:opacity-100 shrink-0">
            <Tooltip content={quickAction.label} sideOffset={4}>
              <button
                onClick={quickAction.handler}
                className="h-4 w-4 items-center justify-center flex"
              >
                <div
                  className="h-4 w-4 bg-content/10 rounded-sm"
                  title={quickAction.icon}
                />
              </button>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
}

export const FullControlEntry = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    label?: React.ReactNode;
    icon?: React.ReactNode;
    active?: boolean;
    onRemove?: () => void;
    action?: {
      icon: string | React.ReactNode;
      label: string;
      handler: () => void;
      active?: boolean;
    };
    /**
     * @deprecated Use `quickActions` for multiple quick actions
     */
    quickAction?: {
      icon: string;
      label: string;
      handler: () => void;
    };
    quickActions?: {
      icon: string;
      label: string;
      handler: () => void;
    }[];
    orientation?: "row" | "column";
  }>
>(function (
  {
    active,
    label,
    children,
    orientation = "row",
    onRemove,
    action,
    quickAction,
    quickActions = [],
  },
  ref,
) {
  let labelElement = <></>;
  if (label) {
    labelElement = (
      <FullControlEntryLabel
        active={active}
        label={label}
        onRemove={onRemove}
        quickActions={[...(quickAction ? [quickAction] : []), ...quickActions]}
      />
    );
  }

  const contentElement = (
    <div className="flex gap-2">
      <div className="grow overflow-hidden">{children}</div>
      {action ? (
        <div className="shrink-0">
          <Tooltip content={action.label}>
            <IconButton
              icon={action.icon}
              onClick={action.handler}
              active={action.active}
              size="s7"
              className="border"
            />
          </Tooltip>
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  if (orientation === "column") {
    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
        }}
      >
        {labelElement}
        {contentElement}
      </div>
    );
  } else {
    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          width: "100%",
        }}
      >
        {label ? (
          <div style={{ width: "40%", flexShrink: 0 }}>{labelElement}</div>
        ) : null}
        <div style={{ flexGrow: 1, overflow: "hidden" }}>{contentElement}</div>
      </div>
    );
  }
});

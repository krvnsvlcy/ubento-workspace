import type { PropsWithChildren, ReactNode } from "react";
import { forwardRef } from "react";
import { FullControlEntry } from "./full_control_entry.js";
import { MiniControlEntry } from "./mini_control_entry.js";

export enum ControlEntryVariant {
  Mini = "mini",
  Full = "full",
}

export const ControlEntry = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    icon?: ReactNode;
    label?: ReactNode;
    variant?: ControlEntryVariant;
    active?: boolean;
    onRemove?: () => void;
    action?: {
      icon: string;
      label: string;
      handler: () => void;
      active?: boolean;
    };
    quickAction?: {
      icon: string;
      label: string;
      handler: () => void;
    };
  }>
>(function (
  {
    active,
    label,
    variant,
    children,
    icon,
    onRemove,
    action,
    quickAction,
  },
  ref,
) {
  switch (variant) {
    case ControlEntryVariant.Full: {
      return (
        <FullControlEntry
          ref={ref}
          icon={icon}
          label={label}
          active={active}
          onRemove={onRemove}
          action={action}
          quickAction={quickAction}
        >
          {children}
        </FullControlEntry>
      );
    }
    case ControlEntryVariant.Mini: {
      return (
        <MiniControlEntry
          ref={ref}
          icon={icon}
          label={label}
          active={active}
          onRemove={onRemove}
        >
          {children}
        </MiniControlEntry>
      );
    }
    default: {
      return (
        <FullControlEntry
          ref={ref}
          icon={icon}
          label={label}
          active={active}
          onRemove={onRemove}
          action={action}
          quickAction={quickAction}
        >
          {children}
        </FullControlEntry>
      );
    }
  }
});

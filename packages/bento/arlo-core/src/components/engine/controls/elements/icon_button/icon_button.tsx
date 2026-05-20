import cx from "clsx";
import type { JSX, ReactNode } from "react";
import React, { forwardRef } from "react";
import { Plus, Minus, Trash2, Edit2, Settings, ChevronDown, ChevronUp, X, Check, Info, AlertTriangle } from "lucide-react";

export type ColorAccent = "primary" | "neutral" | "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "violet" | "pink" | "rose" | "gray";

const IconMap: Record<string, any> = {
  plus: Plus,
  minus: Minus,
  trash: Trash2,
  delete: Trash2,
  edit: Edit2,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  close: X,
  check: Check,
  info: Info,
  warning: AlertTriangle,
};

export const IconButton = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & {
    active?: boolean;
    icon?: string | ReactNode;
    iconClassName?: string;
    iconStyle?: React.CSSProperties;
    size?: "s5" | "s6" | "s7";
    color?: ColorAccent;
    as?: keyof JSX.IntrinsicElements;
  }
>(
  (
    {
      active,
      icon,
      style,
      className,
      iconClassName,
      iconStyle,
      size = "s5",
      color = "neutral",
      as = "button",
      ...props
    },
    ref,
  ) => {
    const Component = as as any;
    
    let renderedIcon: ReactNode = icon;
    if (typeof icon === "string") {
      const LucideIcon = IconMap[icon.toLowerCase()] || Settings;
      renderedIcon = <LucideIcon className={cx("h-4 w-4", iconClassName)} style={iconStyle} />;
    }

    return (
      <Component
        ref={ref}
        className={cx(
          "rounded-md shrink-0 disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer flex items-center justify-center",
          {
            "h-5 w-5": size === "s5",
            "h-6 w-6": size === "s6",
            "h-7 w-7": size === "s7",
            "border": active,

            // primary
            "text-accent-400 hover:bg-accent/5": color === "primary" && !active,
            "bg-accent/10 text-accent-500 hover:bg-accent/20":
              color === "primary" && active,

            // neutral
            "border-neutral-border/10": color === "neutral",
            "text-neutral-content-subtle hover:bg-neutral-surface/5": color === "neutral" && !active,
            "bg-neutral-surface/5 text-neutral-content hover:bg-neutral-surface/10":
              color === "neutral" && active,

            // red
            "hover:text-red": color === "red",
            "text-red-400 hover:bg-red/5": color === "red" && !active,
            "text-red-500": color === "red" && active,
            
            // ... other colors could be added if needed, but keeping it simple for now
          },
          className,
        )}
        style={style}
        {...props}
      >
        {renderedIcon}
      </Component>
    );
  },
);

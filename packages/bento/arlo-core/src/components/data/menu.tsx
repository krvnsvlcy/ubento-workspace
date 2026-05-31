"use client";

import { CheckIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { cx as cn } from "@/lib/utils.js";

function Menu({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="menu"
      data-slot="menu"
      className={cn("min-w-36", className)}
      {...props}
    />
  );
}

function MenuGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div role="group" data-slot="menu-group" className={className} {...props} />
  );
}

function MenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <div
      role="menuitem"
      data-slot="menu-item"
      data-inset={inset}
      data-variant={variant}
      tabIndex={0}
      className={cn(
        "group/menu-item relative flex cursor-default items-center gap-1.5 rounded-xl px-2.5 py-1 h-8 text-sm outline-hidden select-none focus:bg-surface-hover hover:bg-surface-hover focus:text-content hover:text-content data-inset:pl-7 data-[variant=destructive]:text-base data-[variant=destructive]:focus:bg-surface data-[variant=destructive]:hover:bg-surface data-[variant=destructive]:focus:text-content data-[variant=destructive]:hover:text-content data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-content hover:*:[svg]:text-content data-[variant=destructive]:*:[svg]:text-base",
        className,
      )}
      {...props}
    />
  );
}

function MenuSub({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="menu-sub" className={className} {...props} />;
}

function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean;
}) {
  return (
    <div
      role="menuitem"
      aria-haspopup="menu"
      data-slot="menu-sub-trigger"
      data-inset={inset}
      tabIndex={0}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-surface-hover hover:bg-surface-hover focus:text-content hover:text-content data-inset:pl-7 data-open:bg-surface-hover data-open:text-content [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="cn-rtl-flip ml-auto" />
    </div>
  );
}

function MenuSubContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="menu"
      data-slot="menu-sub-content"
      className={cn(
        "min-w-32 overflow-hidden rounded-lg border bg-surface p-1 text-content shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

function MenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  checked?: boolean;
  inset?: boolean;
}) {
  return (
    <div
      role="menuitemcheckbox"
      aria-checked={checked}
      data-slot="menu-checkbox-item"
      data-inset={inset}
      tabIndex={0}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-surface-hover hover:bg-surface-hover focus:text-content hover:text-content data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        {checked && <CheckIcon />}
      </span>
      {children}
    </div>
  );
}

function MenuRadioGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="menu-radio-group"
      className={className}
      {...props}
    />
  );
}

function MenuRadioItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  checked?: boolean;
  inset?: boolean;
}) {
  return (
    <div
      role="menuitemradio"
      aria-checked={checked}
      data-slot="menu-radio-item"
      data-inset={inset}
      tabIndex={0}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-surface-hover hover:bg-surface-hover focus:text-content hover:text-content data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        {checked && <CheckIcon />}
      </span>
      {children}
    </div>
  );
}

function MenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean;
}) {
  return (
    <div
      data-slot="menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-content-muted data-inset:pl-7",
        className,
      )}
      {...props}
    />
  );
}

function MenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      data-slot="menu-separator"
      className={cn("my-1.5 h-px bg-border", className)}
      {...props}
    />
  );
}

function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-content-muted group-focus/menu-item:text-content group-hover/menu-item:text-content",
        className,
      )}
      {...props}
    />
  );
}

export {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
};

// Tremor Dropdown Menu [v1.0.0]

"use client";

import * as DropdownMenuPrimitives from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle, CircleDot } from "lucide-react";
import * as React from "react";

import { cx } from "@/lib/utils.js";

const DropdownMenu = DropdownMenuPrimitives.Root;
DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuTrigger = DropdownMenuPrimitives.Trigger;
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuGroup = DropdownMenuPrimitives.Group;
DropdownMenuGroup.displayName = "DropdownMenuGroup";

const DropdownMenuSubMenu = DropdownMenuPrimitives.Sub;
DropdownMenuSubMenu.displayName = "DropdownMenuSubMenu";

const DropdownMenuRadioGroup = DropdownMenuPrimitives.RadioGroup;
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

const DropdownMenuSubMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.SubTrigger>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubTrigger>,
    "asChild"
  >
>(({ className, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.SubTrigger
    ref={forwardedRef}
    className={cx(
      // base
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-1 outline-hidden transition-colors data-[state=checked]:font-semibold sm:text-sm",
      // text color
      "text-content",
      // disabled
      "data-disabled:pointer-events-none data-disabled:text-content-muted data-disabled:hover:bg-none",
      // focus
      "focus-visible:bg-surface-hover data-[state=open]:bg-surface-hover",
      // hover
      "hover:bg-surface-hover",
      //
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4 shrink-0" aria-hidden="true" />
  </DropdownMenuPrimitives.SubTrigger>
));
DropdownMenuSubMenuTrigger.displayName = "DropdownMenuSubMenuTrigger";

const DropdownMenuSubMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubContent>
>(({ className, collisionPadding = 8, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Portal>
    <DropdownMenuPrimitives.SubContent
      ref={forwardedRef}
      collisionPadding={collisionPadding}
      className={cx(
        // base
        "relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]",
        // widths
        "min-w-32",
        // heights
        "max-h-[var(--radix-popper-available-height)]",
        // background color
        "bg-surface",
        // text color
        "text-content",
        // border color
        "border-border",
        // transition
        "will-change-[transform,opacity]",
        "data-[state=closed]:animate-hide",
        "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitives.Portal>
));
DropdownMenuSubMenuContent.displayName = "DropdownMenuSubMenuContent";

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Content>
>(
  (
    {
      className,
      sideOffset = 8,
      collisionPadding = 8,
      align = "center",
      loop = true,
      ...props
    },
    forwardedRef,
  ) => (
    <DropdownMenuPrimitives.Portal>
      <DropdownMenuPrimitives.Content
        ref={forwardedRef}
        className={cx(
          // base
          "relative z-50 overflow-hidden rounded-xl border p-1 shadow-xl shadow-black/[2.5%]",
          // widths
          "min-w-48",
          // heights
          "max-h-[var(--radix-popper-available-height)]",
          // background color
          "bg-background",
          // text color
          "text-content",
          // border color
          "border-border",
          // transition
          "will-change-[transform,opacity]",
          "data-[state=closed]:animate-hide",
          "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
          className,
        )}
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
        loop={loop}
        {...props}
      />
    </DropdownMenuPrimitives.Portal>
  ),
);
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Item>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Item>,
    "asChild"
  > & {
    shortcut?: string;
    hint?: string;
  }
>(({ className, shortcut, hint, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Item
    ref={forwardedRef}
    className={cx(
      // base
      "group/DropdownMenuItem relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-2 pr-1 outline-hidden transition-colors data-[state=checked]:font-semibold sm:text-sm",
      // text color
      "text-content",
      // disabled
      "data-disabled:pointer-events-none data-disabled:text-content-muted data-disabled:hover:bg-none",
      // focus
      "focus-visible:bg-surface-hover",
      // hover
      "hover:bg-surface-hover",
      className,
    )}
    {...props}
  >
    {children}
    <span className={cx("ml-auto pl-2 text-sm text-content-muted")}>
      {hint || shortcut}
    </span>
  </DropdownMenuPrimitives.Item>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.CheckboxItem>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.CheckboxItem>,
    "asChild"
  > & {
    shortcut?: string;
    hint?: string;
  }
>(
  (
    { className, hint, shortcut, children, checked, ...props },
    forwardedRef,
  ) => (
    <DropdownMenuPrimitives.CheckboxItem
      ref={forwardedRef}
      className={cx(
        // base
        "relative flex cursor-pointer select-none items-center gap-x-2 rounded-sm py-1.5 pl-8 pr-1 outline-hidden transition-colors data-[state=checked]:font-semibold sm:text-sm",
        // text color
        "text-content",
        // disabled
        "data-disabled:pointer-events-none data-disabled:text-content-muted data-disabled:hover:bg-none",
        // focus
        "focus-visible:bg-surface-hover",
        // hover
        "hover:bg-surface-hover",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitives.ItemIndicator>
          <Check
            aria-hidden="true"
            className="size-full shrink-0 text-content"
          />
        </DropdownMenuPrimitives.ItemIndicator>
      </span>
      {children}
      {(hint || shortcut) && (
        <span
          className={cx(
            "ml-auto text-sm font-normal tracking-widest text-content-muted",
          )}
        >
          {hint || shortcut}
        </span>
      )}
    </DropdownMenuPrimitives.CheckboxItem>
  ),
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.RadioItem>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.RadioItem>,
    "asChild"
  > & {
    shortcut?: string;
    hint?: string;
  }
>(({ className, hint, shortcut, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.RadioItem
    ref={forwardedRef}
    className={cx(
      // base
      "group/DropdownMenuRadioItem relative flex cursor-pointer select-none items-center gap-x-2 rounded-sm py-1.5 pl-8 pr-1 outline-hidden transition-colors data-[state=checked]:font-semibold sm:text-sm",
      // text color
      "text-content",
      // disabled
      "data-disabled:pointer-events-none data-disabled:text-content-muted data-disabled:hover:bg-none",
      // focus
      "focus-visible:bg-surface-hover",
      // hover
      "hover:bg-surface-hover",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <CircleDot
        aria-hidden="true"
        className="size-full shrink-0 text-base group-data-[state=checked]/DropdownMenuRadioItem:flex group-data-[state=unchecked]/DropdownMenuRadioItem:hidden"
      />
      <Circle
        aria-hidden="true"
        className="size-full shrink-0 text-border group-data-[state=unchecked]/DropdownMenuRadioItem:flex group-data-[state=checked]/DropdownMenuRadioItem:hidden"
      />
    </span>
    {children}
    {(hint || shortcut) && (
      <span
        className={cx(
          "ml-auto text-sm font-normal tracking-widest text-content-muted",
        )}
      >
        {hint || shortcut}
      </span>
    )}
  </DropdownMenuPrimitives.RadioItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Label>
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Label
    ref={forwardedRef}
    className={cx(
      // base
      "px-2 py-2 text-xs font-medium tracking-wide",
      // text color
      "text-content-muted",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Separator>
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Separator
    ref={forwardedRef}
    className={cx("-mx-1 my-1 h-px border-t border-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuIconWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div
      className={cx(
        // text color
        "text-content",
        // disabled
        "group-data-disabled/DropdownMenuItem:text-content-muted",
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuIconWrapper.displayName = "DropdownMenuIconWrapper";

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIconWrapper,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
};

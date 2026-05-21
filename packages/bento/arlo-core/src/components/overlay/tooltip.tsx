import { usePopperContainer } from "@/components/overlay/popper/popper_container.js";
import * as Tooltip_ from "@radix-ui/react-tooltip";
import * as React from "react";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  sideOffset?: number;
  side?: "top" | "bottom" | "left" | "right";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showArrow?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  asChild?: boolean;
}

export function Tooltip({
  content,
  children,
  delayDuration,
  skipDelayDuration,
  sideOffset = 10,
  side,
  open,
  defaultOpen,
  onOpenChange,
  showArrow = true,
  onClick,
  asChild,
}: TooltipProps) {
  const container = usePopperContainer();

  return (
    <Tooltip_.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      <Tooltip_.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <Tooltip_.Trigger onClick={onClick} asChild={asChild ?? true}>
          {children}
        </Tooltip_.Trigger>
        <Tooltip_.Portal container={container}>
          <Tooltip_.Content
            sideOffset={sideOffset}
            side={side}
            className="max-w-60 select-none rounded-md px-2.5 py-1.5 text-sm leading-5 shadow-md text-inverse-content bg-inverse-surface"
            style={{
              zIndex: 1000,
            }}
          >
            {content}
            {showArrow && (
              <Tooltip_.Arrow
                className="border-none fill-inverse-surface"
                width={12}
                height={7}
                aria-hidden="true"
              />
            )}
          </Tooltip_.Content>
        </Tooltip_.Portal>
      </Tooltip_.Root>
    </Tooltip_.Provider>
  );
}

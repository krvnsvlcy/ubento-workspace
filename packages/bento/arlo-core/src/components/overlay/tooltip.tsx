import { usePopperContainer } from "@/components/overlay/popper/popper_container.js";
import * as Tooltip_ from "@radix-ui/react-tooltip";
import type { PropsWithChildren, ReactNode } from "react";

export function Tooltip({
  content,
  children,
  delayDuration,
  skipDelayDuration,
  sideOffset,
  side,
}: PropsWithChildren<{
  content?: ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  sideOffset?: number;
  side?: "top" | "bottom" | "left" | "right";
}>) {
  const container = usePopperContainer();

  return (
    <Tooltip_.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      <Tooltip_.Root>
        <Tooltip_.Trigger asChild>{children}</Tooltip_.Trigger>
        <Tooltip_.Portal container={container}>
          <Tooltip_.Content
            sideOffset={sideOffset}
            side={side}
            className="rounded-md py-0.5 px-1 bg-inverse-surface/90 backdrop-blur-sm text-inverse-content text-xs"
            style={{
              zIndex: 1000,
            }}
          >
            {content}
          </Tooltip_.Content>
        </Tooltip_.Portal>
      </Tooltip_.Root>
    </Tooltip_.Provider>
  );
}

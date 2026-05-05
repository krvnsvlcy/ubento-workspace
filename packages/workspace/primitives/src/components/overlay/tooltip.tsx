import * as Tooltip_ from "@radix-ui/react-tooltip";
import type { PropsWithChildren, ReactNode } from "react";
import { usePopperContainer } from "@/components/overlay/popper/popper_container.js";

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
            className="border rounded py-0.5 px-1 bg-neutral-surface"
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

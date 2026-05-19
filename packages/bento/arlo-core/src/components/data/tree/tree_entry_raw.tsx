import type { JSX, PropsWithChildren } from "react";
import React, { forwardRef, useContext } from "react";
import { TreeContext } from "@/components/data/tree/tree_context.js";

export type TreeEntryRawProps = PropsWithChildren<{
  icon?: React.ReactNode;
  depth?: number;
}> &
  Omit<JSX.IntrinsicElements["div"], "ref" | "prefix">;

export const TreeEntryRaw = forwardRef<HTMLDivElement, TreeEntryRawProps>(
  function TreeEntry({ children, style, depth: propsDepth, ...props }, ref) {
    const { depthOffset, depth: contextDepth, depthUnit } = useContext(TreeContext);

    const depth = propsDepth ?? contextDepth;

    return (
      <div
        ref={ref}
        {...props}
        style={{
          display: "flex",
          ...style,
        }}
      >
        <div
          style={{
            width: depthOffset + depth * depthUnit,
            flexShrink: 0,
          }}
        />
        {children}
      </div>
    );
  }
);

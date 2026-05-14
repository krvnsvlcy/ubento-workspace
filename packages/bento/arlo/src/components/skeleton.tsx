import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const skeletonPropsSchema = layoutElementStyleSchema.extend({
  radius: z.number().optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
});
export type SkeletonProps = z.infer<typeof skeletonPropsSchema>;

function getSkeletonStyle(
  props: SkeletonProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const { intent, radius } = props;
  const themePrefix = `--color-${intent}`;

  return {
    ...getLayoutElementStyle(props, layoutContext),
    borderRadius: radius !== undefined ? `${radius}px` : "6px",
    background: `var(${themePrefix}-surface-active)`,
    opacity: 0.7,
    // A simple animation could be added here via global CSS if preferred,
    // but a static active surface provides a good baseline loading look.
  };
}

export const Skeleton = createComponent({
  props: skeletonPropsSchema,
  summary: "Skeleton component",
  render: ({ ref, props }) => {
    const layoutContext = useLayoutContext();
    return <div ref={ref} style={getSkeletonStyle(props, layoutContext)} />;
  },
});

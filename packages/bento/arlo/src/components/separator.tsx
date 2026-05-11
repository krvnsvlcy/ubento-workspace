import { type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const separatorPropsSchema = layoutElementStyleSchema.extend({
  orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  thickness: z.number().default(1),
});
export type SeparatorProps = z.infer<typeof separatorPropsSchema>;

function getSeparatorStyle(
  props: SeparatorProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const { orientation, intent, thickness } = props;
  const themePrefix = `--color-${intent}`;

  return {
    ...getLayoutElementStyle(props, layoutContext),
    background: `var(${themePrefix}-border)`,
    ...(orientation === "horizontal"
      ? { height: `${thickness}px`, width: "100%" }
      : { width: `${thickness}px`, height: "100%" }),
  };
}

export function Separator({ ref, props }: ComponentProps<SeparatorProps>) {
  const layoutContext = useLayoutContext();
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={props.orientation}
      style={getSeparatorStyle(props, layoutContext)}
    />
  );
}

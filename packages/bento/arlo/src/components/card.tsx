import { edgesSpec, type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getEdgesStyle,
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const cardPropsSchema = layoutElementStyleSchema.extend({
  padding: z.union([edgesSpec(z.number()), z.number()]).optional(),
  radius: z.number().optional(),
  gap: z.number().optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  border: z.boolean().default(true),
  shadow: z.union([z.boolean(), z.string()]).optional(),
});
export type CardProps = z.infer<typeof cardPropsSchema>;

function getCardStyle(
  props: CardProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const { intent, padding, radius, border, shadow, gap } = props;
  const themePrefix = `--color-${intent}`;

  return {
    ...getLayoutElementStyle(props, layoutContext),
    ...getEdgesStyle(
      typeof padding === "number"
        ? {
            top: padding,
            bottom: padding,
            left: padding,
            right: padding,
          }
        : padding,
      "padding",
    ),
    borderRadius: radius !== undefined ? `${radius}px` : "8px",
    background: `var(${themePrefix}-surface)`,
    color: `var(${themePrefix}-content)`,
    border: border ? `1px solid var(${themePrefix}-border)` : "none",
    boxShadow:
      shadow === true
        ? "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
        : typeof shadow === "string"
          ? shadow
          : undefined,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: gap !== undefined ? `${gap}px` : undefined,
    transition: "all 0.15s ease-in-out",
  };
}

export function Card({ ref, props, children }: ComponentProps<CardProps>) {
  const layoutContext = useLayoutContext();
  return (
    <div ref={ref} style={getCardStyle(props, layoutContext)}>
      {children}
    </div>
  );
}

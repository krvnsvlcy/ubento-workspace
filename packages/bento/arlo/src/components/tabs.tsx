import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const tabItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  disabled: z.boolean().optional(),
});

export const tabsPropsSchema = layoutElementStyleSchema.extend({
  value: z.string().optional(),
  items: z.array(tabItemSchema).default([]),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("accent"),
  variant: z.enum(["pill", "underline", "outline"]).default("pill"),
});
export type TabsProps = z.infer<typeof tabsPropsSchema>;

export const Tabs = createComponent({
  schema: tabsPropsSchema,
  summary: "Tabs component",
  render: ({ ref, props }) => {
    const layoutContext = useLayoutContext();
    const { items, value, intent, variant } = props;
    const themePrefix = `--color-${intent}`;

    const containerStyle: React.CSSProperties = {
      ...getLayoutElementStyle(props, layoutContext),
      display: "flex",
      gap: variant === "underline" ? "24px" : "4px",
      padding: variant === "pill" ? "4px" : "0",
      background: variant === "pill" ? "var(--color-neutral-surface)" : "transparent",
      borderRadius: variant === "pill" ? "8px" : "0",
      borderBottom: variant === "underline" ? `1px solid var(--color-neutral-border)` : "none",
      width: "fit-content",
    };

    return (
      <div ref={ref} style={containerStyle}>
        {items.map((item) => {
          const isActive = value === item.value;
          
          const itemStyle: React.CSSProperties = {
            padding: "6px 12px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: item.disabled ? "not-allowed" : "pointer",
            borderRadius: variant === "pill" ? "6px" : "0",
            transition: "all 0.2s ease",
            color: isActive ? `var(${themePrefix}-content)` : "var(--color-neutral-content-subtle)",
            background: isActive && variant === "pill" ? "var(--color-background)" : "transparent",
            boxShadow: isActive && variant === "pill" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            borderBottom: isActive && variant === "underline" ? `2px solid var(${themePrefix})` : "none",
            marginBottom: variant === "underline" ? "-1px" : "0",
            opacity: item.disabled ? 0.5 : 1,
          };

          return (
            <div key={item.value} style={itemStyle}>
              {item.label}
            </div>
          );
        })}
      </div>
    );
  }
});

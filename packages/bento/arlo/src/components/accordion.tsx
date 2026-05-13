import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const accordionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  isOpen: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export const accordionPropsSchema = layoutElementStyleSchema.extend({
  items: z.array(accordionItemSchema).default([]),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  allowMultiple: z.boolean().optional(),
});
export type AccordionProps = z.infer<typeof accordionPropsSchema>;

export const Accordion = createComponent({
  schema: accordionPropsSchema,
  summary: "Accordion component",
  render: ({ ref, props }) => {
    const layoutContext = useLayoutContext();
    const { items, intent } = props;
    const themePrefix = `--color-${intent}`;

    return (
      <div ref={ref} style={{
      ...getLayoutElementStyle(props, layoutContext),
      width: "100%",
      display: "flex",
      flexDirection: "column",
      borderBottom: `1px solid var(${themePrefix}-border)`,
    }}>
      {items.map((item) => (
        <div key={item.id} style={{
          borderTop: `1px solid var(${themePrefix}-border)`,
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: item.disabled ? "not-allowed" : "pointer",
            fontWeight: 500,
            fontSize: "14px",
            background: "transparent",
            color: `var(${themePrefix}-content)`,
            opacity: item.disabled ? 0.5 : 1,
          }}>
            {item.title}
            <div style={{
              transform: item.isOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s ease",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {item.isOpen && (
            <div style={{
              padding: "0 16px 16px 16px",
              fontSize: "14px",
              color: "var(--color-neutral-content-subtle)",
              lineHeight: 1.6,
            }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
});

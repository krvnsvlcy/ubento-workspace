import { createComponent } from "@ubento/bento.core";
import clsx from "clsx";
import { z } from "zod";

export const textPropsSchema = z.object({
  text: z.string(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .optional(),
  size: z
    .enum([
      "xs",
      "sm",
      "base",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
      "8xl",
      "9xl",
    ])
    .default("base"),
  weight: z.number().optional(),
  align: z.enum(["left", "center", "right", "justify"]).optional(),
  style: z.enum(["normal", "italic"]).optional(),
  decoration: z.enum(["none", "underline"]).optional(),
  variant: z.enum(["span", "paragraph"]).optional(),
});
export type TextProps = z.infer<typeof textPropsSchema>;

export const Text = createComponent({
  schema: textPropsSchema,
  summary: "Text component",
  render: ({ props, ref, children }) => {
    const Tag = props.variant === "paragraph" ? "p" : "span";
    return (
      <Tag
        ref={ref}
        className={clsx({
          "text-xs": props.size === "xs",
          "text-sm": props.size === "sm",
          "text-base": props.size === "base",
          "text-lg": props.size === "lg",
          "text-xl": props.size === "xl",
          "text-2xl": props.size === "2xl",
          "text-3xl": props.size === "3xl",
          "text-4xl": props.size === "4xl",
          "text-5xl": props.size === "5xl",
          "text-6xl": props.size === "6xl",
          "text-7xl": props.size === "7xl",
          "text-8xl": props.size === "8xl",
          "text-9xl": props.size === "9xl",

          "font-thin": props.weight === 100,
          "font-extralight": props.weight === 200,
          "font-light": props.weight === 300,
          "font-normal": props.weight === 400,
          "font-medium": props.weight === 500,
          "font-semibold": props.weight === 600,
          "font-bold": props.weight === 700,
          "font-extrabold": props.weight === 800,
          "font-black": props.weight === 900,

          "text-left": props.align === "left",
          "text-center": props.align === "center",
          "text-right": props.align === "right",
          "text-justify": props.align === "justify",

          italic: props.style === "italic",
          "not-italic": props.style === "normal",

          underline: props.decoration === "underline",
          "no-underline": props.decoration === "none",
        })}
      >
        {props.text || children}
      </Tag>
    );
  }
});

import { createComponent } from "@ubento/bento.core";
import clsx from "clsx";
import { z } from "zod";

export const headingPropsSchema = z.object({
  text: z.string(),
  level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).default("h1"),
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
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
});
export type HeadingProps = z.infer<typeof headingPropsSchema>;

export const Heading = createComponent({
  props: headingPropsSchema,
  summary: "Heading component",
  render: ({ props, ref, children }) => {
    const Tag = props.level;
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
        })}
      >
        {props.text || children}
      </Tag>
    );
  },
});

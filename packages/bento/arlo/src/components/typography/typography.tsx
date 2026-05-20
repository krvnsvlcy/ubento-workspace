import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { cx } from "../../lib/utils.js";

export const typographyPropsSchema = z.object({
  variant: z
    .enum([
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "blockquote",
      "table",
      "list",
      "inline-code",
      "lead",
      "large",
      "small",
      "muted",
    ])
    .default("p"),
  text: z.string().optional(),
  className: z.string().optional(),
});

export type TypographyProps = z.infer<typeof typographyPropsSchema>;

export const Typography = createComponent({
  props: typographyPropsSchema,
  summary: "Typography component for consistent text styling.",
  instructions: [
    "Use this component for all text elements to ensure consistent typography across the app.",
    "The `variant` prop determines the style and semantic HTML tag used.",
    "Available variants: h1, h2, h3, h4, p, blockquote, list, inline-code, lead, large, small, muted.",
  ].join("\n"),
  render: ({ props, ref, children }) => {
    const { variant, text, className } = props;

    let Tag: any = "p";
    if (["h1", "h2", "h3", "h4"].includes(variant)) {
      Tag = variant;
    } else if (variant === "blockquote") {
      Tag = "blockquote";
    } else if (variant === "table") {
      Tag = "div"; // Usually used as a wrapper or we can use "table"
    } else if (variant === "list") {
      Tag = "ul";
    } else if (variant === "inline-code") {
      Tag = "code";
    } else if (
      variant === "large" ||
      variant === "small" ||
      variant === "muted"
    ) {
      Tag = "span";
    }

    const baseStyles: Record<string, string> = {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl text-neutral-content",
      h2: "text-3xl font-semibold tracking-tight text-neutral-content",
      h3: "text-2xl font-semibold tracking-tight text-neutral-content",
      h4: "text-xl font-semibold tracking-tight text-neutral-content",
      p: "leading-7 text-neutral-content",
      blockquote:
        "mt-6 border-l-2 border-neutral-border pl-6 italic text-neutral-content",
      table:
        "my-6 w-full overflow-y-auto [&_table]:w-full [&_tr]:m-0 [&_tr]:border-t [&_tr]:border-neutral-border [&_tr:nth-child(2n)]:bg-neutral-surface [&_td]:border [&_td]:border-neutral-border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left [&_th]:border [&_th]:border-neutral-border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold",
      list: "my-6 ml-6 list-disc [&>li]:mt-2 text-neutral-content",
      "inline-code":
        "relative rounded bg-neutral-surface px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-neutral-content",
      lead: "text-xl text-neutral-content-muted",
      large: "text-lg font-semibold text-neutral-content",
      small: "text-sm font-medium leading-none text-neutral-content",
      muted: "text-sm text-neutral-content-muted",
    };

    return (
      <Tag ref={ref} className={cx(baseStyles[variant], className)}>
        {text || children}
      </Tag>
    );
  },
});

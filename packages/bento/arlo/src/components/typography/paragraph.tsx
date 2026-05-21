import { Text as CoreText } from "@ubento/bento.arlo-core";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { cx } from "../../lib/utils.js";

export const paragraphPropsSchema = z.object({
  text: z.string().optional(),
  size: z.enum(["sm", "md", "lg", "xl"]).default("md"),
  tone: z.enum(["default", "muted", "subtle"]).default("default"),
  weight: z.enum(["regular", "medium", "semibold"]).default("regular"),
  align: z.enum(["left", "center", "right"]).optional(),
  className: z.string().optional(),
});

export type ParagraphProps = z.infer<typeof paragraphPropsSchema>;

export const Paragraph = createComponent({
  props: paragraphPropsSchema,
  summary: "Paragraph component for multi-line block text content.",
  instructions: [
    "Use Paragraph for descriptions, body text, or any copy that spans multiple lines.",
  ].join("\n"),
  render: ({ props, ref, children }) => {
    const { text, size, tone, weight, align, className } = props;

    const alignClass = cx(
      align === "center" && "text-center",
      align === "right" && "text-right",
    );

    return (
      <CoreText
        ref={ref as any}
        as="p"
        size={size}
        tone={tone}
        weight={weight}
        className={cx(
          "whitespace-pre-wrap leading-relaxed",
          alignClass,
          className,
        )}
      >
        {text || children}
      </CoreText>
    );
  },
});

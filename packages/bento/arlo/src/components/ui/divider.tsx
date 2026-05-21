import { Divider as CoreDivider } from "@ubento/bento.arlo-core";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";

export const dividerPropsSchema = z.object({
  label: z.string().optional(),
  noMargin: z.boolean().default(false).optional(),
  className: z.string().optional(),
});

export type DividerProps = z.infer<typeof dividerPropsSchema>;

export const Divider = createComponent({
  props: dividerPropsSchema,
  summary:
    "A divider component to divide content, with an optional text label.",
  instructions: [
    "Use this component to visually divide content, optionally with a text label in the middle.",
    "The `label` prop specifies the text to display in the middle of the divider.",
    "The `noMargin` prop prevents the divider from having top and bottom margins.",
  ].join("\n"),
  render: ({ ref, props, children }) => {
    const { label, noMargin, className } = props;

    return (
      <CoreDivider ref={ref} className={className} noMargin={noMargin}>
        {label || children}
      </CoreDivider>
    );
  },
});

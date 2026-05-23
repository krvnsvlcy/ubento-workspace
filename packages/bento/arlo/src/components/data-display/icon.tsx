import { createComponent } from "@ubento/bento.core";
import { DynamicIcon } from "lucide-react/dynamic";
import { z } from "zod";

export const iconPropsSchema = z.object({
  name: z.string(),
  size: z.union([z.number(), z.string()]).optional(),
  color: z.string().optional(),
  strokeWidth: z.number().optional(),
  className: z.string().optional(),
});

export type IconProps = z.infer<typeof iconPropsSchema>;

export const Icon = createComponent({
  props: iconPropsSchema,
  summary: "A dynamic icon component using Lucide icons.",
  instructions: [
    "Use this component to render Lucide icons dynamically by name.",
    "The `name` prop accepts the Lucide icon name (e.g., 'camera').",
  ].join("\n"),

  render: ({ ref, props }) => {
    return (
      <DynamicIcon
        ref={ref as any}
        name={props.name as any}
        size={props.size}
        color={props.color}
        strokeWidth={props.strokeWidth}
        className={props.className}
      />
    );
  },
});

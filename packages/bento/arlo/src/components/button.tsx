import { type ComponentProps } from "@ubento/bento.runtime";
import { z } from "zod";
import {
  LayoutContextType,
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
} from "../lib/style";

export const buttonPropsSchema = layoutElementStyleSchema.extend({
  label: z.string().optional(),
  variant: z
    .enum(["primary", "secondary", "outline", "ghost"])
    .default("primary"),
  size: z.enum(["small", "medium", "large"]).default("medium"),
  disabled: z.boolean().optional(),
});
export type ButtonProps = z.infer<typeof buttonPropsSchema>;

function getButtonStyle(
  props: ButtonProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  return {
    ...getLayoutElementStyle(props, layoutContext),
    padding:
      props.size === "small"
        ? "4px 8px"
        : props.size === "large"
          ? "12px 24px"
          : "8px 16px",
    borderRadius: "6px",
    cursor: props.disabled ? "not-allowed" : "pointer",
    border: props.variant === "outline" ? "1px solid #ccc" : "none",
    background: props.variant === "primary" ? "#0070f3" : "transparent",
    color: props.variant === "primary" ? "white" : "inherit",
    opacity: props.disabled ? 0.5 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

export function Button({ ref, props, children }: ComponentProps<ButtonProps>) {
  const layoutContext = useLayoutContext();
  return (
    <button
      ref={ref}
      style={getButtonStyle(props, layoutContext)}
      disabled={props.disabled}
    >
      {props.label || children}
    </button>
  );
}

import { type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const avatarPropsSchema = layoutElementStyleSchema.extend({
  src: z.string().optional(),
  alt: z.string().optional(),
  fallback: z.string().optional(),
  size: z.number().default(40),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
});
export type AvatarProps = z.infer<typeof avatarPropsSchema>;

export function Avatar({ ref, props }: ComponentProps<AvatarProps>) {
  const layoutContext = useLayoutContext();
  const { intent, size, src, alt, fallback } = props;
  const [imageError, setImageError] = React.useState(false);
  const themePrefix = `--color-${intent}`;

  const containerStyle: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    width: `${size}px`,
    height: `${size}px`,
    minWidth: `${size}px`,
    minHeight: `${size}px`,
    borderRadius: "9999px",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: `var(${themePrefix}-surface)`,
    color: `var(${themePrefix}-content)`,
    fontSize: `${Math.max(10, size / 2.5)}px`,
    fontWeight: 500,
    border: `1px solid var(${themePrefix}-border)`,
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div ref={ref} style={containerStyle}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          style={imageStyle}
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{fallback || (alt ? alt.charAt(0).toUpperCase() : "?")}</span>
      )}
    </div>
  );
}

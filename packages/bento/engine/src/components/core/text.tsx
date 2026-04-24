import { coreComponent } from "./types";

export interface TextProps {
  text: string;
  size?: number;
  color?: string;
  font?: string;
  weight?: string | number;
  align?: "left" | "right" | "center" | "justify";
  lineHeight?: string | number;
  italic?: boolean;
  underline?: boolean;
}

export const text = coreComponent("text", (props: TextProps) => {
  return (
    <span
      style={{
        fontSize: props.size ? `${props.size}px` : undefined,
        color: props.color,
        fontFamily: props.font,
        fontWeight: props.weight,
        textAlign: props.align,
        lineHeight: props.lineHeight,
        fontStyle: props.italic ? "italic" : undefined,
        textDecoration: props.underline ? "underline" : undefined,
      }}
    >
      {props.text}
    </span>
  );
});

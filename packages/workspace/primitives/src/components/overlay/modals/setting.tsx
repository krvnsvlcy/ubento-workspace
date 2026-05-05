import { PropsWithChildren } from "react";

export function SettingModalContainer({
  children,
  aspect,
  style,
  ...props
}: PropsWithChildren<
  React.JSX.IntrinsicElements["div"] & {
    aspect?: "square" | "golden";
  }
>) {
  return (
    <div
      style={{
        width: 300,
        height:
          aspect === "square"
            ? 300
            : aspect === "golden"
            ? 300 * 1.618
            : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

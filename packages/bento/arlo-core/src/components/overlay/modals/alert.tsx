import { PropsWithChildren } from "react";

export function AlertModalContainer({
  children,
  flexibleHeight,
  style,
  ...props
}: PropsWithChildren<
  React.JSX.IntrinsicElements["div"] & {
    flexibleHeight?: boolean;
  }
>) {
  return (
    <div
      style={{
        width: 480,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

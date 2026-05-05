import { PropsWithChildren } from "react";

export function ReportModalContainer({
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
        width: 400,
        minHeight: 500,
        height: flexibleHeight ? undefined : 500,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

import { PropsWithChildren } from "react";

export function PageModalContainer({
  children,
  ...props
}: PropsWithChildren<React.JSX.IntrinsicElements["div"]>) {
  return (
    <div
      style={{ width: "90vw", maxWidth: 1200, height: "90vh", maxHeight: 800 }}
      {...props}
    >
      {children}
    </div>
  );
}

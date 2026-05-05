import { PropsWithChildren } from "react";

export function PageModalContainer({
  children,
  ...props
}: PropsWithChildren<React.JSX.IntrinsicElements["div"]>) {
  return (
    <div
      style={{ width: "90vw", maxWidth: 960, height: "90vh", maxHeight: 600 }}
      {...props}
    >
      {children}
    </div>
  );
}

import cx from "clsx";
import type { JSX } from "react";

export type IconBoxProps = {
  full?: boolean;
} & JSX.IntrinsicElements["div"];

export function IconBox({
  className,
  full,
  ...props
}: IconBoxProps): JSX.Element {
  return (
    <div
      className={cx(
        "flex items-center justify-center text-neutral-content",
        {
          "h-full w-full": full,
          "h-5 w-5": !full,
        },
        className,
      )}
      {...props}
    />
  );
}

export default IconBox;

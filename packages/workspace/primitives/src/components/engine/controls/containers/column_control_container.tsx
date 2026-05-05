import cx from "clsx";
import type { PropsWithChildren } from "react";
import React, { forwardRef } from "react";

export const ColumnControlContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    title?: string;
  }>
>(function ({ children, title }, ref) {
  const hasHeader = title;
  return (
    <div ref={ref} className={cx("text-sm")}>
      {hasHeader && (
        <div
          className="font-semibold text-ellipsis w-full h-5 flex items-center"
        >
          <div className="grow">
            {title}
          </div>
          {/* ActionBar removed due to missing dependencies */}
        </div>
      )}
      <div
        className={cx("space-y-2 empty:pt-0", {
          "pt-3": hasHeader,
        })}
      >
        {children}
      </div>
    </div>
  );
});

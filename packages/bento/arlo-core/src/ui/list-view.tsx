"use client";

import { cx } from "@/lib/utils.js";
import * as React from "react";
import { Virtuoso, VirtuosoProps } from "react-virtuoso";

interface ListViewProps<T> extends Partial<VirtuosoProps<T, any>> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export function ListView<T>({
  items,
  renderItem,
  className,
  itemClassName,
  ...props
}: ListViewProps<T>) {
  return (
    <Virtuoso
      data={items}
      itemContent={(index, item) => (
        <div className={cx(itemClassName)}>{renderItem(item, index)}</div>
      )}
      className={cx("w-full h-full", className)}
      {...props}
    />
  );
}

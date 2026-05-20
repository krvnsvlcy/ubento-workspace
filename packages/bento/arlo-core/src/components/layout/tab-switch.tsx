import cn from "clsx";
import * as React from "react";

export interface TabSwitchOption<T extends string = string> {
  key: T;
  label: React.ReactNode;
}

export interface TabSwitchProps<T extends string = string> {
  options: TabSwitchOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  optionClassName?: string;
}

export function TabSwitch<T extends string = string>({
  options,
  value,
  onChange,
  className,
  optionClassName,
}: TabSwitchProps<T>) {
  return (
    <div
      className={cn(
        "flex gap-1 p-1 rounded-2xl bg-neutral-surface w-fit",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.key}
          onClick={() => onChange(option.key)}
          className={cn(
            "px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
            value === option.key
              ? "bg-background shadow-sm text-neutral-content"
              : "text-neutral-content-muted hover:text-neutral-content",
            optionClassName,
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

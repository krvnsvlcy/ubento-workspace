import cx from "clsx";
import type { JSX, ReactNode } from "react";
import type { ControlProps } from "../../type.js";

export function SwitchControl<T>({
  value,
  onChange,
  settings,
}: ControlProps<
  T,
  {
    variant?: "full" | "icon";
    options?: Array<{
      label: ReactNode;
      value: T;
    }>;
  }
>): JSX.Element {
  const { options, variant } = settings ?? {};

  const _variant = variant ?? "full";

  return (
    <div
      className={cx("h-7 border", {})}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 2,
        borderRadius: 6,
        width: _variant === "full" ? "100%" : "fit-content",
      }}
    >
      {options?.map((option) => {
        return (
          <button
            key={`${option.value}`}
            onClick={() => onChange?.(option.value)}
            className={cx("transition-colors", {
              "border bg-main/20 border-border/30 hover:bg-main/30 text-contrast ":
                option.value === value,
              "text-content hover:bg-surface/80/50 hover:text-content":
                option.value !== value,
            })}
            style={{
              height: "100%",
              width: _variant === "icon" ? 28 : `${100 / options.length}%`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SwitchControl;

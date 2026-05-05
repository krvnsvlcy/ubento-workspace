import Popper from "@/components/overlay/popper/popper.js";
import { PopperMenu } from "@/components/overlay/popper/popper_menu.js";
import cx from "clsx";
import { ChevronRight, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import type { ControlProps } from "../../type.js";
import { isMixed } from "../../utils/mixed.js";
import { ControlButton } from "../button/button.js";

export type SelectControlOptions<T> = {
  icon?: ReactNode | string;
  label: ReactNode;
  disabled?: boolean;
  muted?: boolean;
} & (
  | {
      value: T;
    }
  | {
      action: () => void;
    }
);

export function SelectControl<T>({
  value,
  onChange,
  settings,
}: ControlProps<
  T,
  {
    options: SelectControlOptions<T>[];
    placeholder?: string;
    action?: {
      icon: string;
      label: string;
      handler: () => void;
    };
  }
>) {
  const ref = useRef<HTMLDivElement>(null);
  const { options } = settings ?? {
    options: [],
  };
  const [anchor, setAnchor] = useState<HTMLElement>();
  const [isHovered, setIsHovered] = useState(false);

  const option = options.find((o) => "value" in o && o.value === value);
  const isUnset = option === undefined;
  const isMixedValue = isMixed(value);
  const unsetLabel = settings?.placeholder ?? "unset";
  let label = option?.label;

  if (isUnset) {
    label = unsetLabel;
  } else if (isMixedValue) {
    label = "mixed";
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <ControlButton
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
        dimmed={isUnset || isMixedValue}
        label={label}
        prefix={
          option?.icon ? (
            typeof option.icon === "string" ? (
              <Settings className="size-4" />
            ) : (
              option.icon
            )
          ) : undefined
        }
        suffix={
          <ChevronRight
            className={cx("h-4 w-4", {
              "text-neutral-content": isUnset || isMixedValue || !isHovered,
            })}
            style={{
              transform: "rotate(90deg)",
              flexShrink: 0,
            }}
          />
        }
        action={settings?.action}
      />

      <Popper
        anchor={anchor}
        offset={4}
        align="stretch"
        exclusive
        onClose={() => setAnchor(undefined)}
        filled
        border
        shadow
      >
        <PopperMenu
          options={options.map((o) => ({
            icon: o.icon,
            label: o.label,
            disabled: o.disabled,
            dimmed: o.muted,
            onClick: () => {
              setAnchor(undefined);
              if ("action" in o) {
                o.action();
              } else {
                onChange?.(o.value);
              }
            },
          }))}
        />
      </Popper>
    </div>
  );
}

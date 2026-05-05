import type { ReactNode } from "react";
import React from "react";
import type { ControlProps } from "../../type.js";
import { ControlButton } from "../button/button.js";

export function MenuButtonControl<T>({
  settings,
}: ControlProps<
  T,
  {
    label?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
    dimmed?: boolean;
    align?: "start" | "center" | "end";
    accent?: any;
    action?: {
      icon: string;
      label: string;
      handler: () => void;
    };
  }
>) {
  return (
    <ControlButton
      prefix={settings?.prefix}
      suffix={settings?.suffix}
      dimmed={settings?.dimmed}
      align={settings?.align}
      onClick={() => {
        // Menu support removed
      }}
      label={settings?.label}
      accent={settings?.accent}
      action={settings?.action}
    />
  );
}

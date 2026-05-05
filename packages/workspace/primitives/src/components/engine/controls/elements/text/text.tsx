import type { FocusEventHandler, ReactNode } from "react";
import type { ControlProps } from "../../type.js";
import { useTextFieldControl } from "./_hook.js";
import { RawTextFieldControl } from "./raw.js";

export function TextControl({
  value,
  onChange,
  settings,
}: ControlProps<
  string,
  {
    suffix?: ReactNode;
    prefix?: ReactNode;
    textPrefix?: ReactNode;
    autofocus?: boolean;
    onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    placeholder?: string;
    stateful?: boolean;
  }
>) {
  const {
    inputValue,
    isMixed,
    isUndefined,
    handleChange,
    handleFocus,
    handleBlur,
  } = useTextFieldControl({
    value: value,
    onChange,
    stateful: settings?.stateful,
  });

  return (
    <RawTextFieldControl
      value={inputValue}
      isMixed={isMixed}
      isUndefined={isUndefined}
      onChange={handleChange}
      onFocus={(e) => {
        handleFocus(e);
        settings?.onFocus?.(e);
      }}
      onBlur={(e) => {
        handleBlur(e);
        settings?.onBlur?.(e);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
      }}
      autofocus={settings?.autofocus}
      placeholder={settings?.placeholder}
      suffix={settings?.suffix}
      prefix={settings?.prefix}
      textPrefix={settings?.textPrefix}
    />
  );
}

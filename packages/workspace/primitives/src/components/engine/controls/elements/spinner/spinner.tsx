import type { ReactNode } from "react";
import type { ControlProps } from "../../type.js";
import { StatelessSpinnerControl } from "./stateless_spinner.js";
import { useSpinnerControl } from "./use_spinner.js";

export function SpinnerControl({
  value,
  onChange,
  settings,
}: ControlProps<
  number,
  {
    suffix?: ReactNode;
    step?: number;
    min?: number;
    max?: number;
    round?: number;
    showIncrementors?: boolean;
    autoFocus?: boolean;
    onEnter?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    stateful?: boolean;
    prefix?: ReactNode;
  }
>) {
  const {
    inputValue,
    isMixed,
    isUndefined,
    handleChange,
    handleFocus,
    handleBlur,
    increment,
    decrement,
    startLongIncrement,
    startLongDecrement,
  } = useSpinnerControl({
    value: value,
    onChange,
    step: settings?.step,
    min: settings?.min,
    max: settings?.max,
    round: settings?.round,
    stateful: settings?.stateful,
  });

  return (
    <StatelessSpinnerControl
      value={inputValue}
      isMixed={isMixed}
      isUndefined={isUndefined}
      onChange={handleChange}
      onFocus={() => {
        handleFocus();
        settings?.onFocus?.();
      }}
      onBlur={() => {
        handleBlur();
        settings?.onBlur?.();
      }}
      onEnter={settings?.onEnter}
      suffix={settings?.suffix}
      prefix={settings?.prefix}
      increment={increment}
      decrement={decrement}
      startLongIncrement={startLongIncrement}
      startLongDecrement={startLongDecrement}
      step={settings?.step}
      min={settings?.min}
      max={settings?.max}
      showIncrementors={settings?.showIncrementors}
      autoFocus={settings?.autoFocus}
    />
  );
}

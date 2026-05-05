import _Slider from "rc-slider";
import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import type { ControlProps } from "../../type.js";
import { mixed } from "../../utils/mixed.js";
import { SpinnerControl } from "../spinner/spinner.js";

const Slider = _Slider as unknown as (props: {
  min?: number;
  max?: number;
  step?: number;
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  onChangeComplete?: (value: number | number[]) => void;
  onBeforeChange?: (value: number | number[]) => void;
  className?: string;
}) => React.JSX.Element;

export function SliderControl({
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
    scale?: number;
    stateful?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    onEnter?: () => void;
  }
>) {
  const scale = settings?.scale || 1;
  const min = settings?.min !== undefined ? settings?.min * scale : undefined;
  const max = settings?.max !== undefined ? settings?.max * scale : undefined;
  const step =
    settings?.step !== undefined ? settings?.step * scale : undefined;

  const [sliderValue, setSliderValue] = useState<number>(
    (value === mixed ? 0 : value || 0) * scale
  );
  const [isDragging, setIsDragging] = useState(false);

  // Update internal slider value when external value changes and not dragging
  useEffect(() => {
    if (!isDragging) {
      setSliderValue((value === mixed ? 0 : value || 0) * scale);
    }
  }, [value, scale, isDragging]);

  return (
    <div className="h-7 w-full flex items-center gap-2 pr-1.5">
      <div
        style={{
          width: 54,
          flexShrink: 0,
        }}
      >
        <SpinnerControl
          value={value === mixed ? 0 : value || 0 * scale}
          onChange={(value) => {
            onChange?.((value as number) / scale);
          }}
          settings={{
            min,
            max,
            step,
            suffix: settings?.suffix,
            round: settings?.round,
            stateful: settings?.stateful,
            onBlur: settings?.onBlur,
            onFocus: settings?.onFocus,
            onEnter: settings?.onEnter,
          }}
        />
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        className="elll-slider"
        value={sliderValue}
        onChange={(value) => {
          const numValue = value as number;
          setSliderValue(numValue);
          if (!settings?.stateful) {
            onChange?.(numValue / scale);
          }
        }}
        onChangeComplete={(value) => {
          setIsDragging(false);
          if (settings?.stateful) {
            onChange?.((value as number) / scale);
          }
        }}
        onBeforeChange={() => {
          setIsDragging(true);
        }}
      />
    </div>
  );
}

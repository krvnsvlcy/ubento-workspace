import Popper from "@/components/overlay/popper/popper.js";
import { PopperMenu } from "@/components/overlay/popper/popper_menu.js";
import { useRef, useState } from "react";
import type { ControlProps } from "../../type.js";
import { ControlButton } from "../button/button.js";
import { StatelessSpinnerControl } from "../spinner/stateless_spinner.js";
import { useSpinnerControl } from "../spinner/use_spinner.js";
import { isMixed, mixed } from "../../utils/mixed.js";
export type DimensionData<U extends string> = {
  value: number;
  unit: U;
};

export type DimensionControlProps<U extends string = string> = ControlProps<
  DimensionData<U> | number | string,
  {
    units?: {
      label: string;
      unit: U;
      step?: number;
      min?: number;
      max?: number;
    }[];
    keywords?: { label: string; value: U }[];
    defaultUnit?: U;
  }
>;

export function DimensionControl<U extends string>({
  value,
  onChange,
  settings,
}: DimensionControlProps<U>) {
  const {
    units,
    defaultUnit,
    keywords = [],
  } = settings ?? {
    units: [] as {
      label: string;
      unit: U;
      step?: number;
      min?: number;
      max?: number;
    }[],
  };
  const ref = useRef<HTMLDivElement>(null);

  let numberValue: number | undefined;
  let unit: U | undefined;

  if (isMixed(value)) {
    return <StatelessSpinnerControl value={undefined} isMixed={true} />;
  } else if (typeof value === "number") {
    numberValue = value;
    unit = defaultUnit;
  } else if (typeof value === "string") {
    unit = defaultUnit as U;
  } else if (value && typeof value === "object") {
    numberValue = value.value;
    unit = value.unit ?? defaultUnit;
  }

  const {
    inputValue,
    isMixed: spinnerIsMixed,
    isUndefined,
    handleChange,
    handleFocus,
    handleBlur,
    increment,
    decrement,
    startLongDecrement,
    startLongIncrement,
  } = useSpinnerControl({
    value: numberValue,
    onChange: (value: number | undefined) => {
      if (value === undefined) {
        onChange?.(undefined);
      } else if (unit) {
        onChange?.({
          value,
          unit,
        });
      }
    },
  });

  const isKeyWord = typeof value === "string";
  const keywordData = isKeyWord
    ? keywords.find((keyword) => keyword.value === value)
    : undefined;

  const unitDatum = units?.find((datum) => datum.unit === unit);

  const [showUnits, setShowUnits] = useState(false);

  return (
    <div ref={ref} className="w-full">
      {keywordData ? (
        <ControlButton
          onClick={() => {
            setShowUnits(true);
          }}
          label={keywordData.label}
        />
      ) : (
        <StatelessSpinnerControl
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isMixed={spinnerIsMixed}
          isUndefined={isUndefined}
          increment={increment}
          decrement={decrement}
          startLongDecrement={startLongDecrement}
          startLongIncrement={startLongIncrement}
          min={unitDatum?.min}
          max={unitDatum?.max}
          step={unitDatum?.step}
          suffix={
            <div
              className="hover:text-content"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setShowUnits(true);
              }}
            >
              {unitDatum?.unit}
            </div>
          }
        />
      )}
      <Popper
        anchor={showUnits ? (ref.current ?? undefined) : undefined}
        align="center"
        offset={4}
        exclusive
        filled
        border
        onClose={() => setShowUnits(false)}
      >
        <PopperMenu
          options={[
            [
              ...(units?.map((unitDatum) => ({
                label: (
                  <div className="flex gap-3">
                    <span className="grow">{unitDatum.label}</span>
                    <span className="text-content-subtle">
                      {" "}
                      {unitDatum.unit}
                    </span>
                  </div>
                ),
                onClick: () => {
                  setShowUnits(false);
                  let value = Number(inputValue);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  onChange?.({
                    value,
                    unit: unitDatum.unit as any,
                  });
                },
              })) || []),

              ...keywords.map((keyword) => ({
                label: keyword.label,
                onClick: () => {
                  setShowUnits(false);
                  onChange?.(keyword.value);
                },
              })),
            ],
          ]}
        />
      </Popper>
    </div>
  );
}

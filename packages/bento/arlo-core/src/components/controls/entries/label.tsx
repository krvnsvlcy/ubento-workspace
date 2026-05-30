import cx from "clsx";
import { useRef, useState } from "react";
import Popper from "@/components/overlay/popper/popper.js";

export function EditableControlLabel({
  value,
  onChange,
  placeholder,
  autoFocus,
  validate,
}: {
  value: string;
  onChange: (value: string) => {
    value: string;
    error: string | null;
  };
  placeholder?: string;
  autoFocus?: boolean;
  validate?: (value: string) => string | null;
}) {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        className={cx("w-full rounded-md h-7 focus:px-2", {
          "text-red focus:bg-red/10": error,
          "hover:text-content focus:text-content focus:bg-fg/5": !error,
        })}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setError(validate?.(e.target.value) || null);
        }}
        onBlur={() => {
          const result = onChange(inputValue);
          setError(result.error);
          setInputValue(result.value);
        }}
        autoFocus={autoFocus}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
      />
      {error && (
        <Popper
          anchor={inputRef.current || undefined}
          position="bottom"
          align="center"
          offset={4}
          shadow
          filled
        >
          <div className="text-red bg-red/10 text-xs py-1 px-2">
            {error}
          </div>
        </Popper>
      )}
    </>
  );
}

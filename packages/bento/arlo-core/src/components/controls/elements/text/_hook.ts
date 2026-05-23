import type { ChangeEventHandler, FocusEventHandler } from "react";
import { useCallback, useEffect, useState } from "react";
import type { MixedType } from "../../utils/mixed.js";
import { mixed } from "../../utils/mixed.js";

export function useTextFieldControl({
  value,
  onChange,
  stateful,
}: {
  value?: string | MixedType;
  onChange?: (value: string) => void;
  stateful?: boolean;
}) {
  const [inputValue, setInputValue] = useState<string>(
    value === mixed ? "" : (value ?? ""),
  );
  const [isFocused, setIsFocused] = useState(false);

  // handle value change
  useEffect(() => {
    if (isFocused && !stateful) {
      onChange?.(inputValue);
    }
  }, [inputValue, stateful]);

  // restore value when not focused
  useEffect(() => {
    if (!isFocused) {
      setInputValue(value === mixed ? "" : ((value ?? "") as any));
    }
  }, [isFocused, value]);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((event) => {
    const value = (
      event.currentTarget as HTMLInputElement | HTMLTextAreaElement
    ).value;
    setInputValue(value);
  }, []);
  const handleFocus: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> =
    useCallback(() => {
      setIsFocused(true);
    }, []);
  const handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> =
    useCallback(() => {
      setIsFocused(false);
      if (stateful) {
        onChange?.(inputValue);
      }
    }, [inputValue]);

  return {
    inputValue,
    isFocused,
    isMixed: value === mixed,
    isUndefined: value === undefined,
    handleChange,
    handleFocus,
    handleBlur,
  };
}

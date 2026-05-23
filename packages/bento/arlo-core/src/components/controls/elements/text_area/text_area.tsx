import TextArea from "react-textarea-autosize";
import type { ControlProps } from "../../type.js";
import { useTextFieldControl } from "../text/_hook.js";

export function TextAreaControl({
  value,
  onChange,
  settings,
}: ControlProps<
  string,
  {
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
    onBlur?: () => void;
    onFocus?: () => void;
    onEnter?: () => void;
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
    <TextArea
      className="border rounded-md w-full"
      style={{
        width: "100%",
        outline: "none",
        resize: "none",
        background: "transparent",
        padding: "5px 8px",
        display: "block",
      }}
      value={inputValue}
      placeholder={
        isMixed
          ? "mixed"
          : isUndefined
          ? settings?.placeholder || "unset"
          : settings?.placeholder || ""
      }
      onChange={handleChange}
      onFocus={(e) => {
        handleFocus(e);
        settings?.onFocus?.();
      }}
      onBlur={(e) => {
        handleBlur(e);
        settings?.onBlur?.();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          e.currentTarget.blur();
          settings?.onEnter?.();
        }
      }}
      minRows={settings?.minRows}
      maxRows={settings?.maxRows}
    />
  );
}

import type { ChangeEventHandler, FocusEventHandler, ReactNode } from "react";

export function RawTextFieldControl({
  value,
  isMixed,
  isUndefined,
  onChange,
  onFocus,
  onBlur,
  suffix,
  onKeyDown,
  placeholder,
  autofocus,
  prefix,
  textPrefix,
}: {
  value?: string | number;
  isMixed?: boolean;
  isUndefined?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  suffix?: ReactNode;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  autofocus?: boolean;
  prefix?: ReactNode;
  textPrefix?: ReactNode;
}) {
  return (
    <>
      <div
        className="border h-7 rounded-md w-full"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          gap: 5,
          paddingLeft: prefix ? 4 : 8,
        }}
      >
        {prefix ? (
          <div
            className="h-5 w-5"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {prefix}
          </div>
        ) : (
          <></>
        )}

        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          {textPrefix}

          <input
            className="w-full"
            style={{
              width: "100%",
              outline: "none",
            }}
            value={value}
            placeholder={isMixed ? "mixed" : placeholder || "unset"}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            autoFocus={autofocus}
          />
        </div>

        {suffix ? (
          <div
            className="text-neutral-content-subtle"
            style={{
              flexShrink: 0,
            }}
          >
            {suffix}
          </div>
        ) : null}
      </div>
    </>
  );
}

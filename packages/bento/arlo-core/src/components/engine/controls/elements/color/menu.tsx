import { useEffect, useState } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import tinycolor from "tinycolor2";
import { FullControlEntry } from "../../entries/full_control_entry.js";
import type { ColorData } from "./types.js";
import { colorDataFromRgb, colorDataToRgb } from "./utils.js";

export function ColorControlMenu({
  value,
  onChange,
}: {
  value?: ColorData;
  onChange?: (color: ColorData) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [color, setColor] = useState(
    tinycolor(value ? colorDataToRgb(value) : undefined).toHex8String()
  );

  useEffect(() => {
    if (!isFocused) {
      setColor(
        tinycolor(value ? colorDataToRgb(value) : undefined).toHex8String()
      );
    }
  }, [value]);

  return (
    <div
      className="color_picker space-y-4 p-3"
      onMouseDown={() => {
        setIsFocused(true);
        window.addEventListener("mouseup", () => setIsFocused(false));
      }}
    >
      <HexAlphaColorPicker
        color={color}
        onChange={(value) => {
          setColor(value);
          onChange?.(colorDataFromRgb(tinycolor(value).toRgb()));
        }}
      />

      <FullControlEntry label="Hex">
        <HexColorInput
          className="h-7 px-2 border rounded-md"
          style={{
            width: "100%",
            outline: "none",
            textTransform: "uppercase",
          }}
          color={color}
          onChange={(value) => {
            setColor(value);
            onChange?.(colorDataFromRgb(tinycolor(value).toRgb()));
          }}
          prefixed
          alpha
        />
      </FullControlEntry>
    </div>
  );
}

import { useRef, useState } from "react";
import { HexColorInput } from "react-colorful";
import tinycolor from "tinycolor2";
import Popper from "@/components/overlay/popper/popper.js";
import type { ControlProps } from "../../type.js";
import { RawSpinnerControl } from "../spinner/raw_spinner.js";
import { ColorControlMenu } from "./menu.js";
import type { ColorData } from "./types.js";
import { colorDataFromRgb, colorDataToRgb } from "./utils.js";

const checker = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    style={{
      height: "100%",
      width: "100%",
      opacity: 0.05,
    }}
  >
    <defs>
      <pattern
        id="checker-pattern"
        patternUnits="userSpaceOnUse"
        width="12"
        height="12"
      >
        <rect width="6" height="6" fill="currentColor" />
        <rect x="6" y="6" width="6" height="6" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="18" height="18" fill="url(#checker-pattern)" />
  </svg>
);

export function ColorControl({
  value,
  onChange,
  settings,
}: ControlProps<
  ColorData | undefined,
  {
    ref?: React.RefObject<HTMLDivElement>;
    onClick?: (e: React.MouseEvent) => void;
  }
>) {
  const color =
    typeof value === "object"
      ? tinycolor(colorDataToRgb(value))
      : tinycolor("transparent");
  const alpha = color.getAlpha() * 100;

  return (
    <div className="flex gap-1" ref={settings?.ref}>
      <div className="flex h-7 border rounded-md items-center gap-1">
        <button
          style={{
            height: "100%",
            aspectRatio: "1/1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={settings?.onClick}
        >
          <div
            className="rounded outline outline-1 outline-border/10 -outline-offset-1"
            style={{
              height: 18,
              width: 18,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {checker}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: color.toHex8String(),
              }}
            />
          </div>
        </button>
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <HexColorInput
            className="h-full w-full"
            style={{
              width: "100%",
              outline: "none",
              textTransform: "uppercase",
            }}
            color={color.toHex()}
            onChange={(value) => {
              const newColor = tinycolor(value).toRgb();
              onChange?.(colorDataFromRgb(newColor));
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="px-1 opacity-50 hover:opacity-100">
          <RawSpinnerControl
            value={Math.round(alpha)}
            onChange={(value) => {
              const nValue = Number(value);
              if (!isNaN(nValue)) {
                const newColor = tinycolor(color)
                  .setAlpha(nValue / 100)
                  .toRgb();
                onChange?.(colorDataFromRgb(newColor));
              }
            }}
            min={0}
            max={100}
            suffix={
              <span
                style={{
                  paddingLeft: 2,
                }}
              >
                %
              </span>
            }
            minContent
            align="right"
          />
        </div>
      </div>
    </div>
  );
}

export function ColorControlWithPopperMenu({
  value,
  onChange,
}: ControlProps<
  ColorData | undefined,
  {
    title?: string;
  }
>) {
  const ref = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ColorControl
        value={value}
        onChange={onChange}
        settings={{
          ref: ref as any,
          onClick: () => {
            setMenuOpen(true);
          },
        }}
      />

      <Popper
        filled
        border
        shadow
        exclusive
        anchor={menuOpen ? ref.current || undefined : undefined}
        onClose={() => {
          setMenuOpen(false);
        }}
        position="bottom"
        offset={4}
        align="center"
      >
        <ColorControlMenu
          value={typeof value === "object" ? value : undefined}
          onChange={onChange}
        />
      </Popper>
    </>
  );
}

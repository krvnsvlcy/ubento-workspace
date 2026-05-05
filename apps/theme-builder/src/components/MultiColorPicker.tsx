import { Button, Input } from "@ubento/workspace.primitives";
import { converter, formatHex, parse } from "culori";
import { Copy } from "lucide-react";
import { useMemo, useState } from "react";

const toRgb = converter("rgb");
const toHsl = converter("hsl");
const toOklch = converter("oklch");
const toHsv = converter("hsv");

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const MODES = ["OKLCH", "HSL", "HSV", "RGB"] as const;
type Mode = (typeof MODES)[number];

// Simplified ranges for sliders
const RANGES = {
  OKLCH: [
    { label: "L", min: 0, max: 1, step: 0.01 },
    { label: "C", min: 0, max: 0.4, step: 0.001 },
    { label: "H", min: 0, max: 360, step: 1 },
  ],
  HSL: [
    { label: "H", min: 0, max: 360, step: 1 },
    { label: "S", min: 0, max: 100, step: 1 }, // in UI we show 0-100 but culori uses 0-1
    { label: "L", min: 0, max: 100, step: 1 },
  ],
  HSV: [
    { label: "H", min: 0, max: 360, step: 1 },
    { label: "S", min: 0, max: 100, step: 1 },
    { label: "V", min: 0, max: 100, step: 1 },
  ],
  RGB: [
    { label: "R", min: 0, max: 255, step: 1 }, // culori rgb uses 0-1
    { label: "G", min: 0, max: 255, step: 1 },
    { label: "B", min: 0, max: 255, step: 1 },
  ],
};

export function MultiColorPicker({ value, onChange }: ColorPickerProps) {
  const [activeMode, setActiveMode] = useState<Mode>("RGB");

  // Safe parse color
  const parsed = useMemo(
    () => parse(value) || { mode: "rgb" as const, r: 0, g: 0, b: 0 },
    [value],
  );
  const hexValue = formatHex(parsed) || "#000000";

  const handleCopy = () => {
    navigator.clipboard.writeText(hexValue);
  };

  const getChannelValues = (mode: Mode) => {
    switch (mode) {
      case "OKLCH": {
        const c = toOklch(parsed as any) as any;
        return [c.l || 0, c.c || 0, c.h || 0];
      }
      case "HSL": {
        const c = toHsl(parsed as any) as any;
        return [c.h || 0, (c.s || 0) * 100, (c.l || 0) * 100];
      }
      case "HSV": {
        const c = toHsv(parsed as any) as any;
        return [c.h || 0, (c.s || 0) * 100, (c.v || 0) * 100];
      }
      case "RGB": {
        const c = toRgb(parsed as any) as any;
        return [(c.r || 0) * 255, (c.g || 0) * 255, (c.b || 0) * 255];
      }
    }
  };

  const setChannelValue = (mode: Mode, index: number, newVal: number) => {
    let colorObj: any;
    if (mode === "OKLCH") {
      const c = toOklch(parsed as any) as any;
      const arr = [c.l || 0, c.c || 0, c.h || 0];
      arr[index] = newVal;
      colorObj = { mode: "oklch", l: arr[0], c: arr[1], h: arr[2] };
    } else if (mode === "HSL") {
      const c = toHsl(parsed as any) as any;
      const arr = [c.h || 0, c.s || 0, c.l || 0];
      arr[index] = index === 0 ? newVal : newVal / 100;
      colorObj = { mode: "hsl", h: arr[0], s: arr[1], l: arr[2] };
    } else if (mode === "HSV") {
      const c = toHsv(parsed as any) as any;
      const arr = [c.h || 0, c.s || 0, c.v || 0];
      arr[index] = index === 0 ? newVal : newVal / 100;
      colorObj = { mode: "hsv", h: arr[0], s: arr[1], v: arr[2] };
    } else if (mode === "RGB") {
      const c = toRgb(parsed as any) as any;
      const arr = [c.r || 0, c.g || 0, c.b || 0];
      arr[index] = newVal / 255;
      colorObj = { mode: "rgb", r: arr[0], g: arr[1], b: arr[2] };
    }

    onChange(formatHex(colorObj) || "#000000");
  };

  const renderSliders = (mode: Mode) => {
    const vals = getChannelValues(mode);
    const ranges = RANGES[mode];

    return ranges.map((range, i) => (
      <div key={range.label} className="flex items-center gap-2 text-sm">
        <span className="w-4 text-dark-400 font-medium">{range.label}</span>
        <input
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={vals[i]}
          onChange={(e) => setChannelValue(mode, i, parseFloat(e.target.value))}
          className="flex-1 h-2 bg-dark-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
        />
        <span className="w-10 text-right font-mono text-xs text-dark-500">
          {Number.isInteger(vals[i]) ? vals[i] : vals[i].toFixed(2)}
        </span>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-dark-100 rounded-xl border border-dark-200 shadow-xl w-50">
      {/* Top Preview & Hex */}
      <div className="flex gap-3">
        <div
          className="w-16 h-16 rounded-lg shadow-inner ring-1 ring-black/10"
          style={{ backgroundColor: hexValue }}
        />
        <div className="flex flex-col justify-end flex-1 gap-2">
          <div className="flex items-center gap-1">
            <Input
              value={hexValue}
              onChange={(e) => onChange(e.target.value)}
              className="h-8 font-mono text-sm uppercase flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleCopy}
            >
              <Copy size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Modes Toggle */}
      <div className="flex bg-dark-100/50 dark:bg-dark-200/50 p-1 rounded-lg gap-1">
        {MODES.map((m) => (
          <button
            key={m}
            className={`flex-1 py-1 text-xs font-semibold rounded transition-colors ${
              activeMode === m
                ? "bg-white dark:bg-dark-300 text-primary-500 shadow-sm"
                : "text-dark-400 hover:text-foreground"
            }`}
            onClick={() => setActiveMode(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-3">{renderSliders(activeMode)}</div>
    </div>
  );
}

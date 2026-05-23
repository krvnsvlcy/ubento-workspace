import tinycolor from "tinycolor2";
import type { ColorData } from "./types.js";

export function colorDataFromRgb(rgb: tinycolor.ColorFormats.RGBA): ColorData {
  return {
    model: "rgb",
    value: [rgb.r, rgb.g, rgb.b],
    alpha: rgb.a,
  };
}
export function colorDataToRgb(color: ColorData): tinycolor.ColorFormats.RGBA {
  if (color.model === "rgb") {
    return {
      r: color.value[0],
      g: color.value[1],
      b: color.value[2],
      a: color.alpha ?? 1,
    };
  } else {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    };
  }
}

export function colorDataToHex(color: ColorData): string {
  return tinycolor(colorDataToRgb(color)).toHex();
}
export function colorDataFromHex(hex: string): ColorData {
  return colorDataFromRgb(tinycolor(hex).toRgb());
}
export function colorDataToHex8(color: ColorData): string {
  return tinycolor(colorDataToRgb(color)).toHex8();
}
export function colorDataFromHex8(hex: string): ColorData {
  return colorDataFromRgb(tinycolor(hex).toRgb());
}

export type ColorData = {
  value: number[];
  model: "rgb" | "hsl" | "hwb" | "lab" | "lch" | "oklab" | "oklch";
  alpha?: number;
};

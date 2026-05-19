import type React from "react";
import { ColorControl } from "./elements/color/color.js";
import { DateTimeControl } from "./elements/datetime/datetime.js";
import { DimensionControl } from "./elements/dimension/dimension.js";
import { SelectControl } from "./elements/select/select.js";
import { SliderControl } from "./elements/slider/slider.js";
import { SpinnerControl } from "./elements/spinner/spinner.js";
import SwitchControl from "./elements/switch/switch.js";
import { TextControl } from "./elements/text/text.js";
import { TextAreaControl } from "./elements/text_area/text_area.js";
import type { ControlProps } from "./type.js";

export type ControlMap<C extends string> = Record<
  C,
  React.ComponentType<ControlProps>
>;

export type ResolvedControlProps<
  M extends ControlMap<string>,
  T extends keyof M,
> = React.ComponentProps<M[T]>;

export const baseControlTypes = {
  Dimension: "dimension",
  DateTime: "datetime",
  Color: "color",
  Select: "select",
  Spinner: "spinner",
  Switch: "switch",
  Text: "text",
  TextArea: "textarea",
  Slider: "slider",
} as const;

export type BaseControlType =
  (typeof baseControlTypes)[keyof typeof baseControlTypes];

export const baseControlMap = {
  [baseControlTypes.Color]: ColorControl,
  [baseControlTypes.DateTime]: DateTimeControl,
  [baseControlTypes.Dimension]: DimensionControl as any,
  [baseControlTypes.Select]: SelectControl as any,
  [baseControlTypes.Spinner]: SpinnerControl,
  [baseControlTypes.Switch]: SwitchControl,
  [baseControlTypes.Text]: TextControl,
  [baseControlTypes.TextArea]: TextAreaControl,
  [baseControlTypes.Slider]: SliderControl,
} satisfies ControlMap<BaseControlType>;

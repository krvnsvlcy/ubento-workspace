import type { MixedType } from "./utils/mixed.js";

export type ControlProps<T = any, S extends object = any> = {
  value?: T | MixedType | undefined;
  onChange?: (value: T | undefined) => void;
  settings?: S;
};

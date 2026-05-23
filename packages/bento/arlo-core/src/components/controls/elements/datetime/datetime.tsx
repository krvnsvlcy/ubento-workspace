import type { ControlProps } from "../../type.js";
import { mixed } from "../../utils/mixed.js";
import { MenuButtonControl } from "../menu_button/menu_button.js";

export function DateTimeControl({
  value,
  onChange,
}: ControlProps<
  Date | undefined,
  {
    title?: string;
  }
>) {
  const text = value === (mixed as any) ? "mixed" : value?.toLocaleString();

  return (
    <MenuButtonControl
      value={value}
      onChange={onChange}
      settings={{
        label: text,
      }}
    />
  );
}

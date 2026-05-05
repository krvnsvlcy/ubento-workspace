import type { PopperMenuOptionProps } from "./popper_menu_option.js";
import { PopperMenuOption } from "./popper_menu_option.js";

export function PopperMenu({ options }: { options: PopperMenuOptionProps[] }) {
  return (
    <div className="p-1 w-full space-y-1">
      {options.map((option, index) => (
        <PopperMenuOption key={index} {...option} />
      ))}
    </div>
  );
}

import React from "react";
import type { PopperMenuOptionProps } from "./popper_menu_option.js";
import { PopperMenuOption } from "./popper_menu_option.js";

export function PopperMenu({
  options,
}: {
  options: PopperMenuOptionProps[][];
}) {
  return (
    <div className="p-2 w-full flex flex-col gap-2">
      {options.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {groupIndex > 0 && <hr />}
          <div className="flex flex-col gap-1">
            {group.map((option, index) => (
              <PopperMenuOption key={index} {...option} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// typography [heading, body]
// color [base, accent]

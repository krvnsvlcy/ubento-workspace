import { cx } from "@/lib/utils.js";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Divider as CoreDivider } from "@ubento/bento.arlo-core";

export const Separator = createComponent({
  props: z.object({
    orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
    thickness: z.number().default(1),
  }),

  summary: "A separator component to divide content.",
  instructions: [
    "Use this component to visually separate content.",
    "The `orientation` prop controls whether it is horizontal or vertical.",
    "The `thickness` prop controls the thickness of the line.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    const isHorizontal = props.orientation === "horizontal";

    return (
      <CoreDivider
        ref={ref}
        className={cx(
          isHorizontal ? "w-full" : "!h-full !w-[1px] !flex-col !my-0 !mx-0",
        )}
        style={{
          height: isHorizontal ? `${props.thickness}px` : "100%",
          width: !isHorizontal ? `${props.thickness}px` : "100%",
        }}
      >
        {isHorizontal ? children : null}
      </CoreDivider>
    );
  },
});

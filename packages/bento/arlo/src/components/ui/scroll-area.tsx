import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { ScrollArea as CoreScrollArea } from "@ubento/bento.arlo-core";

export const ScrollArea = createComponent({
  props: z.object({
    className: z.string().optional(),
  }),

  summary: "A scroll area component with custom scrollbars.",
  instructions: [
    "Use this component to provide custom scrollbars for content that exceeds the container size.",
    "Pass children to render inside the scroll area.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreScrollArea ref={ref} className={props.className}>
        {children}
      </CoreScrollArea>
    );
  },
});

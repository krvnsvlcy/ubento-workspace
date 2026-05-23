import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { ScrollArea as CoreScrollArea } from "@ubento/bento.arlo-core";
import {
  getResizableElementStyle,
  resizableElementStyleSchema,
  useLayoutContext,
} from "../../lib/style/style.js";

export const scrollAreaPropsSchema = resizableElementStyleSchema.extend({
  className: z.string().optional(),
});

export const ScrollArea = createComponent({
  props: scrollAreaPropsSchema,

  summary: "A scroll area component with custom scrollbars.",
  instructions: [
    "Use this component to provide custom scrollbars for content that exceeds the container size.",
    "Pass children to render inside the scroll area.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    const parentLayoutContext = useLayoutContext();
    return (
      <CoreScrollArea
        ref={ref}
        className={props.className}
        style={getResizableElementStyle(props, parentLayoutContext)}
      >
        {children}
      </CoreScrollArea>
    );
  },
});

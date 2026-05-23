import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup as CoreResizablePanelGroup,
} from "@ubento/bento.arlo-core";
import * as React from "react";
import {
  getResizableElementStyle,
  LayoutContext,
  resizableElementStyleSchema,
  useLayoutContext,
} from "../../lib/style/style.js";

export const resizablePropsSchema = resizableElementStyleSchema.extend({
  direction: z.enum(["horizontal", "vertical"]).default("horizontal"),
  panels: z
    .array(
      z.object({
        defaultSize: z.number().optional(),
        minSize: z.number().optional(),
        maxSize: z.number().optional(),
        content: z.any(),
      }),
    )
    .default([]),
});

export const Resizable = createComponent({
  props: resizablePropsSchema,

  summary: "A resizable panel group component.",
  instructions: [
    "Use this component to create layouts with resizable panels.",
    "The `direction` prop controls whether panels are arranged horizontally or vertically.",
    "Provide a `panels` array with configuration and content for each panel.",
  ].join("\n"),

  render: ({ ref, props }) => {
    const CoreGroup = CoreResizablePanelGroup as any;
    const parentLayoutContext = useLayoutContext();
    const layoutContextValue = props.direction === "horizontal" ? "row" : "column";

    return (
      <CoreGroup
        ref={ref}
        direction={props.direction}
        className="min-h-[200px] w-full rounded-lg border"
        style={getResizableElementStyle(props, parentLayoutContext)}
      >
        {props.panels.map((panel, index) => (
          <React.Fragment key={index}>
            <ResizablePanel
              defaultSize={panel.defaultSize}
              minSize={panel.minSize}
              maxSize={panel.maxSize}
            >
              <LayoutContext.Provider value={layoutContextValue}>
                <div className="flex h-full items-center justify-center p-6">
                  {panel.content}
                </div>
              </LayoutContext.Provider>
            </ResizablePanel>
            {index < props.panels.length - 1 && <ResizableHandle withHandle />}
          </React.Fragment>
        ))}
      </CoreGroup>
    );
  },
});

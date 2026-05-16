import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup as CoreResizablePanelGroup,
} from "../../core/ui/resizable.js";
import * as React from "react";

export const Resizable = createComponent({
  props: z.object({
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
  }),

  summary: "A resizable panel group component.",
  instructions: [
    "Use this component to create layouts with resizable panels.",
    "The `direction` prop controls whether panels are arranged horizontally or vertically.",
    "Provide a `panels` array with configuration and content for each panel.",
  ].join("\n"),

  render: ({ ref, props }) => {
    const CoreGroup = CoreResizablePanelGroup as any;
    return (
      <CoreGroup
        direction={props.direction}
        className="min-h-[200px] w-full rounded-lg border"
      >
        {props.panels.map((panel, index) => (
          <React.Fragment key={index}>
            <ResizablePanel
              defaultSize={panel.defaultSize}
              minSize={panel.minSize}
              maxSize={panel.maxSize}
            >
              <div className="flex h-full items-center justify-center p-6">
                {panel.content}
              </div>
            </ResizablePanel>
            {index < props.panels.length - 1 && <ResizableHandle withHandle />}
          </React.Fragment>
        ))}
      </CoreGroup>
    );
  },
});

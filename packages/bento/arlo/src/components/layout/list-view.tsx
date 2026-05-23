import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { ListView as CoreListView } from "@ubento/bento.arlo-core";
import * as React from "react";
import {
  getResizableElementStyle,
  resizableElementStyleSchema,
  useLayoutContext,
} from "../../lib/style/style.js";

export const listViewPropsSchema = resizableElementStyleSchema.extend({
  items: z.array(z.any()),
  className: z.string().optional(),
  itemClassName: z.string().optional(),
});

export const ListView = createComponent({
  props: listViewPropsSchema,

  summary: "A virtualized list for efficiently rendering large datasets.",
  instructions: [
    "Use this component to render thousands of items without performance lag.",
    "The component uses virtualization to only render visible items.",
    "Children should be a function that renders each item: (item, index) => <div />",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    // We expect children to be a function for ListView, but createComponent 
    // usually passes ReactNode. For ListView, we'll handle the items rendering.
    // If children is a function, we'll use it.
    
    const renderFn = typeof children === 'function' ? children : (item: any) => <div>{JSON.stringify(item)}</div>;
    const parentLayoutContext = useLayoutContext();

    return (
      <div
        ref={ref}
        style={{
          ...getResizableElementStyle(props, parentLayoutContext),
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CoreListView
          items={props.items}
          renderItem={renderFn as any}
          className={props.className}
          itemClassName={props.itemClassName}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  },
});

import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { ListView as CoreListView } from "@ubento/bento.arlo-core";
import * as React from "react";

export const ListView = createComponent({
  props: z.object({
    items: z.array(z.any()),
    className: z.string().optional(),
    itemClassName: z.string().optional(),
    height: z.union([z.string(), z.number()]).default("400px"),
  }),

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

    return (
      <div style={{ height: props.height }}>
        <CoreListView
          items={props.items}
          renderItem={renderFn as any}
          className={props.className}
          itemClassName={props.itemClassName}
        />
      </div>
    );
  },
});

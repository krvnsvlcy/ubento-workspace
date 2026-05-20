import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as CoreAccordion,
} from "@ubento/bento.arlo-core";

export const Accordion = createComponent({
  props: z.object({
    type: z.enum(["single", "multiple"]).default("single"),
    collapsible: z.boolean().default(true),
    items: z
      .array(
        z.object({
          value: z.string(),
          title: z.string(),
          content: z.any(),
        }),
      )
      .optional(),
  }),
  bindings: z.object({
    value: z.union([z.string(), z.array(z.string())]).optional(),
  }),
  events: z.object({
    valueChange: z.union([z.string(), z.array(z.string())]),
  }),

  summary: "An accordion component with collapsible items.",
  instructions: [
    "Use this component to display a list of collapsible items.",
    "You can provide an `items` array or pass children directly.",
    "The `type` prop controls whether single or multiple items can be open.",
    "The `collapsible` prop allows all items to be closed when type is single.",
    "The `value` binding controls the open items.",
  ].join("\n"),

  render: ({ ref, props, bindings, children, emit }) => {
    const valueTuple = bindings.value;
    const value = valueTuple ? valueTuple[0] : undefined;
    const setValue = valueTuple ? valueTuple[1] : undefined;

    const handleValueChange = (val: string | string[]) => {
      if (setValue) setValue(val);
      emit("valueChange", val);
    };

    return (
      <CoreAccordion
        ref={ref}
        type={props.type as any}
        collapsible={props.collapsible}
        value={value as any}
        onValueChange={handleValueChange as any}
      >
        {props.items
          ? props.items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))
          : children}
      </CoreAccordion>
    );
  },
});

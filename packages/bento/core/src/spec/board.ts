import { z } from "zod";
import { stateSpecSchema } from "./state.js";
import { storeSpecSchema } from "./store.js";
import { edgesSpec } from "./utils.js";

export const boardParameterSourceSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z
        .literal("enum")
        .describe(
          "Indicates the parameter values are constrained to a predefined list.",
        ),
      value: z
        .array(z.union([z.string(), z.number(), z.boolean()]))
        .describe(
          "The exhaustive list of allowed literal values for this parameter.",
        ),
    }),
    z.object({
      type: z
        .literal("entity")
        .describe(
          "Indicates the parameter values are dynamically sourced from a backend entity.",
        ),
      entity: z
        .string()
        .describe(
          "The name or identifier of the entity model used to populate the available options.",
        ),
    }),
  ])
  .describe(
    "Defines the source of allowed values for a board parameter, used for generating navigation links in the ui.",
  );

export const boardParameterSpecSchema = z
  .object({
    label: z
      .string()
      .describe(
        "The human-readable name of the parameter, typically used in UI labels.",
      ),
    type: z
      .enum(["string", "number", "boolean"])
      .describe("The primitive data type of the parameter's value."),
    source: boardParameterSourceSchema
      .optional()
      .describe(
        "Optional constraints or options for the parameter's value. If omitted, it accepts any valid value of the specified type.",
      ),
  })
  .describe(
    "Defines a configurable input parameter that the board accepts upon initialization or execution.",
  );

export type BoardParameterSpec = z.infer<typeof boardParameterSpecSchema>;

export const boardStyleSchema = z
  .object({
    padding: edgesSpec(z.number())
      .optional()
      .describe(
        "Spacing applied inside the board's container edges (top, right, bottom, left).",
      ),
    layout: z
      .enum(["row", "column", "center"])
      .optional()
      .describe(
        "The layout for the board's top-level children. 'row' arranges children horizontally, 'column' arranges children vertically, 'center' centers the children.",
      ),
    gap: z
      .number()
      .optional()
      .describe("The spacing between child elements within the board layout."),
    flow: z
      .enum(["scroll", "fixed"])
      .optional()
      .describe(
        "Defines how content overflow is handled: 'scroll' allows scrolling, 'fixed' prevents it and clips content.",
      ),
  })
  .describe(
    "Defines the high-level visual layout and structural styling of the board.",
  );

export type BoardStyle = z.infer<typeof boardStyleSchema>;

export const listenerSpecSchema = z
  .object({
    handler: z
      .string()
      .describe(
        "The name of the action, mutation, or workflow to execute when the event triggers.",
      ),
    args: z
      .record(z.string(), z.unknown())
      .optional()
      .describe("Arguments to pass into the action."),
  })
  .describe(
    "Defines an event handler that connects UI interactions to state mutations or external actions.",
  );

export type ListenerSpec = z.infer<typeof listenerSpecSchema>;

export const elementSpecSchema = z
  .object({
    component: z
      .string()
      .describe(
        "Name of the UI component to render taken from the available catalog. (e.g., 'Button', 'Table', 'TextInput').",
      ),
    props: z
      .record(z.string(), z.any())
      .optional()
      .describe(
        "Static prop values passed directly to the component. Keys are prop names.",
      ),
    bindings: z
      .record(
        z.string(),
        z.union([
          z.string(),
          z.object({
            value: z.string(),
            setValue: z.string(),
          }),
        ]),
      )
      .optional()
      .describe(
        "Dynamic prop mappings. Keys are component prop names, values are JSON paths or expression strings pointing to the board's state or parameters.",
      ),
    listeners: z
      .record(z.string(), listenerSpecSchema)
      .optional()
      .describe(
        "Event handlers attached to the component. Keys are event names (e.g., 'onClick', 'onChange'), values are the listener specifications.",
      ),
    children: z
      .array(z.string())
      .optional()
      .describe(
        "A list of element IDs representing the nested UI components rendered inside this element.",
      ),
  })
  .describe(
    "Defines a single node in the board's UI tree, detailing what component to render, its data, and its interactivity.",
  );

export type ElementSpec = z.infer<typeof elementSpecSchema>;

export const boardSpecSchema = z
  .object({
    // data
    params: z
      .record(z.string(), boardParameterSpecSchema)
      .optional()
      .describe(
        "A map of parameter definitions required to initialize or filter the board. Keys are parameter IDs.",
      ),
    state: stateSpecSchema
      .optional()
      .describe(
        "The reactive state schema/definition dictating what local variables the board tracks.",
      ),
    initialState: z
      .record(z.string(), z.any())
      .optional()
      .describe(
        "The default starting values for the board's reactive state variables.",
      ),
    store: storeSpecSchema
      .optional()
      .describe(
        "Configuration for connecting the board to an external data store, cache, or database.",
      ),

    // view
    style: boardStyleSchema
      .optional()
      .describe(
        "Root-level styling and layout constraints for the board's main container.",
      ),
    children: z
      .array(z.string())
      .optional()
      .describe(
        "An ordered array of element IDs that form the top-level visual nodes of the board.",
      ),
    elements: z
      .record(z.string(), elementSpecSchema)
      .optional()
      .describe(
        "A flat dictionary of all UI elements used in the board. Keys are unique element IDs referenced by the 'children' arrays.",
      ),
  })
  .describe(
    "The complete architectural blueprint of an Ubento board, encompassing its required inputs, reactive state, data stores, and its exact UI layout and interactivity graph.",
  );

export type BoardSpec = z.infer<typeof boardSpecSchema>;

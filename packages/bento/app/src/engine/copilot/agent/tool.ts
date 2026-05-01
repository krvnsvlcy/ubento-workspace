import { z } from "zod";
import { AgentActionInstance } from "./message.js";
import { AgentActionData } from "./message/action.js";
import { LLMContent } from "./message/llm.js";

export type ToolCallResult<O extends TPage<string, unknown> = {}> = {
  content: LLMContent;
  structuredContent?: O;
  isError?: boolean;
  shouldEnd?: boolean;
};

export interface Tool<
  I extends z.ZodObject<any> = z.ZodObject<any>,
  O extends TPage<string, unknown> = {},
> {
  name: string;
  toolName?: string;
  displayName?: string;
  description: string;
  args: I;
  example?: z.infer<I>;
  playable?: boolean;
  run(
    args: z.infer<I>,
    action: AgentActionInstance,
  ): engineStateChanged<ToolCallResult<O>>;
  play?(args: z.infer<I>): engineStateChanged<ToolCallResult<O>>;
}

export type ToolInputType<T extends Tool> =
  T extends Tool<infer I, any> ? z.infer<I> : never;

export type ToolOutputType<T extends Tool> =
  T extends Tool<any, infer O> ? O : never;

export type ToolActionData<T extends Tool> = AgentActionData<
  ToolInputType<T>,
  ToolOutputType<T>
>;

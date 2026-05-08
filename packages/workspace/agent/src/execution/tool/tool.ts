import { AgentEnvironment } from "@/environment/environment.js";
import { z } from "zod";
import { LLMContent } from "../../utils/llm.js";

export type ToolCallResult<O extends Record<string, unknown> = {}> = {
  content: LLMContent;
  structuredContent?: O;
  isError?: boolean;
  shouldEnd?: boolean;
};

export interface AgentTool<
  I extends z.ZodObject<any> = z.ZodObject<any>,
  E extends AgentEnvironment = AgentEnvironment,
> {
  name: string;
  description: string;
  args: I;
  examples?: Array<{
    summary: string;
    input: z.infer<I>;
    output?: LLMContent;
  }>;
  run({
    args,
    abortController,
    environment,
  }: {
    args: z.infer<I>;
    abortController: AbortController;
    environment: E;
  }): Promise<ToolCallResult>;
}

export type ToolInputType<T extends AgentTool> =
  T extends AgentTool<infer I> ? z.infer<I> : never;

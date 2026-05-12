import { AgentEnvironment } from "../environment/environment.js";

export type ResourceType<
  Data = any,
  TEnvironment extends AgentEnvironment = AgentEnvironment,
> = {
  type: string;
  resolveData?: (input: {
    data: Data;
    key: string;
    environment: TEnvironment;
  }) => Promise<Record<string, unknown>>;
};

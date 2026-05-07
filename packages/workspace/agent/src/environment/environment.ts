import { AgentTool } from "../execution/tool";
import { LanguageModel } from "../utils/models";

export type AgentEnvironment = {
  getModel: (id: string) => LanguageModel | undefined;
  getTool: (name: string) => Promise<AgentTool | undefined>;
};

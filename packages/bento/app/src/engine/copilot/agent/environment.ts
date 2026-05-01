import { Agent } from "./agent.js";
import { AttachmentType } from "./attachments.js";
import { ResourceType } from "./resource.js";
import { AgentThread } from "./thread.js";
import { ToolSet } from "./tool_set/tool_set.js";

export type AgentEnvironment = {
  readWebpage(
    url: string,
    options?: { format: "raw" | "json" | "markdown" },
  ): engineStateChanged<string>;

  toolSets: TPage<string, ToolSet>;
  resourceTypes: TPage<string, ResourceType>;
  attachmentTypes: TPage<string, AttachmentType<any, any>>;

  // Environment actions
  addToolSet: (toolSet: ToolSet) => void;
  removeToolSet: (name: string) => void;
  addResourceType: (resourceType: ResourceType) => void;
  removeResourceType: (type: string) => void;
  addAttachmentType: (attachmentType: AttachmentType<any, any>) => void;
  removeAttachmentType: (type: string) => void;

  // Threads
  createThread: (params: {
    title: string;
    agent: Agent;
  }) => engineStateChanged<AgentThread>;
};

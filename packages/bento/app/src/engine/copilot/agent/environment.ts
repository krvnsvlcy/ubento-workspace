import { AttachmentType } from "./attachments.js";
import { ResourceType } from "./resource.js";
import { ToolSet } from "./tool_set/tool_set.js";

export type AgentEnvironment = {
  readWebpage(
    url: string,
    options?: { format: "raw" | "json" | "markdown" },
  ): Promise<string>;

  toolSets: Record<string, ToolSet>;
  resourceTypes: Record<string, ResourceType>;
  attachmentTypes: Record<string, AttachmentType<any, any>>;

  // Environment actions
  addToolSet: (toolSet: ToolSet) => void;
  removeToolSet: (name: string) => void;
  addResourceType: (resourceType: ResourceType) => void;
  removeResourceType: (type: string) => void;
  addAttachmentType: (attachmentType: AttachmentType<any, any>) => void;
  removeAttachmentType: (type: string) => void;
};


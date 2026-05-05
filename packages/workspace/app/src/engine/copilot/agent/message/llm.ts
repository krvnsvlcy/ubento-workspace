export type LLMContent = LLMContentBlock[];

export type LLMContentBlock =
  | LLMTextContent
  | LLMImageContent
  | LLMAudioContent
  | LLMResourceContent
  | LLMResourceLinkContent;

interface LLMBaseContent {
  annotations?: {
    audience?: ("user" | "assistant")[];
    priority?: number;
    lastModified?: string;
  };
  _meta?: Record<string, unknown>;
}

export interface LLMTextContent extends LLMBaseContent {
  type: "text";
  text: string;
}

export interface LLMImageContent extends LLMBaseContent {
  type: "image";
  data: string; // base64 encoded
  mimeType: string;
}

export interface LLMAudioContent extends LLMBaseContent {
  type: "audio";
  data: string; // base64 encoded
  mimeType: string;
}

export interface LLMResourceContent extends LLMBaseContent {
  type: "resource";
  resource:
    | {
        uri: string;
        text: string;
        mimeType?: string;
        _meta?: Record<string, unknown>;
      }
    | {
        uri: string;
        blob: string;
        mimeType?: string;
        _meta?: Record<string, unknown>;
      };
}

export interface LLMResourceLinkContent extends LLMBaseContent {
  type: "resource_link";
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
  title?: string;
  icons?: Array<{
    src: string;
    mimeType?: string;
    sizes?: string[];
    theme?: "light" | "dark";
  }>;
}

export function renderLLMContentToString(content?: LLMContent): string {
  if (!content) return "";
  return content
    .map((block) => {
      if (block.type === "text") return block.text;
      if (block.type === "resource") {
        return "text" in block.resource ? block.resource.text : "";
      }
      return "";
    })
    .join("\n");
}

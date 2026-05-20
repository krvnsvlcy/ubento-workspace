import { LLMContent } from "@ubento/workspace.agent";
import { ExternalLink, FileText, Music, Image as ImageIcon } from "lucide-react";

export function LlmContentRenderer({ content }: { content: LLMContent }) {
  return (
    <div className="flex flex-col gap-3">
      {content.map((block, i) => {
        switch (block.type) {
          case "text":
            return (
              <div key={i} className="whitespace-pre-wrap text-[13px] leading-[1.6] text-neutral-content">
                {block.text}
              </div>
            );
          case "image":
            return (
              <div key={i} className="relative group max-w-full">
                <img
                  src={`data:${block.mimeType};base64,${block.data}`}
                  alt="AI generated"
                  className="rounded-lg max-h-[300px] border border-neutral-border"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-neutral-surface/80 backdrop-blur-sm p-1 rounded border border-neutral-border">
                    <ImageIcon size={14} className="text-neutral-content" />
                  </div>
                </div>
              </div>
            );
          case "audio":
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-border bg-neutral-surface">
                <Music size={20} className="text-neutral-content-muted" />
                <audio controls src={`data:${block.mimeType};base64,${block.data}`} className="flex-1 h-8" />
              </div>
            );
          case "resource":
            const uri = "uri" in block.resource ? block.resource.uri : "Embedded resource";
            return (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg border border-neutral-border bg-neutral-surface/50 text-xs text-neutral-content-muted">
                <FileText size={14} />
                <span className="truncate">Resource: {uri}</span>
              </div>
            );
          case "resource_link":
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-border bg-neutral-surface hover:bg-neutral-surface-hover transition-colors">
                <div className="w-8 h-8 rounded bg-neutral-surface-hover flex items-center justify-center border border-neutral-border flex-shrink-0">
                  <ExternalLink size={14} className="text-neutral-content-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-neutral-content truncate">
                    {block.name}
                  </div>
                  {block.description && (
                    <div className="text-[10px] text-neutral-content-muted truncate">
                      {block.description}
                    </div>
                  )}
                </div>
                <a
                  href={block.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-accent hover:underline flex-shrink-0"
                >
                  View
                </a>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export const Content = LlmContentRenderer;

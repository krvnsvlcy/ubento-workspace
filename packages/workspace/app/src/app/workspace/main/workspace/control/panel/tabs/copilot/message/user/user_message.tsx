import { UserMessageData } from "@ubento/workspace.agent";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function UserMessage({ data }: { data: UserMessageData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex w-full flex-col gap-1.5 animate-in slide-in-from-right-4 duration-500">
      <div className="w-full rounded-lg border border-white/5 bg-neutral-surface px-4 py-2.5 text-[13px] leading-[1.6] text-neutral-content">
        {data.text}
      </div>
      <div className="flex justify-end px-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-foreground-400 hover:bg-white/10 hover:text-foreground transition-colors"
          title="Copy message"
        >
          {copied ? (
            <Check size={16} strokeWidth={1.5} />
          ) : (
            <Copy size={16} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
}

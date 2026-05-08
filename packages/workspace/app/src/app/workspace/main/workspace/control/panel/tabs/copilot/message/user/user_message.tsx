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
    <div className="group relative flex w-full flex-col gap-1.5 animate-in slide-in-from-right-4 duration-500">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={handleCopy}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground-400 hover:bg-white/10 hover:text-foreground"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>
      <div className="w-full rounded-[20px] rounded-tr-none border border-white/5 bg-neutral-surface px-4 py-2.5 text-[13px] leading-[1.6] text-foreground shadow-sm">
        {data.text}
      </div>
    </div>
  );
}


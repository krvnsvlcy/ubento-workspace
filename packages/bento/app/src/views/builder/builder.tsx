import { useBentoHost } from "@/contexts/host";
import { PendingView } from "@ubento/bento-primitives";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "zustand";
import { createBuilderController } from "./controller.js";
import Editor from "@monaco-editor/react";
import { Code2, Eye, Save } from "lucide-react";

export function Builder({ moduleId }: { moduleId: string }) {
  const host = useBentoHost();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const controller = useMemo(
    () =>
      createBuilderController({
        ubento: host.ubento,
        moduleId,
      }),
    [host.ubento, moduleId],
  );

  const { loading, code } = useStore(controller);

  useEffect(() => {
    controller.getState().load();

    return () => {
      controller.getState().dispose();
    };
  }, [controller]);

  useEffect(() => {
    if (activeTab === "preview" && iframeRef.current) {
      controller.getState().connect(iframeRef.current.contentWindow!);
    }
  }, [iframeRef, controller, activeTab]);

  if (loading) {
    return <PendingView message="Loading Component Builder..." />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-000 text-foreground">
      {/* Sidebar / Context Panel */}
      <div className="flex w-80 flex-col border-r border-background-300 bg-background-100/50 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between border-b border-background-300 px-4">
          <h2 className="font-semibold text-foreground-100">AI Builder</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-background-300 bg-background-200/50 p-3 text-sm text-foreground-400">
              Tell the AI what you want to build or change in this component.
            </div>
            {/* AI Chat Placeholder */}
            <div className="flex flex-col gap-2">
              <div className="self-start rounded-2xl bg-background-200 px-4 py-2 text-sm text-foreground-200">
                How can I help you today?
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-background-300 p-4">
          <div className="relative">
            <textarea
              className="w-full resize-none rounded-xl border border-background-400 bg-background-200 px-4 py-2 text-sm text-foreground-100 focus:border-primary-500 focus:outline-none"
              placeholder="Ask AI to generate code..."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="relative flex flex-1 flex-col bg-background-000">
        {/* Top Header / Actions */}
        <div className="flex h-14 items-center justify-between border-b border-background-300 px-4 bg-background-100/30">
          <div className="flex items-center gap-1 rounded-lg bg-background-200 p-1">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium transition-all ${
                activeTab === "preview"
                  ? "bg-background-300 text-foreground-100 shadow-sm"
                  : "text-foreground-400 hover:text-foreground-200"
              }`}
            >
              <Eye size={14} />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium transition-all ${
                activeTab === "code"
                  ? "bg-background-300 text-foreground-100 shadow-sm"
                  : "text-foreground-400 hover:text-foreground-200"
              }`}
            >
              <Code2 size={14} />
              Code
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                host.goToLocation({
                  view: "workspace",
                  params: { slug: "default" },
                })
              }
              className="rounded-lg bg-background-200 px-4 py-1.5 text-sm font-medium text-foreground-200 hover:bg-background-300 transition-colors"
            >
              Exit
            </button>
            <button
              onClick={() => controller.getState().save()}
              className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-400 transition-colors shadow-lg shadow-primary-500/20"
            >
              <Save size={14} />
              Save Changes
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === "preview" ? (
            <div className="absolute inset-0 flex items-center justify-center p-8 bg-zinc-950/20 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px]">
              <div className="h-full w-full overflow-hidden rounded-2xl border border-background-300 bg-white shadow-2xl">
                <iframe
                  ref={iframeRef}
                  src={host.componentIframeUrl}
                  className="h-full w-full border-none"
                  title="Component Preview"
                />
              </div>
            </div>
          ) : (
            <div className="h-full w-full">
              <Editor
                height="100%"
                defaultLanguage="typescript"
                theme="vs-dark"
                value={code}
                onChange={(val) => controller.getState().updateCode(val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 20 },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  fontFamily: "'JetBrains Mono', monospace",
                  lineNumbers: "on",
                  glyphMargin: false,
                  folding: true,
                  lineDecorationsWidth: 10,
                  lineNumbersMinChars: 3,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import "./modules"; // Initialize import map for shared React
import {
  App,
  createApp,
  PageRegistryProvider,
  editorContext,
  Bridge,
  type PageData,
  type AppData
} from "@hivary/engine";
import { AppAgent, ThinkingAgent } from "@hivary/agent";
import { useEffect, useState, useMemo } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useSnapshot } from "valtio";
import "./index.css";

// Mock LLM for demonstration
const mockLLM = async (prompt: string) => {
  console.log("AI Agent prompted:", prompt);
  if (prompt.toLowerCase().includes("add text")) {
    return JSON.stringify([{
      type: "add_element",
      pageId: "home",
      parentId: "root",
      elementId: `text-${Date.now()}`,
      element: {
        type: "block",
        component: "text",
        props: { text: "AI Generated Text Block" },
        style: { size: 24, weight: 600, color: "#3b82f6" }
      }
    }]);
  }
  return "[]";
};

function GuestApp() {
  const [initData, setInitData] = useState<{ app: any; pages: Record<string, PageData> } | null>(null);

  const agent = useMemo(() => {
    if (!initData) return null;
    return new AppAgent({ app: initData.app, pages: initData.pages });
  }, [initData]);

  const thinkingAgent = useMemo(() => {
    if (!agent) return null;
    return new ThinkingAgent(agent, mockLLM);
  }, [agent]);

  useEffect(() => {
    // 1. Notify host that we are ready to receive the app config
    Bridge.send(window.parent, "APP_READY", {});

    // 2. Listen for initialization from host
    const cleanup = Bridge.listen((type, payload) => {
      console.log(`[Guest] Received: ${type}`, payload);
      if (type === "INITIALIZE_GUEST") {
        const { app, pages } = payload as { app: AppData; pages: Record<string, PageData> };
        setInitData({
          app: createApp(app),
          pages: pages
        });
      }
    });

    return cleanup;
  }, []);

  if (!initData) {
    return (
      <div className="h-screen w-screen bg-neutral-900 flex items-center justify-center text-neutral-500 font-mono text-xs uppercase tracking-widest">
        Waiting for Host Configuration...
      </div>
    );
  }

  return (
    <PageRegistryProvider registry={initData.pages}>
      <App app={initData.app} />
      <EditorToolbar thinkingAgent={thinkingAgent} />
    </PageRegistryProvider>
  );
}

function EditorToolbar({ thinkingAgent }: { thinkingAgent: ThinkingAgent | null }) {
  const snap = useSnapshot(editorContext);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAction = async () => {
    if (!thinkingAgent) return;
    const prompt = window.prompt("What would you like to build? (Try 'add text')");
    if (!prompt) return;

    setIsAiLoading(true);
    try {
      await thinkingAgent.process(prompt);
    } catch (e) {
      alert("AI Agent failed: " + e);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#1f2937",
        padding: "8px 16px",
        borderRadius: "99px",
        display: "flex",
        gap: "12px",
        alignItems: "center",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        border: "1px solid #374151",
      }}
    >
      <button
        style={{
          backgroundColor: snap.mode === "view" ? "#3b82f6" : "transparent",
          color: "white",
          border: "none",
          padding: "4px 12px",
          borderRadius: "99px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 600,
        }}
        onClick={() => {
          editorContext.mode = "view";
          editorContext.selection = [];
        }}
      >
        View
      </button>
      <button
        style={{
          backgroundColor: snap.mode === "edit" ? "#3b82f6" : "transparent",
          color: "white",
          border: "none",
          padding: "4px 12px",
          borderRadius: "99px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 600,
        }}
        onClick={() => (editorContext.mode = "edit")}
      >
        Edit
      </button>

      <div style={{ width: "1px", height: "16px", backgroundColor: "#374151" }} />

      <button
        style={{
          backgroundColor: "#8b5cf6",
          color: "white",
          border: "none",
          padding: "4px 12px",
          borderRadius: "99px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 600,
          opacity: isAiLoading ? 0.7 : 1,
        }}
        disabled={isAiLoading}
        onClick={handleAiAction}
      >
        {isAiLoading ? "Thinking..." : "✨ AI Builder"}
      </button>

      {snap.selection.length > 0 && (
        <div style={{ color: "#9ca3af", fontSize: "11px", marginLeft: "8px", borderLeft: "1px solid #374151", paddingLeft: "12px" }}>
          {snap.selection.length} selected
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GuestApp />
  </StrictMode>,
);

import "./modules"; // Initialize import map for shared React
import {
  App,
  createApp,
  PageRegistryProvider,
  editorContext,
  Bridge,
  type PageData,
  type AppData
} from "@ubento/engine";
import { AppAgent, ThinkingAgent } from "@ubento/agent";
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

    let lastShiftTime = 0;

    // 2. Listen for initialization from host
    const cleanup = Bridge.listen((type, payload) => {
      console.log(`[Guest] Received: ${type}`, payload);
      if (type === "INITIALIZE_GUEST") {
        const { app, pages } = payload as {
          app: AppData;
          pages: Record<string, PageData>;
        };
        setInitData({
          app: createApp(app),
          pages: pages,
        });
      }

      if (type === "SET_MODE") {
        editorContext.mode = payload as any;
        if (payload === "view") {
          editorContext.selection = [];
        }
      }

      if (type === "AI_ACTION") {
        if (!thinkingAgent) return;
        thinkingAgent.process(payload as string).catch((e) => {
          console.error("AI Agent failed:", e);
        });
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        const currentTime = Date.now();
        if (currentTime - lastShiftTime < 500) {
          Bridge.send(window.parent, "TOGGLE_MODE", {});
          lastShiftTime = 0;
        } else {
          lastShiftTime = currentTime;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cleanup();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [thinkingAgent]);

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
    </PageRegistryProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GuestApp />
  </StrictMode>,
);

import { Bridge, type AppData, type PageData } from "@hivary/engine";
import { useEffect, useRef, useState } from "react";

// --- App Definitions ---

const TABULA_APP: AppData = {
  id: "tabula",
  routes: {
    "/": "board-component",
    "/settings": "settings-component",
  },
};

const COMPONENT_REGISTRY: Record<string, PageData> = {
  "board-component": {
    id: "board-component",
    rootId: "root",
    elements: {
      root: {
        component: "container",
        props: { 
          layout: "flex", 
          direction: "column", 
          background: "#0a0a0a", 
          height: "100vh", 
          width: "100%",
          padding: { top: 40, bottom: 40, left: 60, right: 60 },
          gap: { y: 32 }
        },
        children: ["header", "stats-row", "grid-title", "grid"],
      },
      header: {
        component: "container",
        props: { layout: "flex", direction: "column", gap: { y: 4 } },
        children: ["title", "subtitle"],
      },
      title: {
        component: "text",
        props: { text: "Hivary Workspace", size: 32, weight: 700, color: "#ffffff" },
      },
      subtitle: {
        component: "text",
        props: { text: "Manage your active projects and team tasks", size: 14, color: "#737373" },
      },
      "stats-row": {
        component: "container",
        props: { layout: "flex", direction: "row", gap: { x: 16 } },
        children: ["stat-1", "stat-2", "stat-3"],
      },
      "stat-1": {
        component: "container",
        props: { background: "#171717", cornerRadius: 12, padding: { top: 16, bottom: 16, left: 20, right: 20 }, width: 160 },
        children: ["stat-1-label", "stat-1-val"],
      },
      "stat-1-label": { component: "text", props: { text: "Active Tasks", size: 11, color: "#a3a3a3", weight: 600 } },
      "stat-1-val": { component: "text", props: { text: "24", size: 24, color: "#3b82f6", weight: 700 } },
      
      "stat-2": {
        component: "container",
        props: { background: "#171717", cornerRadius: 12, padding: { top: 16, bottom: 16, left: 20, right: 20 }, width: 160 },
        children: ["stat-2-label", "stat-2-val"],
      },
      "stat-2-label": { component: "text", props: { text: "Completed", size: 11, color: "#a3a3a3", weight: 600 } },
      "stat-2-val": { component: "text", props: { text: "128", size: 24, color: "#10b981", weight: 700 } },

      "stat-3": {
        component: "container",
        props: { background: "#171717", cornerRadius: 12, padding: { top: 16, bottom: 16, left: 20, right: 20 }, width: 160 },
        children: ["stat-3-label", "stat-3-val"],
      },
      "stat-3-label": { component: "text", props: { text: "Team", size: 11, color: "#a3a3a3", weight: 600 } },
      "stat-3-val": { component: "text", props: { text: "8", size: 24, color: "#f59e0b", weight: 700 } },

      "grid-title": {
        component: "text",
        props: { text: "Active Projects", size: 18, weight: 600, color: "#e5e5e5" },
      },
      grid: {
        component: "container",
        props: { layout: "grid", columns: [33, 33, 33], gap: { x: 20, y: 20 } },
        children: ["card-1", "card-2", "card-3"],
      },
      "card-1": {
        component: "container",
        props: { background: "#1e1b4b", cornerRadius: 20, padding: { top: 24, bottom: 24, left: 24, right: 24 }, height: 180, layout: "flex", direction: "column", justifyContent: "end" },
        children: ["card-1-tag", "card-1-name"],
      },
      "card-1-tag": { component: "text", props: { text: "Design", size: 10, weight: 700, color: "#818cf8", underline: true } },
      "card-1-name": { component: "text", props: { text: "Work OS Interface", size: 18, weight: 600, color: "#ffffff" } },

      "card-2": {
        component: "container",
        props: { background: "#064e3b", cornerRadius: 20, padding: { top: 24, bottom: 24, left: 24, right: 24 }, height: 180, layout: "flex", direction: "column", justifyContent: "end" },
        children: ["card-2-tag", "card-2-name"],
      },
      "card-2-tag": { component: "text", props: { text: "Engineering", size: 10, weight: 700, color: "#34d399", underline: true } },
      "card-2-name": { component: "text", props: { text: "App Engine Core", size: 18, weight: 600, color: "#ffffff" } },

      "card-3": {
        component: "container",
        props: { background: "#450a0a", cornerRadius: 20, padding: { top: 24, bottom: 24, left: 24, right: 24 }, height: 180, layout: "flex", direction: "column", justifyContent: "end" },
        children: ["card-3-tag", "card-3-name"],
      },
      "card-3-tag": { component: "text", props: { text: "Marketing", size: 10, weight: 700, color: "#f87171", underline: true } },
      "card-3-name": { component: "text", props: { text: "Monorepo Launch", size: 18, weight: 600, color: "#ffffff" } },
    },
  },
  "settings-component": {
    id: "settings-component",
    rootId: "root",
    elements: {
      root: {
        component: "container",
        props: { background: "#0a0a0a", height: "100vh", padding: { top: 40, left: 60 } },
        children: ["s-title"],
      },
      "s-title": {
        component: "text",
        props: { text: "System Settings", size: 32, weight: 700, color: "#ffffff" },
      },
    },
  },
};

function App() {
  const [iframeUrl] = useState("http://localhost:4020");
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [guestStatus, setGuestStatus] = useState("WAITING...");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const cleanup = Bridge.listen((type, payload) => {
      console.log(`[Host] Received: ${type}`, payload);

      if (type === "APP_READY") {
        setGuestStatus("READY");
        if (iframeRef.current?.contentWindow) {
          Bridge.send(iframeRef.current.contentWindow, "LOAD_APP", TABULA_APP);
        }
      }

      if (type === "COMPONENT_REQUEST") {
        const { componentId } = payload;
        const componentData = COMPONENT_REGISTRY[componentId];
        if (componentData && iframeRef.current?.contentWindow) {
          Bridge.send(
            iframeRef.current.contentWindow,
            "COMPONENT_DELIVERY",
            componentData,
          );
        }
      }
    });

    return cleanup;
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <iframe
        ref={iframeRef}
        src={iframeUrl}
        className="absolute inset-0 h-full w-full border-none"
        title="Work OS Content"
      />

      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isOverlayVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="pointer-events-auto flex h-12 w-full items-center justify-between bg-white/80 px-4 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              H
            </div>
            <span className="text-sm font-bold text-gray-800">
              Work OS Host
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[10px] font-mono bg-green-100 text-green-700 px-2 py-1 rounded">
              GUEST: {guestStatus}
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          </div>
        </div>

        <div className="absolute left-4 top-1/2 flex -translate-y-1/2 pointer-events-auto flex-col gap-4 rounded-2xl bg-white/80 p-3 backdrop-blur-md shadow-lg">
          <button
            className="h-10 w-10 rounded-xl bg-gray-100 transition-colors hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center"
            title="Load Dashboard"
            onClick={() => {
              if (iframeRef.current?.contentWindow) {
                Bridge.send(iframeRef.current.contentWindow, "NAVIGATE", {
                  path: "/",
                });
              }
            }}
          >
            📁
          </button>
          <button
            className="h-10 w-10 rounded-xl bg-gray-100 transition-colors hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center"
            title="Load Settings"
            onClick={() => {
              if (iframeRef.current?.contentWindow) {
                Bridge.send(iframeRef.current.contentWindow, "NAVIGATE", {
                  path: "/settings",
                });
              }
            }}
          >
            ⚙️
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsOverlayVisible(!isOverlayVisible)}
        className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 z-50 flex items-center justify-center text-xl"
      >
        {isOverlayVisible ? "✕" : "⌘"}
      </button>
    </div>
  );
}

export default App;

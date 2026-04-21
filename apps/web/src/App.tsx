import { Bridge, type AppData, type PageData } from "@hivary/engine";
import { useEffect, useRef, useState } from "react";

const REGISTRY_BASE = "http://localhost:4030/components";
const BACKEND_URL = "http://localhost:4050";

// --- Default Template Data (used when creating new apps) ---
const DEFAULT_PAGE_DATA: PageData = {
  id: "home",
  rootId: "root",
  elements: {
    root: {
      type: "container",
      style: { 
        layout: "flex", 
        direction: "column", 
        background: "#0a0a0a", 
        height: "100vh", 
        width: "100%",
        padding: { top: 40, left: 60 },
        gap: { y: 32 }
      },
      content: ["welcome-text"],
    },
    "welcome-text": {
      type: "block",
      component: "text",
      props: { text: "Welcome to your new Hivary App!" },
      style: { size: 24, weight: 600, color: "#ffffff" } as any
    }
  }
};

// For this demo, we'll keep the rich dashboard for the existing "tabula" app
const RICH_DASHBOARD_DATA: PageData = {
  id: "home",
  rootId: "root",
  elements: {
    root: {
      type: "container",
      style: { 
        layout: "flex", 
        direction: "column", 
        background: "#0a0a0a", 
        height: "100vh", 
        width: "100%",
        padding: { top: 40, bottom: 40, left: 60, right: 60 },
        gap: { y: 32 },
        overflow: "auto"
      },
      content: ["header", "stats-row", "grid-title", "grid"],
    },
    header: {
      type: "container",
      style: { layout: "flex", direction: "row", justifyContent: "space-between", alignItems: "center" },
      content: ["header-left", "header-right"],
    },
    "header-left": {
      type: "container",
      style: { layout: "flex", direction: "column", gap: { y: 4 } },
      content: ["title", "subtitle"],
    },
    "header-right": {
      type: "block",
      component: `${REGISTRY_BASE}/Clock.js`,
      props: { label: "LOCAL TIME", bg: "#171717" },
      style: { width: 180 }
    },
    title: {
      type: "block",
      component: "text",
      props: { text: "Hivary Workspace" },
      style: { size: 32, weight: 700, color: "#ffffff" } as any,
    },
    subtitle: {
      type: "block",
      component: "text",
      props: { text: "Platform View: Manage your environment" },
      style: { size: 14, color: "#737373" } as any,
    },
    "stats-row": {
      type: "container",
      style: { layout: "flex", direction: "row", gap: { x: 16 } },
      content: ["stat-1", "stat-2", "stat-3"],
    },
    "stat-1": {
      type: "block",
      component: `${REGISTRY_BASE}/StatCard.js`,
      props: { label: "Active Nodes", value: "14", color: "#3b82f6", trend: "+2" },
      style: { width: 200 }
    },
    "stat-2": {
      type: "block",
      component: `${REGISTRY_BASE}/StatCard.js`,
      props: { label: "Latency", value: "24ms", color: "#10b981", trend: "-2ms" },
      style: { width: 200 }
    },
    "stat-3": {
      type: "block",
      component: `${REGISTRY_BASE}/StatCard.js`,
      props: { label: "Uptime", value: "99.9%", color: "#f59e0b", trend: "0%" },
      style: { width: 200 }
    },
    "grid-title": {
      type: "block",
      component: "text",
      props: { text: "Quick Access", size: 18, weight: 600, color: "#e5e5e5" } as any,
    },
    grid: {
      type: "container",
      style: { layout: "grid", columns: 3, gap: { x: 20, y: 20 } },
      content: ["card-1", "card-2", "card-3"],
    },
    "card-1": {
      type: "block",
      component: `${REGISTRY_BASE}/ProjectCard.js`,
      props: { title: "Infra Monitor", tag: "Ops", progress: 88, bg: "#1e1b4b" },
      style: { height: 180 }
    },
    "card-2": {
      type: "block",
      component: `${REGISTRY_BASE}/ProjectCard.js`,
      props: { title: "User Analytics", tag: "Product", progress: 45, bg: "#064e3b" },
      style: { height: 180 }
    },
    "card-3": {
      type: "block",
      component: `${REGISTRY_BASE}/ProjectCard.js`,
      props: { title: "Security Audit", tag: "Security", progress: 100, bg: "#450a0a" },
      style: { height: 180 }
    },
  },
};

function App() {
  const [apps, setApps] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 1. Fetch apps from backend on mount
  useEffect(() => {
    fetch(`${BACKEND_URL}/apps`)
      .then(res => res.json())
      .then(data => {
        setApps(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch apps", err);
        setLoading(false);
      });
  }, []);

  // 2. Handle Bridge communication
  useEffect(() => {
    const cleanup = Bridge.listen((type, payload) => {
      if (type === "APP_READY") {
        if (selectedApp && iframeRef.current?.contentWindow) {
          // Inject actual app data
          Bridge.send(iframeRef.current.contentWindow, "INITIALIZE_GUEST", {
            app: selectedApp.config,
            pages: selectedApp.id === 'tabula' ? { home: RICH_DASHBOARD_DATA } : { home: DEFAULT_PAGE_DATA }
          });
        }
      }
    });
    return cleanup;
  }, [selectedApp]);

  const createNewApp = () => {
    const name = prompt("Enter App Name:");
    if (!name) return;

    fetch(`${BACKEND_URL}/apps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, teamId: 't-1' })
    })
    .then(res => res.json())
    .then(newApp => {
      setApps([...apps, newApp]);
    });
  };

  // Launcher View
  if (!selectedApp) {
    return (
      <div className="min-h-screen w-full bg-neutral-950 p-12 text-white font-sans">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Hivary Platform</h1>
            <p className="text-neutral-500">Welcome back, select an application to launch</p>
          </div>
          <button 
            onClick={createNewApp}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            + Create New App
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center py-20 opacity-50">Loading ecosystem...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map(app => (
              <div 
                key={app.id} 
                onClick={() => setSelectedApp(app)}
                className="group bg-neutral-900 border border-neutral-800 p-8 rounded-3xl cursor-pointer hover:border-blue-500/50 transition-all hover:bg-neutral-800/50"
              >
                <div className="h-12 w-12 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  {app.name[0]}
                </div>
                <h3 className="text-xl font-bold mb-2">{app.name}</h3>
                <p className="text-neutral-500 text-sm mb-6">ID: {app.id}</p>
                <div className="flex items-center text-blue-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Launch Application →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Runner View (Work OS)
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        src="http://localhost:4020"
        className="absolute inset-0 h-full w-full border-none"
        title="Work OS Content"
      />

      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isOverlayVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="pointer-events-auto flex h-12 w-full items-center justify-between bg-white/80 px-4 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedApp(null)}
              className="h-8 w-8 rounded-lg bg-neutral-800 flex items-center justify-center text-white hover:bg-black transition-colors"
              title="Back to Launcher"
            >
              ←
            </button>
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">H</div>
            <span className="text-sm font-bold text-gray-800">
              {selectedApp.name} <span className="font-normal text-gray-400 ml-2">({selectedApp.id})</span>
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      </div>

      <button 
        onClick={() => setIsOverlayVisible(!isOverlayVisible)}
        className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 z-50 flex items-center justify-center text-xl"
      >
        {isOverlayVisible ? '✕' : '⌘'}
      </button>
    </div>
  );
}

export default App;

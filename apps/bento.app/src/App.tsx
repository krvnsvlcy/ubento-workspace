import { Bridge, type AppData, type PageData } from "@ubento/engine";
import { useEffect, useRef, useState } from "react";

const REGISTRY_BASE = "http://localhost:4030/components";
const BACKEND_URL = "http://localhost:4050";

function App() {
  const [projectRef, setProjectRef] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [appData, setAppData] = useState<any>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 1. Determine Project Ref from Hostname (Simulation)
    const hostname = window.location.hostname;
    let ref = hostname.split('.')[0];
    
    // Fallback for local development localhost:4000
    if (ref === 'localhost') {
      const params = new URLSearchParams(window.location.search);
      ref = params.get('project') || 'tabula';
    }

    setProjectRef(ref);

    // 2. Perform Server Authorization
    if (ref) {
      fetch(`${BACKEND_URL}/apps/${ref}`)
        .then(res => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then(data => {
          setAppData(data);
          setIsAuthorized(true);
        })
        .catch(() => {
          setIsAuthorized(false);
        });
    }
  }, []);

  // 3. Handle Bridge injection once Guest is ready
  useEffect(() => {
    const cleanup = Bridge.listen((type, payload) => {
      if (type === "APP_READY" && isAuthorized && appData) {
        if (iframeRef.current?.contentWindow) {
          // Send specific project data to guest
          Bridge.send(iframeRef.current.contentWindow, "INITIALIZE_GUEST", {
            app: appData.config,
            // For demo, if it's tabula, we use the rich dashboard, otherwise default
            pages: appData.id === 'tabula' ? RICH_DASHBOARD_DATA : DEFAULT_TEMPLATE
          });
        }
      }
    });
    return cleanup;
  }, [isAuthorized, appData]);

  if (isAuthorized === false) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="h-16 w-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl font-bold">!</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-neutral-500">You don't have permission to access {projectRef}.ubento.app</p>
        <button 
          onClick={() => window.location.href = "http://localhost:3000"}
          className="mt-8 text-sm text-blue-500 hover:underline"
        >
          Return to Platform Launcher
        </button>
      </div>
    );
  }

  if (!isAuthorized) {
    return <div className="h-screen w-screen bg-black flex items-center justify-center text-neutral-500 animate-pulse uppercase text-xs tracking-widest">
      Authorizing...
    </div>;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        src="http://localhost:4020"
        className="absolute inset-0 h-full w-full border-none"
        title="Ubento Runtime"
      />

      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isOverlayVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="pointer-events-auto flex h-12 w-full items-center justify-between bg-white/80 px-4 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">U</div>
            <span className="text-sm font-bold text-gray-800">
              {appData?.name} <span className="font-normal text-gray-400 ml-2">({projectRef})</span>
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

// --- Template Data Helpers (copied for isolation) ---

const DEFAULT_TEMPLATE = {
  home: {
    id: "home",
    rootId: "root",
    elements: {
      root: {
        type: "container",
        style: { layout: "flex", direction: "column", background: "#0a0a0a", height: "100vh", width: "100%", padding: { top: 40, left: 60 } },
        content: ["t1"],
      },
      "t1": { type: "block", component: "text", props: { text: "Authorized Instance" }, style: { size: 24, color: "#ffffff" } as any }
    }
  }
};

const RICH_DASHBOARD_DATA = {
    "root": {
      type: "container",
      style: { layout: "flex", direction: "column", background: "#0a0a0a", height: "100vh", width: "100%", padding: { top: 40, bottom: 40, left: 60, right: 60 }, gap: { y: 32 }, overflow: "auto" },
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
      props: { label: "HKG TIME", bg: "#171717" },
      style: { width: 180 }
    },
    title: { type: "block", component: "text", props: { text: "Ubento Workspace" }, style: { size: 32, weight: 700, color: "#ffffff" } as any },
    subtitle: { type: "block", component: "text", props: { text: "Manage your active projects" }, style: { size: 14, color: "#737373" } as any },
    "stats-row": {
      type: "container",
      style: { layout: "flex", direction: "row", gap: { x: 16 } },
      content: ["stat-1", "stat-2", "stat-3"],
    },
    "stat-1": { type: "block", component: `${REGISTRY_BASE}/StatCard.js`, props: { label: "Active Tasks", value: "24", color: "#3b82f6", trend: "+12%" }, style: { width: 200 } },
    "stat-2": { type: "block", component: `${REGISTRY_BASE}/StatCard.js`, props: { label: "Completed", value: "128", color: "#10b981", trend: "+5%" }, style: { width: 200 } },
    "stat-3": { type: "block", component: `${REGISTRY_BASE}/StatCard.js`, props: { label: "Team Members", value: "8", color: "#f59e0b", trend: "0%" }, style: { width: 200 } },
    "grid-title": { type: "block", component: "text", props: { text: "Active Projects" }, style: { size: 18, weight: 600, color: "#e5e5e5" } as any },
    grid: {
      type: "container",
      style: { layout: "grid", columns: 3, gap: { x: 20, y: 20 } },
      content: ["card-1", "card-2", "card-3"],
    },
    "card-1": { type: "block", component: `${REGISTRY_BASE}/ProjectCard.js`, props: { title: "Work OS Interface", tag: "Design", progress: 75, bg: "#1e1b4b" }, style: { height: 180 } },
    "card-2": { type: "block", component: `${REGISTRY_BASE}/ProjectCard.js`, props: { title: "App Engine Core", tag: "Engineering", progress: 90, bg: "#064e3b" }, style: { height: 180 } },
    "card-3": { type: "block", component: `${REGISTRY_BASE}/ProjectCard.js`, props: { title: "Monorepo Launch", tag: "Marketing", progress: 40, bg: "#450a0a" }, style: { height: 180 } },
};

export default App;

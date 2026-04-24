import type { Host } from "@ubento/bento-app";
import { AppViewer } from "@ubento/bento-app";
import { useEffect, useState } from "react";

const REGISTRY_BASE = "http://localhost:4030/components";
const BACKEND_URL = "http://localhost:4050";

const DEFAULT_TEMPLATE = {
  home: {
    id: "home",
    rootId: "root",
    elements: {
      root: {
        type: "container",
        style: {
          layout: "flex",
          direction: "column",
          background: "transparent",
          height: "100vh",
          width: "100%",
          padding: { top: 40, left: 60 },
        },
        content: ["t1"],
      },
      t1: {
        type: "block",
        component: "text",
        props: { text: "Authorized Instance" },
        style: { size: 24 } as any,
      },
    },
  },
};

const RICH_DASHBOARD_DATA = {
  root: {
    type: "container",
    style: {
      layout: "flex",
      direction: "column",
      background: "transparent",
      height: "100vh",
      width: "100%",
      padding: { top: 40, bottom: 40, left: 60, right: 60 },
      gap: { y: 32 },
      overflow: "auto",
    },
    content: ["header", "stats-row", "grid-title", "grid"],
  },
  header: {
    type: "container",
    style: {
      layout: "flex",
      direction: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
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
    style: { width: 180 },
  },
  title: {
    type: "block",
    component: "text",
    props: { text: "Ubento Workspace" },
    style: { size: 32, weight: 700 } as any,
  },
  subtitle: {
    type: "block",
    component: "text",
    props: { text: "Manage your active projects" },
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
    props: {
      label: "Active Tasks",
      value: "24",
      color: "#3b82f6",
      trend: "+12%",
    },
    style: { width: 200 },
  },
  "stat-2": {
    type: "block",
    component: `${REGISTRY_BASE}/StatCard.js`,
    props: { label: "Completed", value: "128", color: "#10b981", trend: "+5%" },
    style: { width: 200 },
  },
  "stat-3": {
    type: "block",
    component: `${REGISTRY_BASE}/StatCard.js`,
    props: { label: "Team Members", value: "8", color: "#f59e0b", trend: "0%" },
    style: { width: 200 },
  },
  "grid-title": {
    type: "block",
    component: "text",
    props: { text: "Active Projects" },
    style: { size: 18, weight: 600 } as any,
  },
  grid: {
    type: "container",
    style: { layout: "grid", columns: 3, gap: { x: 20, y: 20 } },
    content: ["card-1", "card-2", "card-3"],
  },
  "card-1": {
    type: "block",
    component: `${REGISTRY_BASE}/ProjectCard.js`,
    props: {
      title: "Work OS Interface",
      tag: "Design",
      progress: 75,
      bg: "#1e1b4b",
    },
    style: { height: 180 },
  },
  "card-2": {
    type: "block",
    component: `${REGISTRY_BASE}/ProjectCard.js`,
    props: {
      title: "App Engine Core",
      tag: "Engineering",
      progress: 90,
      bg: "#064e3b",
    },
    style: { height: 180 },
  },
  "card-3": {
    type: "block",
    component: `${REGISTRY_BASE}/ProjectCard.js`,
    props: {
      title: "Monorepo Launch",
      tag: "Marketing",
      progress: 40,
      bg: "#450a0a",
    },
    style: { height: 180 },
  },
};

function App() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [appData, setAppData] = useState<any>(null);

  useEffect(() => {
    // 1. Determine Project Ref from Hostname (Simulation)
    const hostname = window.location.hostname;
    let ref = hostname.split(".")[0];

    // Fallback for local development localhost:4000
    if (ref === "localhost") {
      const params = new URLSearchParams(window.location.search);
      ref = params.get("project") || "tabula";
    }

    // 2. Perform Server Authorization
    if (ref) {
      fetch(`${BACKEND_URL}/apps/${ref}`)
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          setAppData(data);
          setIsAuthorized(true);
        })
        .catch(() => {
          setIsAuthorized(false);
        });
    }
  }, []);

  if (!isAuthorized) {
    return (
      <div className="h-screen w-screen bg-background flex items-center justify-center text-neutral-500 animate-pulse uppercase text-xs tracking-widest">
        Authorizing...
      </div>
    );
  }

  const host: Host = {
    ubento: {
      app: {
        listApps: async () => [], // Not used here
        createApp: async () => ({}), // Not used here
      },
    },
    iframeUrl: "http://localhost:4020",
  };

  const templates =
    appData.id === "tabula" ? RICH_DASHBOARD_DATA : DEFAULT_TEMPLATE;

  return (
    <AppViewer
      openedApp={appData}
      closeApp={() => (window.location.href = "http://localhost:3000")}
      host={host}
      templateOverrides={templates}
    />
  );
}

export default App;

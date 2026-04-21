import {
  App,
  createApp,
  createPage,
  PageRegistryProvider,
  container,
  text,
} from "@hivary/engine";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const app = createApp({
  id: "tabula",
  routes: {
    "/": "home",
  },
});

const page = createPage({
  id: "home",
  rootId: "root",
  elements: {
    root: {
      component: container.name,
      props: container.props({ 
        children: ["header", "stats-row", "grid-title", "grid"],
        layout: "flex", 
        direction: "column", 
        background: "#0a0a0a", 
        height: "100vh", 
        width: "100%",
        padding: { top: 40, bottom: 40, left: 60, right: 60 },
        gap: { y: 32 },
        overflow: "auto"
      }),
    },
    header: {
      component: container.name,
      props: container.props({ 
        children: ["title", "subtitle"],
        layout: "flex", 
        direction: "column", 
        gap: { y: 4 } 
      }),
    },
    title: {
      component: text.name,
      props: text.props({ text: "Hivary Workspace", size: 32, weight: 700, color: "#ffffff" }),
    },
    subtitle: {
      component: text.name,
      props: text.props({ text: "Manage your active projects and team tasks", size: 14, color: "#737373" }),
    },
    "stats-row": {
      component: container.name,
      props: container.props({ 
        children: ["stat-1", "stat-2", "stat-3"],
        layout: "flex", 
        direction: "row", 
        gap: { x: 16 } 
      }),
    },
    "stat-1": {
      component: container.name,
      props: container.props({ 
        children: ["stat-1-label", "stat-1-val"],
        background: "#171717", 
        cornerRadius: 12, 
        padding: { top: 16, bottom: 16, left: 20, right: 20 }, 
        width: 160 
      }),
    },
    "stat-1-label": { component: "text", props: { text: "Active Tasks", size: 11, color: "#a3a3a3", weight: 600 } },
    "stat-1-val": { component: "text", props: { text: "24", size: 24, color: "#3b82f6", weight: 700 } },
    
    "stat-2": {
      component: container.name,
      props: container.props({ 
        children: ["stat-2-label", "stat-2-val"],
        background: "#171717", 
        cornerRadius: 12, 
        padding: { top: 16, bottom: 16, left: 20, right: 20 }, 
        width: 160 
      }),
    },
    "stat-2-label": { component: "text", props: { text: "Completed", size: 11, color: "#a3a3a3", weight: 600 } },
    "stat-2-val": { component: "text", props: { text: "128", size: 24, color: "#10b981", weight: 700 } },

    "stat-3": {
      component: container.name,
      props: container.props({ 
        children: ["stat-3-label", "stat-3-val"],
        background: "#171717", 
        cornerRadius: 12, 
        padding: { top: 16, bottom: 16, left: 20, right: 20 }, 
        width: 160 
      }),
    },
    "stat-3-label": { component: "text", props: { text: "Team", size: 11, color: "#a3a3a3", weight: 600 } },
    "stat-3-val": { component: "text", props: { text: "8", size: 24, color: "#f59e0b", weight: 700 } },

    "grid-title": {
      component: text.name,
      props: text.props({ text: "Active Projects", size: 18, weight: 600, color: "#e5e5e5" }),
    },
    grid: {
      component: container.name,
      props: container.props({ 
        children: ["card-1", "card-2", "card-3"],
        layout: "grid", 
        columns: [33, 33, 33], 
        gap: { x: 20, y: 20 } 
      }),
    },
    "card-1": {
      component: container.name,
      props: container.props({ 
        children: ["card-1-tag", "card-1-name"],
        background: "#1e1b4b", 
        cornerRadius: 20, 
        padding: { top: 24, bottom: 24, left: 24, right: 24 }, 
        height: 180, 
        layout: "flex", 
        direction: "column", 
        justifyContent: "end" 
      }),
    },
    "card-1-tag": { component: "text", props: { text: "Design", size: 10, weight: 700, color: "#818cf8", underline: true } },
    "card-1-name": { component: "text", props: { text: "Work OS Interface", size: 18, weight: 600, color: "#ffffff" } },

    "card-2": {
      component: container.name,
      props: container.props({ 
        children: ["card-2-tag", "card-2-name"],
        background: "#064e3b", 
        cornerRadius: 20, 
        padding: { top: 24, bottom: 24, left: 24, right: 24 }, 
        height: 180, 
        layout: "flex", 
        direction: "column", 
        justifyContent: "end" 
      }),
    },
    "card-2-tag": { component: "text", props: { text: "Engineering", size: 10, weight: 700, color: "#34d399", underline: true } },
    "card-2-name": { component: "text", props: { text: "App Engine Core", size: 18, weight: 600, color: "#ffffff" } },

    "card-3": {
      component: container.name,
      props: container.props({ 
        children: ["card-3-tag", "card-3-name"],
        background: "#450a0a", 
        cornerRadius: 20, 
        padding: { top: 24, bottom: 24, left: 24, right: 24 }, 
        height: 180, 
        layout: "flex", 
        direction: "column", 
        justifyContent: "end" 
      }),
    },
    "card-3-tag": { component: "text", props: { text: "Marketing", size: 10, weight: 700, color: "#f87171", underline: true } },
    "card-3-name": { component: "text", props: { text: "Monorepo Launch", size: 18, weight: 600, color: "#ffffff" } },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PageRegistryProvider registry={{ home: page }}>
      <App app={app} />
    </PageRegistryProvider>
  </StrictMode>,
);

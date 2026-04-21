import { Bridge, type AppData, type PageData } from "@hivary/engine";
import { useEffect, useRef, useState } from "react";

// --- App Definitions ---

const TABULA_APP: AppData = {
  id: "tabula",
  routes: {
    "/": "board-component",
    "/settings": "settings-component",
  },
  initialPath: "/",
};

const COMPONENT_REGISTRY: Record<string, PageData> = {
  "board-component": {
    id: "board-component",
    rootId: "root",
    elements: {
      root: {
        type: "div",
        props: { className: "h-full w-full bg-neutral-900 p-8 text-white" },
        children: ["header", "grid"],
      },
      header: {
        type: "h1",
        props: { className: "text-3xl font-bold mb-4" },
        children: "Collaborative Board",
      },
      grid: {
        type: "div",
        props: { className: "grid grid-cols-3 gap-4" },
        children: ["card1", "card2"],
      },
      card1: {
        type: "div",
        props: { className: "p-4 bg-neutral-800 rounded-xl" },
        children: "Card One",
      },
      card2: {
        type: "div",
        props: { className: "p-4 bg-neutral-800 rounded-xl" },
        children: "Card Two",
      },
    },
  },
  "settings-component": {
    id: "settings-component",
    rootId: "root",
    elements: {
      root: {
        type: "div",
        props: { className: "p-8 text-white" },
        children: "App Settings (Remote Component)",
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
        // On guest ready, inject the App configuration
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

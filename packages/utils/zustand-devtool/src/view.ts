import { controller } from "./controller.js";

export interface DevToolOptions {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const STYLES = `
  .ubento-zustand-devtool {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #e0e0e0;
    z-index: 999999;
  }

  .ubento-devtool-trigger {
    position: fixed;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #646cff;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(100, 108, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 999999;
  }

  .ubento-devtool-trigger:hover {
    transform: translateY(-2px) scale(1.05);
    background: #747bff;
    box-shadow: 0 6px 24px rgba(100, 108, 255, 0.5);
  }

  .ubento-devtool-trigger:active {
    transform: scale(0.95);
  }

  .ubento-devtool-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 500px;
    height: 100vh;
    background: #121212;
    box-shadow: -10px 0 30px rgba(0,0,0,0.5);
    display: none;
    flex-direction: row;
    z-index: 1000000;
    border-left: 1px solid #222;
    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .ubento-devtool-sidebar {
    width: 180px;
    border-right: 1px solid #222;
    display: flex;
    flex-direction: column;
    background: #0a0a0a;
  }

  .ubento-devtool-sidebar-header {
    padding: 20px 16px;
    font-weight: 700;
    border-bottom: 1px solid #222;
    font-size: 11px;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .ubento-devtool-stores-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
  }

  .ubento-devtool-store-item {
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
    color: #aaa;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 2px 8px;
    border-radius: 6px;
  }

  .ubento-devtool-store-item:hover {
    background: #1a1a1a;
    color: #eee;
  }

  .ubento-devtool-store-item.active {
    background: #646cff22;
    color: #646cff;
    font-weight: 600;
  }

  .ubento-devtool-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #121212;
  }

  .ubento-devtool-main-header {
    padding: 16px 20px;
    border-bottom: 1px solid #222;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #121212;
  }

  .ubento-devtool-title {
    font-weight: 600;
    font-size: 14px;
    color: #fff;
  }

  .ubento-devtool-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.6;
    background: #121212;
  }

  .ubento-devtool-close {
    background: #222;
    border: none;
    color: #888;
    cursor: pointer;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .ubento-devtool-close:hover {
    background: #333;
    color: #fff;
  }

  .ubento-devtool-empty-state {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444;
    font-style: italic;
  }

  pre { margin: 0; }
  .json-key { color: #9cdcfe; }
  .json-string { color: #ce9178; }
  .json-number { color: #b5cea8; }
  .json-boolean { color: #569cd6; }
  .json-null { color: #569cd6; }

  /* Custom scrollbar */
  .ubento-devtool-panel ::-webkit-scrollbar {
    width: 8px;
  }
  .ubento-devtool-panel ::-webkit-scrollbar-track {
    background: #0a0a0a;
  }
  .ubento-devtool-panel ::-webkit-scrollbar-thumb {
    background: #222;
    border-radius: 4px;
  }
  .ubento-devtool-panel ::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
`;

export class DevToolView {
  private root: HTMLDivElement | null = null;
  private trigger: HTMLButtonElement | null = null;
  private panel: HTMLDivElement | null = null;
  private sidebar: HTMLDivElement | null = null;
  private content: HTMLDivElement | null = null;
  private selectedStoreName: string | null = null;
  private unsubscribeStore: (() => void) | null = null;

  constructor(private options: DevToolOptions = {}) {
    if (typeof document === "undefined") return;
    this.injectStyles();
    this.init();
  }

  private injectStyles() {
    if (document.getElementById("ubento-devtool-styles")) return;
    const style = document.createElement("style");
    style.id = "ubento-devtool-styles";
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  private init() {
    this.root = document.createElement("div");
    this.root.className = "ubento-zustand-devtool";

    this.trigger = document.createElement("button");
    this.trigger.className = "ubento-devtool-trigger";
    this.trigger.title = "Open Zustand DevTool";
    this.trigger.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`;
    this.applyPosition(this.trigger);

    this.panel = document.createElement("div");
    this.panel.className = "ubento-devtool-panel";
    this.panel.innerHTML = `
      <div class="ubento-devtool-sidebar">
        <div class="ubento-devtool-sidebar-header">Stores</div>
        <div class="ubento-devtool-stores-list"></div>
      </div>
      <div class="ubento-devtool-main">
        <div class="ubento-devtool-main-header">
          <span class="ubento-devtool-title">Zustand Inspector</span>
          <button class="ubento-devtool-close" title="Close"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
        <div class="ubento-devtool-content">
          <div class="ubento-devtool-empty-state">Select a store to inspect state</div>
        </div>
      </div>
    `;

    this.sidebar = this.panel.querySelector(".ubento-devtool-stores-list");
    this.content = this.panel.querySelector(".ubento-devtool-content");
    const closeBtn = this.panel.querySelector(".ubento-devtool-close");

    this.trigger.onclick = (e: MouseEvent) => {
      e.stopPropagation();
      this.togglePanel();
    };
    (closeBtn as HTMLElement)!.onclick = (e: MouseEvent) => {
      e.stopPropagation();
      this.togglePanel();
    };

    this.root.appendChild(this.trigger);
    this.root.appendChild(this.panel);
    document.body.appendChild(this.root);

    controller.subscribe((state: any) => {
      this.renderSidebar(state.stores);
    });

    this.renderSidebar(controller.getState().stores);
  }

  private applyPosition(el: HTMLElement) {
    const pos = this.options.position || "bottom-right";
    const offset = "24px";
    el.style.top = "auto";
    el.style.bottom = "auto";
    el.style.left = "auto";
    el.style.right = "auto";

    switch (pos) {
      case "top-left":
        el.style.top = offset;
        el.style.left = offset;
        break;
      case "top-right":
        el.style.top = offset;
        el.style.right = offset;
        break;
      case "bottom-left":
        el.style.bottom = offset;
        el.style.left = offset;
        break;
      case "bottom-right":
        el.style.bottom = offset;
        el.style.right = offset;
        break;
    }
  }

  private togglePanel() {
    const isVisible = this.panel!.style.display === "flex";
    this.panel!.style.display = isVisible ? "none" : "flex";
    if (!isVisible && this.selectedStoreName) {
      this.selectStore(this.selectedStoreName);
    }
  }

  private renderSidebar(stores: any[]) {
    if (!this.sidebar) return;
    this.sidebar.innerHTML = "";
    stores.forEach((s: any) => {
      const item = document.createElement("div");
      item.className = "ubento-devtool-store-item";
      if (this.selectedStoreName === s.name) {
        item.classList.add("active");
      }
      item.textContent = s.name;
    (item as HTMLElement).onclick = (e: MouseEvent) => {
        e.stopPropagation();
        this.selectStore(s.name);
      };
      this.sidebar!.appendChild(item);
    });
  }

  private selectStore(name: string) {
    this.selectedStoreName = name;
    if (this.unsubscribeStore) {
      this.unsubscribeStore();
      this.unsubscribeStore = null;
    }

    const stores = controller.getState().stores;
    const storeObj = stores.find((s) => s.name === name);

    this.renderSidebar(stores);

    if (storeObj) {
      const titleEl = this.panel!.querySelector(".ubento-devtool-title");
      titleEl!.textContent = name;

      const updateContent = (state: any) => {
        if (this.content) {
          this.content.innerHTML = `<pre>${this.syntaxHighlight(state)}</pre>`;
        }
      };

      updateContent(storeObj.store.getState());
      this.unsubscribeStore = storeObj.store.subscribe(updateContent);
    }
  }

  private syntaxHighlight(json: any) {
    if (typeof json !== "string") {
      json = JSON.stringify(json, null, 2);
    }
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match: string) => {
        let cls = "json-number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "json-key";
          } else {
            cls = "json-string";
          }
        } else if (/true|false/.test(match)) {
          cls = "json-boolean";
        } else if (/null/.test(match)) {
          cls = "json-null";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  }
}

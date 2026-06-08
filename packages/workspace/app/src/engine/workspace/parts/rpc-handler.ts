import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  ServiceOperationResult,
} from "@ubento/bento.runtime";
import { createDuplexRpc, createWindowPort } from "@ubento/rpc";
import { ContextMenuContentItem } from "../../app/context_menu";
import type { WorkspaceEngine } from "../engine";

export class RpcHandler {
  constructor(
    private engine: WorkspaceEngine,
    private extra: {
      createBoard: (args: {
        title: string;
        parentId?: string | null;
      }) => Promise<any>;
      runServiceOperation: (args: {
        service: string;
        type: "query" | "action";
        name: string;
        args?: Record<string, unknown>;
      }) => Promise<ServiceOperationResult>;
    },
  ) {}

  async connect() {
    const { store, session, appEngine } = this.engine;
    store.setState({ status: "connected" });
    const state = store.getState();
    const styleTag = document.getElementById("theme-variables");
    const themeCss = styleTag?.innerHTML || "";

    return {
      initialState: {
        location: this.engine.getBentoLocation(),
        workspace: state.workspace,
        user: {
          name: session.name,
          email: session.email,
        },
        theme: {
          css: themeCss,
          isDark: document.documentElement.classList.contains("dark"),
        },
      },
      registryModuleUrlTemplate: appEngine.registryModuleUrlTemplate,
    };
  }

  async ready() {
    this.engine.store.setState({ status: "ready" });
  }

  async setTheme(isDark: boolean) {
    const { rpc, logger } = this.engine;
    if (rpc) {
      try {
        await rpc.egress.setTheme({ isDark });
      } catch (err) {
        logger.error(
          "Failed to propagate theme change to workspace runtime",
          err as any,
        );
      }
    }
  }

  // Stubbed events
  async select(selection: string[]) {}
  async hover(elementId: string) {}
  async unhover(elementId: string) {}
  async watchContextNode(path: string) {
    return "";
  }
  async unwatchContextNode(key: string, path?: string) {}

  init(target: Window) {
    const { appEngine, session, store, userSetting } = this.engine;

    const rpc = createDuplexRpc<
      BentoEngineHostRpcInterface,
      BentoEngineRuntimeRpcInterface
    >({
      port: createWindowPort(window, target),
      channel: "workspace",
      handlers: {
        connect: () => this.connect(),
        ready: () => this.ready(),
        goTo: (args) => this.engine.goTo(args),
        runServiceOperation: (args) => this.extra.runServiceOperation(args),
        createBoard: async (args) => {
          const title = args?.title || "";
          await this.extra.createBoard({
            title,
            parentId: (args as any)?.parentId,
          });
          return store.getState().workspace;
        },
        readModuleSource: async ({ moduleId, versionId }) => {
          let vId = versionId;
          if (!vId) {
            const mod = await appEngine.ubento.sdk.module.getModule(moduleId);
            vId = mod.latest_version_id || "";
          }
          const sourceCode =
            await appEngine.ubento.sdk.module.readModuleVersionFile(
              moduleId,
              vId,
              "index.tsx",
            );
          return { sourceCode };
        },
        getModuleRegistryAccessToken: async () => {
          const { token } = await appEngine.ubento.sdk.module.getRegistryToken([
            session.teamId,
          ]);
          return token;
        },
        onContextMenu: async ({ position }) => {
          const iframe = Array.from(document.querySelectorAll("iframe")).find(
            (el) => el.contentWindow === target,
          );
          let x = position.x;
          let y = position.y;
          if (iframe) {
            const rect = iframe.getBoundingClientRect();
            x += rect.left;
            y += rect.top;
          }

          const activeBoard = userSetting.getState().data.board;
          const wsSpec = this.engine.readWorkspaceSpec();
          const activeBoardDetails =
            activeBoard && wsSpec?.boards
              ? wsSpec.boards[activeBoard.id]
              : null;

          const content: ContextMenuContentItem[] = [
            {
              items: [
                {
                  id: "create-board",
                  label: "Create New Board",
                  action: () => {
                    const title = prompt("Enter board title:") || "New Board";
                    this.extra.createBoard({ title });
                  },
                },
                {
                  id: "reload",
                  label: "Reload Workspace",
                  action: () => {
                    appEngine.reloadWorkspace();
                  },
                },
                {
                  id: "go-home",
                  label: "Go to Home",
                  action: () => {
                    this.engine.goTo({ location: undefined });
                  },
                },
              ],
            },
          ];

          const currentMode = userSetting.getState().data.mode;
          const isEditing = currentMode === "edit";
          content.push({
            items: [
              {
                id: "edit-board",
                label: isEditing
                  ? "Exit edit mode"
                  : activeBoardDetails?.module
                    ? "Edit this board"
                    : "Switch to edit mode",
                action: () => {
                  if (isEditing) {
                    userSetting.update({
                      mode: "live",
                      editingModule: undefined,
                    });
                  } else {
                    if (activeBoardDetails) {
                      userSetting.update({
                        editingModule: activeBoardDetails.module,
                        mode: "edit",
                      });
                    } else {
                      userSetting.update({
                        mode: "edit",
                      });
                    }
                  }
                },
              },
            ],
          });

          appEngine.showContextMenu({ x, y }, content);
        },
      },
    });

    this.engine.rpc = rpc;

    rpc.watch((event) => {
      console.log(`[host.rpc.event] ${event.type}`, event);
    });

    rpc.run();

    const handleCloseMenu = () => {
      appEngine.closeContextMenu();
    };
    target.addEventListener("mousedown", handleCloseMenu);
    target.addEventListener("pointerdown", handleCloseMenu);
    this.engine.cleanupTargetListeners = () => {
      try {
        target.removeEventListener("mousedown", handleCloseMenu);
        target.removeEventListener("pointerdown", handleCloseMenu);
      } catch (e) {
        // target window might have been unloaded/destroyed
      }
    };
  }

  dispose() {
    this.engine.rpc?.dispose();
    this.engine.rpc = null;
    if (this.engine.cleanupTargetListeners) {
      this.engine.cleanupTargetListeners();
      this.engine.cleanupTargetListeners = null;
    }
  }
}

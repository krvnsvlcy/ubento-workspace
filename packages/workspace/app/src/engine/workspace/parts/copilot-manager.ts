import { getSpecOrDefault } from "@ubento/bento.runtime";
import { dequal } from "dequal/lite";
import { createUbentoCopilot } from "../../copilot/copilot";
import { createWorkspaceCopilotAgentEnvironment } from "../environment";
import type { WorkspaceEngine } from "../engine";

export class CopilotManager {
  public copilot: ReturnType<typeof createUbentoCopilot>;
  private unsubscribers: (() => void)[] = [];

  constructor(
    private engine: WorkspaceEngine,
    extra: {
      listComponents: () => Promise<any>;
      describeComponents: (names: string[]) => Promise<any>;
      createBoard: (args: { title: string }) => Promise<any>;
      updateBoard: (args: {
        boardId: string;
        update: { title?: string };
      }) => Promise<any>;
      deleteBoard: (args: { boardId: string }) => Promise<any>;
    },
  ) {
    const { store, appEngine, session, logger } = this.engine;

    const environment = createWorkspaceCopilotAgentEnvironment(
      {
        listComponents: extra.listComponents,
        describeComponents: extra.describeComponents,
        focusBoard: async ({ location }) => {
          this.engine.goTo({ location });
        },
        readNode: async (selector) => {
          const rpc = this.engine.rpc;
          if (!rpc) throw new Error("Runtime connection not established");
          return await rpc.egress.readNode({ selector });
        },
        clickNode: async (selector) => {
          const rpc = this.engine.rpc;
          if (!rpc) throw new Error("Runtime connection not established");
          await rpc.egress.clickNode({ selector });
        },
        setValue: async ({ selector, value }) => {
          const rpc = this.engine.rpc;
          if (!rpc) throw new Error("Runtime connection not established");
          await rpc.egress.setValue({ selector, value });
        },
        getValue: async (selector) => {
          const rpc = this.engine.rpc;
          if (!rpc) throw new Error("Runtime connection not established");
          return await rpc.egress.getValue({ selector });
        },
        readLogs: async ({ from, count }) => {
          const rpc = this.engine.rpc;
          if (!rpc) throw new Error("Runtime connection not established");
          return await rpc.egress.readLogs({ from, count });
        },
        getServices: async () => {
          const spec = this.engine.readWorkspaceSpec();
          return spec?.services;
        },
        getServiceSpec: async (serviceChannelId) => {
          return appEngine.ubento.sdk.vertex.getServiceChannelSpec(
            serviceChannelId,
          );
        },
        goTo: (args) => this.engine.goTo(args),
        updateBoard: extra.updateBoard,
        deleteBoard: extra.deleteBoard,
        createBoard: extra.createBoard,
        listBoards: async () => {
          const spec = this.engine.readWorkspaceSpec();
          if (!spec || !spec.boards) return [];
          return Object.values(spec.boards).map((b: any) => ({
            id: b.id,
            title: b.title || b.name || "",
            children: b.children || [],
            module: b.module,
          }));
        },
        withCopilotChanges: <T>(
          run: () => Promise<T> | T,
          getPaths: (result: T) => string[],
        ) => this.withCopilotChanges(run, getPaths),
      },
      {
        session,
        ubento: appEngine.ubento,
        logger,
        workspaceId: store.getState().workspace.id,
        getWorkspaceSpec: () => store.getState().workspace.spec,
        updateWorkspaceSpec: async (spec) => {
          this.engine.updateWorkspaceSpec({ spec, overwrite: true });
        },
      },
    );

    this.copilot = createUbentoCopilot({
      environment,
      mainAgentName: "copilot",
    });

    this.setupSubscriptions();
  }

  private setupSubscriptions() {
    const { store } = this.engine;

    const handleWorkspaceChange = () => {
      const ws = store.getState().workspace;
      const services = ws.spec.isValid
        ? Object.keys(ws.spec.data.services ?? {})
        : [];

      this.copilot.setContextAttachments("current-workspace", [
        {
          type: "current-workspace",
          data: {
            id: ws.id,
            title: ws.title,
            services,
          },
        },
      ]);
    };

    const unsubscribeWorkspaceCopilot = store.subscribe(
      (curr: any, prev: any) => {
        if (!dequal(curr.workspace, prev.workspace)) {
          handleWorkspaceChange();
        }
      },
    );
    handleWorkspaceChange();

    const handleLocationChange = () => {
      const location = this.engine.getBentoLocation();
      this.engine.rpc?.egress.setLocation({ location });

      if (location) {
        const spec = getSpecOrDefault(store.getState().workspace.spec, {
          version: 1,
          services: {},
          modules: {},
          moduleGroups: {},
          rootModuleGroups: [],
          packages: {},
          boards: {},
          roots: [],
        });

        this.copilot.setContextAttachments("current-location", [
          {
            type: "current-location",
            data: {
              ...location,
              boardTitle: spec.boards?.[location.boardId]?.title,
            },
          },
        ]);
      } else {
        this.copilot.setContextAttachments("current-location", []);
      }
    };

    const unsubscribeEngine = this.engine.userSetting.subscribe(
      (curr: any, prev: any) => {
        if (
          curr.data.board?.id !== prev.data.board?.id ||
          !dequal(curr.data.board?.params, prev.data.board?.params)
        ) {
          handleLocationChange();
        }
      },
    );

    this.unsubscribers.push(unsubscribeWorkspaceCopilot, unsubscribeEngine);
  }

  public destroy() {
    for (const unsub of this.unsubscribers) {
      unsub();
    }
  }

  async withCopilotChanges<T>(
    run: () => Promise<T> | T,
    getPaths: (result: T) => string[],
  ): Promise<T> {
    const { store } = this.engine;
    store.setState((state) => {
      let changes = state.copilotChanges;
      if (!changes) {
        const spec = this.engine.readWorkspaceSpec();
        if (spec) {
          changes = {
            checkpoint: JSON.parse(JSON.stringify(spec)),
            items: [],
          };
        }
      }
      if (!changes) return {};
      return { copilotChanges: changes };
    });

    const result = await run();

    const paths = getPaths(result);
    store.setState((state) => {
      let changes = state.copilotChanges;
      if (!changes) return {};

      const nextItems = [...changes.items];
      for (const path of paths) {
        if (!nextItems.includes(path)) {
          nextItems.push(path);
        }
      }

      return {
        copilotChanges: {
          ...changes,
          items: nextItems,
        },
      };
    });

    return result;
  }

  approveCopilotChange(path: string) {
    const { store } = this.engine;
    const state = store.getState();
    const changes = state.copilotChanges;
    if (!changes) return;

    const specWrap = store.getState().workspace.spec;
    if (!specWrap || !specWrap.isValid) return;
    const currentSpec = specWrap.data;

    const [category, id] = path.split(".");
    const newCheckpoint = JSON.parse(JSON.stringify(changes.checkpoint));

    if (category === "boards") {
      newCheckpoint.boards = { ...newCheckpoint.boards };
      if (currentSpec.boards?.[id]) {
        newCheckpoint.boards[id] = currentSpec.boards[id];
      } else {
        delete newCheckpoint.boards[id];
      }
    } else if (category === "services") {
      newCheckpoint.services = { ...newCheckpoint.services };
      if (currentSpec.services?.[id]) {
        newCheckpoint.services[id] = currentSpec.services[id];
      } else {
        delete newCheckpoint.services[id];
      }
    } else if (category === "modules") {
      newCheckpoint.modules = { ...newCheckpoint.modules };
      if (currentSpec.modules?.[id]) {
        newCheckpoint.modules[id] = currentSpec.modules[id];
      } else {
        delete newCheckpoint.modules[id];
      }
    } else if (category === "packages") {
      newCheckpoint.packages = { ...newCheckpoint.packages };
      if (currentSpec.packages?.[id]) {
        newCheckpoint.packages[id] = currentSpec.packages[id];
      } else {
        delete newCheckpoint.packages[id];
      }
    }

    const nextItems = changes.items.filter((item) => item !== path);

    if (nextItems.length === 0) {
      store.setState({ copilotChanges: undefined });
    } else {
      store.setState({
        copilotChanges: {
          checkpoint: newCheckpoint,
          items: nextItems,
        },
      });
    }
  }

  async denyCopilotChange(path: string) {
    const { store } = this.engine;
    const state = store.getState();
    const changes = state.copilotChanges;
    if (!changes) return;

    const specWrap = store.getState().workspace.spec;
    if (!specWrap || !specWrap.isValid) return;
    const currentSpec = specWrap.data;

    const [category, id] = path.split(".");
    const checkpointSpec = changes.checkpoint;

    const updatedSpec = JSON.parse(JSON.stringify(currentSpec));

    if (category === "boards") {
      updatedSpec.boards = { ...updatedSpec.boards };
      if (checkpointSpec.boards?.[id]) {
        updatedSpec.boards[id] = checkpointSpec.boards[id];
      } else {
        delete updatedSpec.boards[id];
      }
    } else if (category === "services") {
      updatedSpec.services = { ...updatedSpec.services };
      if (checkpointSpec.services?.[id]) {
        updatedSpec.services[id] = checkpointSpec.services[id];
      } else {
        delete updatedSpec.services[id];
      }
    } else if (category === "modules") {
      updatedSpec.modules = { ...updatedSpec.modules };
      if (checkpointSpec.modules?.[id]) {
        updatedSpec.modules[id] = checkpointSpec.modules[id];
      } else {
        delete updatedSpec.modules[id];
      }
    } else if (category === "packages") {
      updatedSpec.packages = { ...updatedSpec.packages };
      if (checkpointSpec.packages?.[id]) {
        updatedSpec.packages[id] = checkpointSpec.packages[id];
      } else {
        delete updatedSpec.packages[id];
      }
    }

    this.engine.updateWorkspaceSpec({ spec: updatedSpec, overwrite: true });

    store.setState((s) => {
      if (!s.copilotChanges) return {};
      const nextItems = s.copilotChanges.items.filter((item) => item !== path);
      if (nextItems.length === 0) {
        return { copilotChanges: undefined };
      }
      return {
        copilotChanges: {
          ...s.copilotChanges,
          items: nextItems,
        },
      };
    });
  }

  approveAllCopilotChanges() {
    this.engine.store.setState({ copilotChanges: undefined });
  }

  async denyAllCopilotChanges() {
    const { store } = this.engine;
    const state = store.getState();
    const changes = state.copilotChanges;
    if (!changes) return;

    this.engine.updateWorkspaceSpec({
      spec: changes.checkpoint,
      overwrite: true,
    });
    store.setState({ copilotChanges: undefined });
  }
}

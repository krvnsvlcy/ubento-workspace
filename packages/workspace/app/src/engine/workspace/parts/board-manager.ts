import { WorkspaceBoardSpec } from "@ubento/bento.runtime";
import type { WorkspaceEngine } from "../engine";
import { WorkspaceState } from "./types";

export class BoardManager {
  constructor(private engine: WorkspaceEngine) {}

  async updateWorkspace(data: Partial<WorkspaceState>) {
    const { store, appEngine } = this.engine;
    const current = store.getState().workspace;
    if (!current) return;
    const updated = { ...current, ...data } as any;
    await appEngine.ubento.workspace.updateWorkspace(current.id, updated);
    store.setState({ workspace: updated });
  }

  async updateBoard({
    boardId,
    update,
  }: {
    boardId: string;
    update: { title?: string; parentId?: string | null };
  }) {
    const wsSpec = this.engine.readWorkspaceSpec();
    if (!wsSpec || !wsSpec.boards) return;

    const boards = { ...wsSpec.boards };
    const board = boards[boardId];
    if (!board) return;

    if (update.title !== undefined) {
      boards[boardId] = {
        ...board,
        title: update.title,
      };
    }

    this.engine.updateWorkspaceSpec({
      spec: {
        boards,
      },
    });
  }

  async deleteBoard({ boardId }: { boardId: string }) {
    const wsSpec = this.engine.readWorkspaceSpec();
    if (!wsSpec) return;

    const boards = { ...(wsSpec.boards || {}) };
    const board = boards[boardId];
    if (!board) return;

    const collectChildIds = (id: string, ids: Set<string>) => {
      ids.add(id);
      const b = boards[id];
      if (b?.children) {
        for (const childId of b.children) {
          collectChildIds(childId, ids);
        }
      }
    };

    const idsToDelete = new Set<string>();
    collectChildIds(boardId, idsToDelete);

    for (const id of idsToDelete) {
      delete boards[id];
    }

    for (const id in boards) {
      const b = boards[id];
      if (b.children && b.children.includes(boardId)) {
        boards[id] = {
          ...b,
          children: b.children.filter((cid: string) => cid !== boardId),
        };
      }
    }

    const workspaceRoots = (wsSpec.roots || []).filter(
      (cid: string) => cid !== boardId,
    );

    this.engine.updateWorkspaceSpec({
      spec: {
        boards,
        roots: workspaceRoots,
      },
    });
  }

  async createBoard({
    title,
    parentId,
  }: {
    title: string;
    parentId?: string | null;
    spec?: any;
    index?: string | null;
  }): Promise<WorkspaceBoardSpec> {
    const { appEngine, session } = this.engine;
    const newModule = await appEngine.ubento.sdk.module.createModule({
      name: title,
      team_id: session.teamId,
      source: `export default function Board() {\n  return (\n    <div className="p-8 bg-surface/10 rounded-2xl border border-border">\n      <h1 className="text-2xl font-bold mb-4">${title}</h1>\n      <p className="text-content-muted">Start editing this board module in code.</p>\n    </div>\n  );\n}`,
      scope: "private",
      type: "board",
    });

    const boardId = Math.random().toString(36).substring(7);

    const wsSpec = this.engine.readWorkspaceSpec();
    const boards = { ...(wsSpec?.boards || {}) };

    const board: WorkspaceBoardSpec = {
      id: boardId,
      title,
      module: {
        id: newModule.id,
        versionId: newModule.latest_version_id || "",
      },
      children: [],
    };
    boards[boardId] = board;

    let workspaceRoots = [...(wsSpec?.roots || [])];
    if (parentId) {
      const parentBoard = boards[parentId];
      if (parentBoard) {
        boards[parentId] = {
          ...parentBoard,
          children: [...(parentBoard.children || []), boardId],
        };
      }
    } else {
      workspaceRoots.push(boardId);
    }

    this.engine.updateWorkspaceSpec({
      spec: {
        boards,
        roots: workspaceRoots,
      },
    });

    return board;
  }

  getModuleReferences({
    id,
    versionId,
  }: {
    id: string;
    versionId: string;
  }) {
    const wsSpec = this.engine.readWorkspaceSpec();
    const refs: { source: "board" | "module" | "component"; name: string }[] =
      [];
    if (!wsSpec) return refs;

    if (wsSpec.boards) {
      for (const board of Object.values(wsSpec.boards) as any[]) {
        if (board.module?.id === id && board.module?.versionId === versionId) {
          refs.push({ source: "board", name: board.title });
        }
      }
    }

    if (wsSpec.modules) {
      for (const [name, mod] of Object.entries(wsSpec.modules) as [string, any][]) {
        if (mod.id === id && mod.versionId === versionId) {
          refs.push({ source: "module", name });
        }
      }
    }

    return refs;
  }

  async updateModuleReferences({
    refs,
    module,
  }: {
    refs: { source: "board" | "module" | "component"; name: string }[];
    module: { id: string; versionId: string };
  }) {
    const wsSpec = this.engine.readWorkspaceSpec();
    if (!wsSpec) return;

    const boards = wsSpec.boards ? { ...wsSpec.boards } as Record<string, any> : {};
    const modules = wsSpec.modules ? { ...wsSpec.modules } as Record<string, any> : {};

    for (const ref of refs) {
      if (ref.source === "board") {
        for (const [boardId, board] of Object.entries(boards) as [string, any][]) {
          if (board.title === ref.name) {
            boards[boardId] = {
              ...board,
              module,
            };
          }
        }
      } else if (ref.source === "module") {
        modules[ref.name] = module;
      }
    }

    this.engine.updateWorkspaceSpec({
      spec: {
        boards,
        modules,
      },
    });
  }
}

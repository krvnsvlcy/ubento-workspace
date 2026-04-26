import { ubentoAuth } from "@ubento/primitives";
import {
  chain,
  dataResponse,
  enforce,
  NotFoundError,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import z from "zod";
import { getWorkspace } from "../entities/workspace/workspace.js";
import {
  createBoard,
  deleteBoard,
  getBoard,
  listBoards,
  updateBoard,
} from "../entities/board.js";

const boardsRouter: Router = Router();

// List Boards
boardsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        workspace_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.board.list],
      resource: async (req) => {
        const workspace_id = req.query.workspace_id as string;
        const workspace = await getWorkspace(workspace_id);
        if (!workspace) throw new NotFoundError("Workspace not found");
        return ubentoAuth.scopes.workspaceOrHigher({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const boards = await listBoards(req.query.workspace_id as string);
      res.json(dataResponse(boards));
    },
  ),
);

// Get Board
boardsRouter.get(
  "/:board_id",
  chain(
    validate({
      params: z.object({
        board_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.board.read],
      resource: async (req) => {
        const board_id = req.params.board_id as string;
        const board = await getBoard(board_id);
        if (!board) throw new NotFoundError("Board not found");
        const workspace = await getWorkspace(board.workspace_id);
        if (!workspace) throw new NotFoundError("Workspace not found");
        return ubentoAuth.scopes.workspaceOrHigher({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const board = await getBoard(req.params.board_id);
      if (!board) {
        throw new NotFoundError("Board not found");
      }
      res.json(dataResponse(board));
    },
  ),
);

// Create Board
boardsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        workspace_id: z.string(),
        name: z.string(),
        data: z.any(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.board.create],
      resource: async (req) => {
        const workspace = await getWorkspace(req.body.workspace_id);
        if (!workspace) throw new NotFoundError("Workspace not found");
        return ubentoAuth.scopes.workspaceOrHigher({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const board = await createBoard(req.body);
      res.json(dataResponse(board));
    },
  ),
);

// Update Board
boardsRouter.patch(
  "/:board_id",
  chain(
    validate({
      params: z.object({
        board_id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        path: z.string().optional(),
        data: z.any().optional(),
        metadata: z.any().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.board.update],
      resource: async (req) => {
        const board_id = req.params.board_id as string;
        const board = await getBoard(board_id);
        if (!board) throw new NotFoundError("Board not found");
        const workspace = await getWorkspace(board.workspace_id);
        if (!workspace) throw new NotFoundError("Workspace not found");
        return ubentoAuth.scopes.workspaceOrHigher({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const board = await updateBoard(req.params.board_id, req.body);
      res.json(dataResponse(board));
    },
  ),
);

// Delete Board
boardsRouter.delete(
  "/:board_id",
  chain(
    validate({
      params: z.object({
        board_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.board.delete],
      resource: async (req) => {
        const board_id = req.params.board_id as string;
        const board = await getBoard(board_id);
        if (!board) throw new NotFoundError("Board not found");
        const workspace = await getWorkspace(board.workspace_id);
        if (!workspace) throw new NotFoundError("Workspace not found");
        return ubentoAuth.scopes.workspaceOrHigher({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      await deleteBoard(req.params.board_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default boardsRouter;

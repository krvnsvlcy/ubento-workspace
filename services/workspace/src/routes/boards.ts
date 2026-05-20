import { ubentoAuth } from "@ubento/services.primitives";
import {
  chain,
  dataResponse,
  enforce,
  NotFoundError,
  validate,
} from "@ubento/services.toolkit";
import { Router } from "express";
import z from "zod";
import {
  createBoard,
  deleteBoard,
  getBoard,
  listBoards,
  updateBoard,
} from "../entities/board.js";
import { getWorkspace } from "../entities/workspace/workspace.js";

const boardsRouter: Router = Router();

// List Boards
boardsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        workspace_id: z.string(),
        parent_id: z.string().optional(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.board.list],
      scope: async (req) => {
        const workspace_id = req.query.workspace_id as string;
        const workspace = await getWorkspace(workspace_id);
        if (!workspace) return ubentoAuth.scopes.root;
        return ubentoAuth.scopes.workspace({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const result = await listBoards({
        workspace_id: req.query.workspace_id as string,
        parent_id: req.query.parent_id as string | undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      res.json(result);
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
      scope: async (req) => {
        const board_id = req.params.board_id as string;
        const board = await getBoard(board_id);
        if (!board) throw new NotFoundError("Board not found");
        const workspace = await getWorkspace(board.workspace_id);
        if (!workspace) throw new NotFoundError("Workspace not found");
        return ubentoAuth.scopes.workspace({
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
        parent_id: z.string().optional(),
        name: z.string(),
        data: z.any(),
        index: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.board.create],
      scope: async (req) => {
        const workspace = await getWorkspace(req.body.workspace_id);
        if (!workspace) throw new NotFoundError("Workspace not found");
        return ubentoAuth.scopes.workspace({
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
        parent_id: z.string().nullable().optional(),
        data: z.any().optional(),
        index: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.board.update],
      scope: async (req) => {
        const board_id = req.params.board_id as string;
        const board = await getBoard(board_id);
        if (!board) throw new NotFoundError("Board not found");
        const workspace = await getWorkspace(board.workspace_id);
        if (!workspace) throw new NotFoundError("Workspace not found");
        return ubentoAuth.scopes.workspace({
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
      scope: async (req) => {
        const board_id = req.params.board_id as string;
        const board = await getBoard(board_id);
        if (!board) throw new NotFoundError("Board not found");
        const workspace = await getWorkspace(board.workspace_id);
        if (!workspace) throw new NotFoundError("Workspace not found");
        return ubentoAuth.scopes.workspace({
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

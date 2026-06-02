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
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  listWorkspaces,
  updateWorkspace,
} from "../entities/workspace/workspace.js";

const workspacesRouter: Router = Router();

// List Workspaces
workspacesRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.workspace.list],
      scope: (req) => {
        if (req.query.team_id) {
          return ubentoAuth.scopes.team({
            team_id: req.query.team_id as string,
          });
        }
        return ubentoAuth.scopes.root;
      },
    }),
    async (req, res) => {
      const result = await listWorkspaces({
        team_id: req.query.team_id as string | undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      res.json(result);
    },
  ),
);

// Get Workspace
workspacesRouter.get(
  "/:workspace_id",
  chain(
    validate({
      params: z.object({
        workspace_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.workspace.read],
      scope: async (req) => {
        const workspace = await getWorkspace(req.params.workspace_id as string);
        if (!workspace) throw new NotFoundError("Workspace not found");

        // Cache the workspace on the request to avoid a double DB query
        (req as any).resolvedWorkspace = workspace;
        return ubentoAuth.scopes.workspace({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      // Use the cached workspace
      const workspace = (req as any).resolvedWorkspace;
      res.json(dataResponse(workspace));
    },
  ),
);

// Create Workspace
workspacesRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        title: z.string(),
        metadata: z.any(),
        team_id: z.string(),
        data: z.any(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.workspace.create],
      scope: (req) =>
        ubentoAuth.scopes.team({
          team_id: req.body.team_id as string,
        }),
    }),
    async (req, res) => {
      const workspace = await createWorkspace(req.body);
      res.json(dataResponse(workspace));
    },
  ),
);

// Update Workspace
workspacesRouter.patch(
  "/:workspace_id",
  chain(
    validate({
      params: z.object({
        workspace_id: z.string(),
      }),
      body: z.object({
        title: z.string().optional(),
        metadata: z.any().optional(),
        data: z.any().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.workspace.update],
      scope: async (req) => {
        const workspace = await getWorkspace(req.params.workspace_id as string);
        if (!workspace) throw new NotFoundError("Workspace not found");

        return ubentoAuth.scopes.workspace({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const workspace = await updateWorkspace(
        req.params.workspace_id,
        req.body,
      );
      res.json(dataResponse(workspace));
    },
  ),
);

// Delete Workspace
workspacesRouter.delete(
  "/:workspace_id",
  chain(
    validate({
      params: z.object({
        workspace_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.workspace.delete],
      scope: async (req) => {
        const workspace = await getWorkspace(req.params.workspace_id as string);
        if (!workspace) throw new NotFoundError("Workspace not found");

        return ubentoAuth.scopes.workspace({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      await deleteWorkspace(req.params.workspace_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default workspacesRouter;

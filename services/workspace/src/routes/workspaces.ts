import { ubentoAuth } from "@ubento/primitives";
import {
  chain,
  dataResponse,
  enforce,
  makeCursorPageResponse,
  NotFoundError,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import z from "zod";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  getWorkspaceBySlug,
  listWorkspaces,
  updateWorkspace,
} from "../entities/workspace/workspace.js";

const workspacesRouter: Router = Router();

// Get Workspace by Slug
workspacesRouter.get(
  "/slug/:slug",
  chain(
    validate({
      params: z.object({
        slug: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.workspace.read],
      resource: async (req) => {
        const workspace = await getWorkspaceBySlug(req.params.slug as string);
        if (!workspace) throw new NotFoundError("Workspace not found");

        // Cache the workspace on the request to avoid a double DB query
        (req as any).resolvedWorkspace = workspace;
        return ubentoAuth.scopes.workspaceOrHigher({
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
      resource: (req) =>
        ubentoAuth.scopes.teamOrHigher({
          team_id: req.query.team_id as string | undefined,
        }),
    }),
    async (req, res) => {
      const result = await listWorkspaces({
        team_id: req.query.team_id as string | undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      res.json(makeCursorPageResponse(result));
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
      resource: async (req) => {
        const workspace = await getWorkspace(req.params.workspace_id as string);
        if (!workspace) throw new NotFoundError("Workspace not found");

        // Cache the workspace on the request to avoid a double DB query
        (req as any).resolvedWorkspace = workspace;
        return ubentoAuth.scopes.workspaceOrHigher({
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
        name: z.string(),
        slug: z.string().optional(),
        description: z.string().optional(),
        team_id: z.string(),
        data: z.any(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.workspace.create],
      resource: (req) =>
        ubentoAuth.scopes.teamOrHigher({
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
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        data: z.any().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.workspace.update],
      resource: async (req) => {
        const workspace = await getWorkspace(req.params.workspace_id as string);
        if (!workspace) throw new NotFoundError("Workspace not found");

        return ubentoAuth.scopes.workspaceOrHigher({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const workspace = await updateWorkspace(req.params.workspace_id, req.body);
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
      resource: async (req) => {
        const workspace = await getWorkspace(req.params.workspace_id as string);
        if (!workspace) throw new NotFoundError("Workspace not found");

        return ubentoAuth.scopes.workspaceOrHigher({
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

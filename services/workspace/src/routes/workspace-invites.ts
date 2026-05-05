import { ubentoAuth } from "@ubento/services.primitives";
import {
  chain,
  dataResponse,
  enforce,
  makeCursorPageResponse,
  validate,
} from "@ubento/services.toolkit";
import { Router } from "express";
import z from "zod";
import {
  acceptWorkspaceInvite,
  createWorkspaceInvite,
  listWorkspaceInvites,
} from "../entities/workspace/workspace-invites.js";
import { getWorkspace } from "../entities/workspace/workspace.js";

const workspaceInvitesRouter: Router = Router();

workspaceInvitesRouter.get(
  "/:workspace_id",
  chain(
    validate({
      params: z.object({
        workspace_id: z.string(),
      }),
      query: z.object({
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.list],
      resource: async (req) => {
        const workspace_id = req.params.workspace_id as string;
        const workspace = await getWorkspace(workspace_id);
        if (!workspace) return ubentoAuth.scopes.root;
        return ubentoAuth.scopes.workspaceOrHigher({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const workspace_id = req.params.workspace_id as string;
      const result = await listWorkspaceInvites({
        workspace_id,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      res.json(makeCursorPageResponse(result));
    },
  ),
);

workspaceInvitesRouter.post(
  "/:workspace_id",
  chain(
    validate({
      params: z.object({
        workspace_id: z.string(),
      }),
      query: z.object({
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.read],
      resource: async (req) => {
        const workspace_id = req.params.workspace_id as string;
        const workspace = await getWorkspace(workspace_id);
        if (!workspace) return ubentoAuth.scopes.root;
        return ubentoAuth.scopes.workspaceOrHigher({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const workspace_id = req.params.workspace_id as string;
      const invitedBy = (req as any).auth?.subject || "system";
      const result = await createWorkspaceInvite({
        workspace_id,
        email: req.body.email,
        role: req.body.role,
        invited_by: invitedBy,
      });
      res.status(201).json(dataResponse(result));
    },
  ),
);

workspaceInvitesRouter.post(
  "/:id/accept",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        token: z.string(),
      }),
    }),
    async (req, res) => {
      const acceptedBy = (req as any).auth?.subject;
      if (!acceptedBy) return res.status(401).send("Not authenticated");

      const result = await acceptWorkspaceInvite({
        id: req.params.id as string,
        token: req.body.token,
        accepted_by: acceptedBy,
      });
      res.json(dataResponse(result));
    },
  ),
);

export default workspaceInvitesRouter;

import { ubentoAuth } from "@ubento/services.primitives";
import {
  chain,
  dataResponse,
  enforce,
  validate,
} from "@ubento/services.toolkit";
import { Router } from "express";
import z from "zod";
import {
  addMemberToWorkspace,
  getWorkspaceMembership,
  listWorkspaceMemberships,
  removeMemberFromWorkspace,
} from "../entities/workspace/workspace-memberships.js";
import { getWorkspace } from "../entities/workspace/workspace.js";

const workspaceMembershipsRouter: Router = Router();

// List Workspace Memberships
workspaceMembershipsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        workspace_id: z.string().optional(),
        user_id: z.string().optional(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.list],
      scope: async (req) => {
        if (req.query.workspace_id) {
          const workspace = await getWorkspace(
            req.query.workspace_id as string,
          );
          if (workspace) {
            return ubentoAuth.scopes.workspace({
              team_id: workspace.team_id,
              workspace_id: workspace.id,
            });
          }
        }
        return ubentoAuth.scopes.root;
      },
    }),
    async (req, res) => {
      const result = await listWorkspaceMemberships({
        workspace_id: req.query.workspace_id as string | undefined,
        user_id: req.query.user_id as string | undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      res.json(result);
    },
  ),
);

// Create Workspace Membership
workspaceMembershipsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        workspace_id: z.string(),
        user_id: z.string(),
        role: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.create],
      scope: async (req) => {
        const workspace = await getWorkspace(req.body.workspace_id);
        if (!workspace) return ubentoAuth.scopes.root;
        return ubentoAuth.scopes.workspace({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      const membership = await addMemberToWorkspace({
        workspace_id: req.body.workspace_id,
        user_id: req.body.user_id,
        role: req.body.role,
      });
      res.status(201).json(dataResponse(membership));
    },
  ),
);

// Delete Workspace Membership
workspaceMembershipsRouter.delete(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.delete],
      scope: async (req) => {
        const membership = await getWorkspaceMembership(
          req.params.id as string,
        );
        if (!membership) return ubentoAuth.scopes.root;
        const workspace = await getWorkspace(membership.workspace_id);
        if (!workspace) return ubentoAuth.scopes.root;
        return ubentoAuth.scopes.workspace({
          team_id: workspace.team_id,
          workspace_id: workspace.id,
        });
      },
    }),
    async (req, res) => {
      await removeMemberFromWorkspace(req.params.id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default workspaceMembershipsRouter;

import { ubentoApi } from "@ubento/primitives";
import {
  chain,
  dataResponse,
  enforce,
  NotFoundError,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import z from "zod";
import {
  acceptInviteByToken,
  getOrganizationInvite,
  resolveInviteByToken,
  revokeOrganizationInvite,
} from "../../entities/management/organization/invites.js";

const invitesRouter = Router();

// Get Invite
invitesRouter.get(
  "/:invite_id",
  chain(
    validate({
      params: z.object({
        invite_id: z.string(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.organizationInvite.read),
    async (req, res) => {
      const invite = await getOrganizationInvite(req.params.invite_id);
      if (!invite) {
        throw new NotFoundError("Invite not found");
      }
      res.json(dataResponse(invite));
    },
  ),
);

// Revoke Invite
invitesRouter.post(
  "/:invite_id/revoke",
  chain(
    validate({
      params: z.object({
        invite_id: z.string(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.organizationInvite.revoke),
    async (req, res) => {
      const userId = (req as any).user?.id || "temp-user-id";
      const invite = await revokeOrganizationInvite(
        req.params.invite_id,
        userId,
      );
      res.json(dataResponse(invite));
    },
  ),
);

// Resolve Invite by Token
invitesRouter.post(
  "/resolve",
  chain(
    validate({
      body: z.object({
        token: z.string(),
      }),
    }),
    async (req, res) => {
      const result = await resolveInviteByToken(req.body.token);
      res.json(dataResponse(result));
    },
  ),
);

// Accept Invite by Token
invitesRouter.post(
  "/accept",
  chain(
    validate({
      body: z.object({
        token: z.string(),
      }),
    }),
    async (req, res) => {
      const userId = (req as any).user?.id || "temp-user-id";
      const result = await acceptInviteByToken({
        token: req.body.token,
        accepted_by: userId,
      });
      res.json(dataResponse(result));
    },
  ),
);

export default invitesRouter;

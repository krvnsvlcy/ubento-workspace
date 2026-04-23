import { ubentoAuth } from "@ubento/primitives";
import {
  chain,
  dataResponse,
  enforce,
  NotFoundError,
  parseStringListQuery,
  parseStringQuery,
  setNextLink,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import z from "zod";
import {
  createTeamInvite,
  listTeamInvites,
} from "../../entities/management/team/invites.js";
import {
  createTeam,
  deleteTeam,
  getTeam,
  getTeamByHandle,
  listTeams,
  updateTeam,
} from "../../entities/management/team/team.js";

const teamsRouter: Router = Router();

// List Teams
teamsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
        ids: z.string().optional(),
        name: z.string().optional(),
        handle: z.string().optional(),
      }),
    }),
    enforce(ubentoAuth.actions.team.list),
    async (req, res) => {
      const { items: teams, nextCursor } = await listTeams({
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
        ids: parseStringListQuery(req, "ids"),
        name: parseStringQuery(req, "name"),
        handle: parseStringQuery(req, "handle"),
      });
      setNextLink(req, res, nextCursor);
      res.json(dataResponse(teams));
    },
  ),
);

// Create Team
teamsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        name: z.string(),
        handle: z.string(),
        owner: z.string(),
      }),
    }),
    enforce(ubentoAuth.actions.team.create),
    async (req, res) => {
      const { name, handle, owner } = req.body;

      const team = await createTeam({
        name,
        handle,
        members: [{ user_id: owner, role: ubentoAuth.roles.team.owner }],
      });
      res.status(201).json(dataResponse(team));
    },
  ),
);

// Check Team Handle
teamsRouter.post(
  "/check-handle",
  chain(
    validate({
      body: z.object({
        handle: z.string(),
      }),
    }),
    enforce(ubentoAuth.actions.team.create),
    async (req, res) => {
      const { handle } = req.body;

      const team = await getTeamByHandle(handle);
      res.status(201).json({
        handle,
        available: !team,
      });
    },
  ),
);

// Get Team
teamsRouter.get(
  "/:team_id",
  chain(
    validate({
      params: z.object({
        team_id: z.string(),
      }),
    }),
    enforce(ubentoAuth.actions.team.read),
    async (req, res) => {
      const team = await getTeam(req.params.team_id);
      if (!team) {
        throw new NotFoundError("Team not found");
      }
      res.json(dataResponse(team));
    },
  ),
);

// Update Team
teamsRouter.patch(
  "/:team_id",
  chain(
    validate({
      params: z.object({
        team_id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        handle: z.string().optional(),
      }),
    }),
    enforce(ubentoAuth.actions.team.update),
    async (req, res) => {
      const team = await updateTeam(req.params.team_id, {
        name: req.body.name,
        handle: req.body.handle,
      });
      if (!team) {
        throw new NotFoundError("Team not found");
      }
      res.json(dataResponse(team));
    },
  ),
);

// Delete Team
teamsRouter.delete(
  "/:team_id",
  chain(
    validate({
      params: z.object({
        team_id: z.string(),
      }),
    }),
    enforce(ubentoAuth.actions.team.delete),
    async (req, res) => {
      await deleteTeam(req.params.team_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

// List Team Invites
teamsRouter.get(
  "/:team_id/invites",
  chain(
    validate({
      params: z.object({
        team_id: z.string(),
      }),
      query: z.object({
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
        statuses: z.string().optional(),
        email: z.string().optional(),
      }),
    }),
    enforce(ubentoAuth.actions.teamInvite.list),
    async (req, res) => {
      const { items: invites, nextCursor } = await listTeamInvites({
        team_id: req.params.team_id as string,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
        statuses: parseStringListQuery(req, "statuses") as any,
        email: parseStringQuery(req, "email"),
      });
      setNextLink(req, res, nextCursor);
      res.json(dataResponse(invites));
    },
  ),
);

// Create Team Invite
teamsRouter.post(
  "/:team_id/invites",
  chain(
    validate({
      params: z.object({
        team_id: z.string(),
      }),
      body: z.object({
        email: z.string().email(),
        role: z.string(),
        expires_in_seconds: z.number().min(60).optional(),
      }),
    }),
    enforce(ubentoAuth.actions.teamInvite.create),
    async (req, res) => {
      const invitedBy = (req as any).user?.id || "temp-user-id";
      const result = await createTeamInvite({
        team_id: req.params.team_id,
        email: req.body.email,
        role: req.body.role,
        invited_by: invitedBy,
        expires_in_seconds: req.body.expires_in_seconds,
      });
      res.status(201).json(dataResponse(result));
    },
  ),
);

export default teamsRouter;

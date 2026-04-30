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
import { listUserTeams } from "../../entities/management/team/memberships.js";
import {
  deleteUser,
  getUser,
  listUsers,
} from "../../entities/management/user.js";

const usersRouter: Router = Router();

// List Users
usersRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce(ubentoAuth.actions.user.list),
    async (req, res) => {
      const users = await listUsers({
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      res.json(makeCursorPageResponse(users));
    },
  ),
);

// Get User
usersRouter.get(
  "/:user_id",
  chain(
    validate({
      params: z.object({
        user_id: z.string(),
      }),
    }),
    enforce(ubentoAuth.actions.user.read),
    async (req, res) => {
      const user = await getUser(req.params.user_id);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.json(dataResponse(user));
    },
  ),
);

// Delete User
usersRouter.delete(
  "/:user_id",
  chain(
    validate({
      params: z.object({
        user_id: z.string(),
      }),
    }),
    enforce(ubentoAuth.actions.user.delete),
    async (req, res) => {
      await deleteUser(req.params.user_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

// Get User Teams
usersRouter.get(
  "/:user_id/teams",
  chain(
    validate({
      params: z.object({
        user_id: z.string(),
      }),
      query: z.object({
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce(ubentoAuth.actions.user.read),
    async (req, res) => {
      const teams = await listUserTeams({
        user_id: req.params.user_id as string,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      res.json(makeCursorPageResponse(teams));
    },
  ),
);

export default usersRouter;

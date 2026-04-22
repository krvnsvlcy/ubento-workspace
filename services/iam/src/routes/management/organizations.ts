import { ubentoApi } from "@ubento/primitives";
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
  createOrganizationInvite,
  listOrganizationInvites,
} from "../../entities/management/organization/invites.js";
import {
  createOrganization,
  deleteOrganization,
  getOrganization,
  getOrganizationByHandle,
  listOrganizations,
  organizationRoles,
  updateOrganization,
} from "../../entities/management/organization/organization.js";

const organizationsRouter = Router();

// List Organizations
organizationsRouter.get(
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
    enforce(ubentoApi.permissions.identity.organization.list),
    async (req, res) => {
      const { items: organizations, nextCursor } = await listOrganizations({
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
        ids: parseStringListQuery(req, "ids"),
        name: parseStringQuery(req, "name"),
        handle: parseStringQuery(req, "handle"),
      });
      setNextLink(req, res, nextCursor);
      res.json(dataResponse(organizations));
    },
  ),
);

// Create Organization
organizationsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        name: z.string(),
        handle: z.string(),
        owner: z.string(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.organization.create),
    async (req, res) => {
      const { name, handle, owner } = req.body;

      const organization = await createOrganization({
        name,
        handle,
        members: [{ user_id: owner, role: organizationRoles.owner }],
      });
      res.status(201).json(dataResponse(organization));
    },
  ),
);

// Check Organization Handle
organizationsRouter.post(
  "/check-handle",
  chain(
    validate({
      body: z.object({
        handle: z.string(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.organization.create),
    async (req, res) => {
      const { handle } = req.body;

      const organization = await getOrganizationByHandle(handle);
      res.status(201).json({
        handle,
        available: !organization,
      });
    },
  ),
);

// Get Organization
organizationsRouter.get(
  "/:organization_id",
  chain(
    validate({
      params: z.object({
        organization_id: z.string(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.organization.read),
    async (req, res) => {
      const organization = await getOrganization(req.params.organization_id);
      if (!organization) {
        throw new NotFoundError("Organization not found");
      }
      res.json(dataResponse(organization));
    },
  ),
);

// Update Organization
organizationsRouter.patch(
  "/:organization_id",
  chain(
    validate({
      params: z.object({
        organization_id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        handle: z.string().optional(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.organization.update),
    async (req, res) => {
      const organization = await updateOrganization(
        req.params.organization_id,
        {
          name: req.body.name,
          handle: req.body.handle,
        },
      );
      if (!organization) {
        throw new NotFoundError("Organization not found");
      }
      res.json(dataResponse(organization));
    },
  ),
);

// Delete Organization
organizationsRouter.delete(
  "/:organization_id",
  chain(
    validate({
      params: z.object({
        organization_id: z.string(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.organization.delete),
    async (req, res) => {
      await deleteOrganization(req.params.organization_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

// List Organization Invites
organizationsRouter.get(
  "/:organization_id/invites",
  chain(
    validate({
      params: z.object({
        organization_id: z.string(),
      }),
      query: z.object({
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
        statuses: z.string().optional(),
        email: z.string().optional(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.organizationInvite.list),
    async (req, res) => {
      const { items: invites, nextCursor } = await listOrganizationInvites({
        organization_id: req.params.organization_id,
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

// Create Organization Invite
organizationsRouter.post(
  "/:organization_id/invites",
  chain(
    validate({
      params: z.object({
        organization_id: z.string(),
      }),
      body: z.object({
        email: z.string().email(),
        role: z.string(),
        expires_in_seconds: z.number().min(60).optional(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.organizationInvite.create),
    async (req, res) => {
      const invitedBy = (req as any).user?.id || "temp-user-id";
      const result = await createOrganizationInvite({
        organization_id: req.params.organization_id,
        email: req.body.email,
        role: req.body.role,
        invited_by: invitedBy,
        expires_in_seconds: req.body.expires_in_seconds,
      });
      res.status(201).json(dataResponse(result));
    },
  ),
);

export default organizationsRouter;

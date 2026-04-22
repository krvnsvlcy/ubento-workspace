# Working with Services Guide

This guide outlines the patterns and best practices for agents working with backend services in the Ubento monorepo.

## 1. Project Structure

Services are located in `services/` (e.g., `services/iam`). Shared code is in `packages/` (e.g., `packages/primitives`, `packages/service-toolkit`).

- **Base Architecture**: Most services use Express with the `@ubento/service-toolkit`.
- **Primary Data Store**: MongoDB via Prisma.

## 2. Refactoring & Entity Management

When modifying or refactoring core entities (e.g., renaming "Organization" to "Team"):

1.  **Schema**: Update `prisma/schema.prisma`.
2.  **Primitives**: Update `@ubento/primitives/src/entities/entities.ts` (entity codes) and `src/api.ts` (permission strings).
3.  **Entities Logic**: Update `src/entities/management/[entity]/`.
4.  **Routes**: Update `src/routes/management/` and mount them in `src/index.ts`.
5.  **CLI**: Update `src/cli/commands/` to reflect the new terminology.
6.  **OpenAPI Spec**: Update `src/spec/spec.ts` (paths, schemas, and references).

### Synchronization Checklist

- Run `npx prisma generate` in the service directory after schema changes.
- Run `pnpm build` in `packages/primitives` if permission constants are changed.
- Run `npx prisma db push` to synchronize the database indexes and collections.

## 3. Database Interaction

**Never create raw DB scripts.** Always use the service's built-in CLI or create one if it doesn't exist:

```bash
# Inside service directory
npm run cli -- <command>
```

If a management command is missing (e.g., listing a specific resource), **add it to the CLI** in `src/cli/commands/` rather than writing a one-off script.

## 4. Authentication & Security

- **Grant Types**: IAM supports `authorization_code`, `refresh_token`, `client_credentials`, and `password`.
- **WorkOS Integration**: Most users are synced from WorkOS. If a user belongs to multiple organizations, handle the `organization_selection_required` error by selecting a default or first available organization if appropriate for the flow.
- **Route Protection**: Use the `auth()` middleware and `enforce()` from `service-toolkit`. Permissions should be referenced from `ubentoApi.permissions`.

## 5. Testing & Validation

1.  **Start Service**: `npm run dev` (uses `tsx watch`).
2.  **Verify Status**: Check `/jwks` or `/spec`.
3.  **Manual Testing**: Use `curl` for authentication and management API calls.
4.  **Token Management**: Save test tokens in `agents/token.json` (access and refresh tokens).

## 6. Service Specifics

### IAM Service

- **Port**: 48041
- **Entity Codes**: `usr` (User), `tem` (Team), `clt` (Client), etc.
- **Broker**: WorkOS (default for users and organizations).

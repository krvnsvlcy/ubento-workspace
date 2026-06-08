# Monorepo Workflow

Ubento is a **pnpm monorepo** managed with **Turborepo** for optimized builds and development.

## Project Structure

### Applications (`apps/`)
- `apps/bento.app`: **Work OS Host**. Manages application data and injects configs into guests.
- `apps/bento.runtime`: **Board Runtime Guest**. Thin renderer that runs inside an iframe.
- `apps/ubento`: Next.js dashboard/public platform.
- `apps/theme-builder`: Utility for design system management.
- `apps/component.runtime`: specialized renderer for widgets.

### Core Packages (`packages/`)
- `packages/bento/engine`: Core logic for state, rendering, and DnD.
- `packages/bento/primitives`: Shared UI components.
- `packages/bento/style`: Design system and UnoCSS config.
- `packages/core/rpc`: Shared RPC utilities.
- `packages/services/database`: Database abstractions and Prisma schemas.

## Development Procedures

### Starting the Monorepo
Run `npm run dev` from the root to start all essential services.
- Host (bento.app): `port 4000`
- Guest (bento.runtime): `port 4020`
- Registry: `port 4030`

### Tooling
A robust `scripts/` directory provides common commands:
- `build`: Optimized production builds.
- `check`: Fast TypeScript type checking without emitting files.
- `deploy`: Deployment to Vercel/Cloud Run.
- `containerize`: Docker image generation.
- `watch`: Development watchers.

> [!IMPORTANT]
> **Type Checking Mandate**: When verifying TypeScript/type correctness of your code changes, **always** run `pnpm check` (or `npx scripts check`) instead of running `pnpm build`. Building the project generates new build outputs in `dist/` directories, which triggers unnecessary re-compilations and reloads of any active dev servers. Use `check` to perform diagnostic checks without writing files.

### Commit Guidelines
- Be concise and focused on the "why".
- Follow the team's established style for commit messages.
- Gather info with `git status` and `git diff` before proposing a commit.

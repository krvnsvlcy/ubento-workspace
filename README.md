# Ubento Monorepo

A pnpm monorepo for Ubento.

## Structure

- `apps/`: Deployable client solutions (Vercel)
- `services/`: Backend services
- `packages/`: Shared internal packages

## Commands

### Development
- `npm run dev`: Start all apps and services
- `npm run dev:apps`: Start only the client applications
- `npm run dev:services`: Start only the backend services

### Deployment
> Note: For actual deployments, ensure `VERCEL_TOKEN` is set in your environment.

- `npm run deploy:ubento`: Deploy the Ubento Platform (Next.js) to Vercel
- `npm run deploy:bento-app`: Deploy the Bento App Host (Vite) to Vercel
- `npm run deploy:bento-runtime`: Deploy the Bento Runtime (Vite) to Vercel
- `npm run deploy:service:iam`: Deploy IAM service
- `npm run deploy:service:billing`: Deploy Billing service
- `npm run deploy:service:registry`: Deploy Registry service

## Architecture
See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details.

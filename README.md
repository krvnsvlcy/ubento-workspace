# Ubento Monorepo

A pnpm monorepo for Ubento.

## Structure

- `apps/`: Deployable client solutions
- `services/`: Backend services
- `packages/`: Shared internal packages

## Commands

### Development
- `npm run dev`: Start all apps and services
- `npm run dev:apps`: Start only the client applications
- `npm run dev:services`: Start only the backend services

### Deployment
- `npm run deploy:ubento`: Deploy the Ubento Platform (Next.js)
- `npm run deploy:bento-app`: Deploy the Bento App Host (Vite)
- `npm run deploy:bento-runtime`: Deploy the Bento Runtime (Vite)
- `npm run deploy:service:iam`: Deploy IAM service
- `npm run deploy:service:billing`: Deploy Billing service
- `npm run deploy:service:registry`: Deploy Registry service

## Architecture
See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details.

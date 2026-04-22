# syntax=docker/dockerfile:1

ARG NODE_VERSION=20
ARG PNPM_VERSION=10.26.2

################################################################################

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm@10.2.0

################################################################################

FROM base AS build

ARG GITHUB_TOKEN

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Set up pnpm with private registry
RUN pnpm config set @elllphnt:registry https://npm.pkg.github.com && \
    pnpm config set //npm.pkg.github.com/:_authToken ${GITHUB_TOKEN}

# Copy the entire workspace context
# Note: This Dockerfile expects to be built from the workspace root:
# docker build -t ubento/iam.service -f services/iam/Dockerfile .
COPY . .

# Install dependencies and build the service
RUN pnpm config set only-allow-trusted-dependencies false && \
    pnpm install --frozen-lockfile && \
    pnpm turbo run build --filter=@ubento/iam-service

# Deploy the service to a standalone directory
RUN pnpm deploy --legacy --filter=@ubento/iam-service /app/deployed

################################################################################

FROM base AS final

RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=8080
USER node

WORKDIR /app

# Copy deployed service from build stage
COPY --from=build /app/deployed .

EXPOSE 8080

CMD ["node", "dist/index.js"]

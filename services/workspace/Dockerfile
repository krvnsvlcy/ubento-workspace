

ARG NODE_VERSION=20

################################################################################
# 1. Base Setup
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /usr/src/app
RUN npm install -g pnpm@10.2.0

################################################################################
# 2. Build Stage
FROM base AS build

# Set up the pnpm store location
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Setup GitHub Auth (This writes to an .npmrc in the workdir)
RUN --mount=type=secret,id=github_token \
    pnpm config set @elllphnt:registry https://npm.pkg.github.com && \
    pnpm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/github_token)

# -----------------------------------------------------------------------------
# STEP 1: Copy ONLY the lockfile. 
# This layer will ONLY invalidate if your dependencies actually change.
# -----------------------------------------------------------------------------
COPY pnpm-lock.yaml ./

# -----------------------------------------------------------------------------
# STEP 2: Fetch packages into the virtual store.
# This downloads everything via network. It skips if the lockfile hasn't changed.
# -----------------------------------------------------------------------------
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm fetch

# -----------------------------------------------------------------------------
# STEP 3: Now copy the rest of your monorepo source code.
# Whenever you edit a TypeScript file, Docker starts rebuilding from THIS line down.
# -----------------------------------------------------------------------------
COPY . .

# -----------------------------------------------------------------------------
# STEP 4: Install and Build (Completely Offline)
# We pass --offline so pnpm links the files directly from the fetch cache instantly.
# -----------------------------------------------------------------------------
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile --offline && \
    pnpm turbo run build --filter=@ubento/workspace-service

# -----------------------------------------------------------------------------
# THE MAGIC TRICK: Dynamic Prisma Finder
# Finds Prisma wherever it lives in the monorepo, dereferences the symlinks, 
# and stages it for the final production image.
# -----------------------------------------------------------------------------
RUN mkdir -p /app/prisma-staging/node_modules/@prisma && \
    CLIENT_PATH=$(find /usr/src/app -type d -path "*/node_modules/@prisma/client" | head -n 1) && \
    cp -rL "$CLIENT_PATH" /app/prisma-staging/node_modules/@prisma/client && \
    mkdir -p /app/prisma-staging/node_modules/.prisma/client && \
    cp -rL /usr/src/app/packages/services/database/prisma/generated/workspace/* /app/prisma-staging/node_modules/.prisma/client/ && \
    mkdir -p /app/prisma-staging/prisma/generated/workspace && \
    cp -rL /usr/src/app/packages/services/database/prisma/generated/workspace/* /app/prisma-staging/prisma/generated/workspace/

################################################################################
# 3. Final Production Stage
FROM base AS final

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app
USER node

# 1. Copy the physical, symlink-free Prisma files from our staging folder
COPY --from=build --chown=node:node /app/prisma-staging/node_modules ./node_modules
COPY --from=build --chown=node:node /app/prisma-staging/prisma ./prisma

# 2. Copy your single bundled JavaScript file
COPY --from=build --chown=node:node /usr/src/app/services/workspace/dist/index.js ./index.js

EXPOSE 8080

CMD ["node", "index.js"]

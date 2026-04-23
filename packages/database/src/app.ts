import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
} from "@ubento/service-toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/app/index.js";
export * from "../prisma/generated/app/index.js";

export function createAppClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "app"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type AppPrismaClient = ReturnType<typeof createAppClient>;

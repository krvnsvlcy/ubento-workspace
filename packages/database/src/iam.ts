import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
} from "@ubento/service-toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/iam/index.js";
export * from "../prisma/generated/iam/index.js";

export function createIamClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "iam"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type IamPrismaClient = ReturnType<typeof createIamClient>;

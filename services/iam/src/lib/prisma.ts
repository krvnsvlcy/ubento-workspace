import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
} from "@ubento/service-toolkit";
import { Prisma, PrismaClient } from "@prisma/client";
import { env } from "../env.js";

const prisma = new PrismaClient({
  datasourceUrl: mongoDbUrlWithDatabase(env.DATABASE_URL, "iam"),
}).$extends(autoIncrementOnUpdate(Prisma.defineExtension));

export default prisma;

import { Prisma, PrismaClient } from "@prisma/client";
import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
} from "@ubento/service-toolkit";
import { env } from "../env.js";

const prisma = new PrismaClient({
  datasourceUrl: mongoDbUrlWithDatabase(env.DATABASE_URL, "app"),
}).$extends(autoIncrementOnUpdate(Prisma.defineExtension));

export default prisma;

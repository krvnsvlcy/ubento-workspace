import { createAppClient, type AppPrismaClient } from "@ubento/database/app";
import { env } from "../env.js";

const prisma: AppPrismaClient = createAppClient(env.DATABASE_URL);

export default prisma;

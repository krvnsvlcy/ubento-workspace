import { createModuleClient, type ModulePrismaClient } from "@ubento/database/module";
import { env } from "../env.js";

const prisma: ModulePrismaClient = createModuleClient(env.DATABASE_URL);

export default prisma;

import {
  createModuleClient,
  type ModulePrismaClient,
} from "@ubento/services.database/module";
import { env } from "../env.js";

const prisma: ModulePrismaClient = createModuleClient(env.DATABASE_URL);

export default prisma;

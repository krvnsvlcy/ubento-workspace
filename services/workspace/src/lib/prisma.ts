import {
  createWorkspaceClient,
  type WorkspacePrismaClient,
} from "@ubento/services.database/workspace";
import { env } from "../env.js";

const prisma: WorkspacePrismaClient = createWorkspaceClient(env.DATABASE_URL);

export default prisma;

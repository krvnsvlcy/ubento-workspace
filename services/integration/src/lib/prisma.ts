import {
  createIntegrationClient,
  type IntegrationPrismaClient,
} from "@ubento/services.database/integration";
import { env } from "../env.js";

const prisma: IntegrationPrismaClient = createIntegrationClient(
  env.DATABASE_URL,
);

export default prisma;

import {
  createVertexClient,
  type VertexPrismaClient,
} from "@ubento/services.database/vertex";
import { env } from "../env.js";

const prisma: VertexPrismaClient = createVertexClient(env.DATABASE_URL);

export default prisma;

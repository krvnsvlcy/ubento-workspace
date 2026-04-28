import { createIntelligenceClient, type IntelligencePrismaClient } from "@ubento/database/intelligence";
import { env } from "./env.js";

const prisma: IntelligencePrismaClient = createIntelligenceClient(env.DATABASE_URL);

export default prisma;

import { createBillingClient } from "@ubento/database/billing";
import { env } from "../env.js";

const prisma = createBillingClient(env.DATABASE_URL);

export default prisma;

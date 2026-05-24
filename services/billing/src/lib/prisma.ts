import { createBillingClient } from "@ubento/services.database/billing";
import { env } from "../env.js";

const prisma: ReturnType<typeof createBillingClient> = createBillingClient(env.DATABASE_URL);

export default prisma;

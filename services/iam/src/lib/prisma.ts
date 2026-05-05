import {
  createIamClient,
  type IamPrismaClient,
} from "@ubento/services.database/iam";
import { env } from "../env.js";

const prisma: IamPrismaClient = createIamClient(env.DATABASE_URL);

export default prisma;

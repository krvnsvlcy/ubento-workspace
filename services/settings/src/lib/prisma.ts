import {
  createSettingsClient,
  type SettingsPrismaClient,
} from "@ubento/services.database/settings";
import { env } from "../env.js";

const prisma: SettingsPrismaClient = createSettingsClient(env.DATABASE_URL);

export default prisma;

import { useSession } from "@/contexts/session";
import { ubentoAuth } from "@ubento/services.primitives";
import { z } from "zod";
import { useSettings } from "./settings";

const appSettingBareKey = "ubento";

export const teamAppSettingsSchema = z.object({});
export const userAppSettingsSchema = z.object({
  sidePanelPinned: z.boolean().default(true),
  sidePanelWidth: z.number().default(240),
});

export function useTeamAppSettings() {
  const session = useSession();
  return useSettings({
    scopes: [ubentoAuth.scopes.team({ team_id: session.teamId })],
    bareKey: appSettingBareKey,
    schema: teamAppSettingsSchema,
    init: {},
  });
}

export function useUserAppSettings() {
  const session = useSession();
  return useSettings({
    scopes: [ubentoAuth.scopes.user({ user_id: session.userId })],
    bareKey: appSettingBareKey,
    schema: userAppSettingsSchema,
    init: {
      sidePanelPinned: true,
      sidePanelWidth: 240,
    },
  });
}

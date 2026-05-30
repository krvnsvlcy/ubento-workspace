import { useSession } from "@/contexts/session";
import { ubentoAuth } from "@ubento/services.primitives";
import z, { object } from "zod";
import { useActiveWorkspaceId } from "../app-engine";
import { useSettings } from "./settings";

export const workspaceSettingsKey = "ubento-workspace";

export const teamWorkspaceSettingsSchema = object({});

export const userWorkspaceSettingsSchema = object({
  activeTab: z.enum(["home", "workspace", "assets"]).default("workspace"),
  mode: z.enum(["live", "edit"]).default("live"),
  board: z
    .object({
      id: z.string(),
      params: z.record(z.string(), z.string()).default({}),
    })
    .optional(),
  module: z.string().optional(),
});

export function useTeamWorkspaceSettings(workspaceId: string) {
  const session = useSession();
  return useSettings({
    scopes: [
      ubentoAuth.scopes.team({ team_id: session.teamId }),
      ubentoAuth.scopes.workspace({
        team_id: session.teamId,
        workspace_id: workspaceId,
      }),
    ],
    bareKey: workspaceSettingsKey,
    schema: teamWorkspaceSettingsSchema,
    init: {},
  });
}
export function useUserWorkspaceSettings(workspaceId: string) {
  const session = useSession();
  return useSettings({
    scopes: [
      ubentoAuth.scopes.user({ user_id: session.userId }),
      ubentoAuth.scopes.workspace({
        team_id: session.teamId,
        workspace_id: workspaceId,
      }),
    ],
    bareKey: workspaceSettingsKey,
    schema: userWorkspaceSettingsSchema,
    init: {
      activeTab: "workspace",
      mode: "live",
    },
  });
}

export function useTeamActiveWorkspaceSettings() {
  const workspaceId = useActiveWorkspaceId();
  return useTeamWorkspaceSettings(workspaceId || "");
}
export function useUserActiveWorkspaceSettings() {
  const workspaceId = useActiveWorkspaceId();
  return useUserWorkspaceSettings(workspaceId || "");
}

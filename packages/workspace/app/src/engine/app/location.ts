import {
  makeEntityId,
  parseEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";

export type UbentoBaseLocation<
  V extends string,
  P extends Record<string, string>,
> = {
  view: V;
  params: P;
};

export type UbentoHomeLocation = UbentoBaseLocation<
  "home",
  Record<string, never>
>;
export type UbentoWorkspaceLocation = UbentoBaseLocation<
  "workspace",
  {
    workspaceId: string;
  }
>;

export type UbentoLocation = UbentoHomeLocation | UbentoWorkspaceLocation;

export function parseLocation(path?: string): UbentoLocation {
  // Safe default that works in SSR and standard browser environments
  const safePath =
    path || (typeof window !== "undefined" ? window.location.pathname : "/");
  const parts = safePath.split("/").filter(Boolean);

  if (parts[0] === "w" && parts[1]) {
    return {
      view: "workspace",
      params: {
        workspaceId: makeEntityId({
          bareId: parts[1],
          code: ubentoEntities.workspace.code,
        }),
      },
    };
  }

  return {
    view: "home",
    params: {},
  };
}

export function stringifyLocation(location: UbentoLocation): string {
  switch (location.view) {
    case "home":
      return "/";

    case "workspace": {
      const { bareId } = parseEntityId(location.params.workspaceId);
      return `/w/${bareId}`;
    }

    default: {
      return "/";
    }
  }
}

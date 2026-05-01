export type UbentoLocation = {
  workspace?: string;
  board?: string;
  params?: TPage<string, string>;
  tab?: string;
};

// /w/{workspaceSlug}/{boardId}?params={json}&tab={tab}

export function parseLocation(): UbentoLocation {
  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);

  const urlParams = new URLSearchParams(window.location.search);
  const jsonParams = urlParams.get("params");
  const tab = urlParams.get("tab") || undefined;
  let params: TPage<string, string> | undefined;

  if (jsonParams) {
    try {
      params = JSON.parse(jsonParams);
    } catch (e) {
      console.error("Failed to parse URL params", e);
    }
  }

  if (parts[0] === "w" && parts[1]) {
    return {
      workspace: parts[1],
      board: parts[2],
      params,
      tab,
    };
  }

  return { params, tab };
}

export function stringifyLocation(location: UbentoLocation): string {
  let path = "/";

  if (location.workspace) {
    path = `/w/${location.workspace}`;
    if (location.board) {
      path += `/${location.board}`;
    }
  }

  const queryParts: string[] = [];
  if (location.params && Object.keys(location.params).length > 0) {
    queryParts.push(
      `params=${encodeURIComponent(JSON.stringify(location.params))}`,
    );
  }
  if (location.tab) {
    queryParts.push(`tab=${encodeURIComponent(location.tab)}`);
  }

  if (queryParts.length > 0) {
    path += `?${queryParts.join("&")}`;
  }

  return path;
}

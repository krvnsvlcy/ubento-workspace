export type UbentoLocation = {
  workspace?: string;
  board?: string;
  params?: Record<string, string>;
  workspaceTab?: string;
  componentTab?: string;
  component?: string;
};

// /w/{workspaceSlug}/{boardId}?params={json}&workspaceTab={tab}&component={moduleId}&componentTab={tab}

export function parseLocation(): UbentoLocation {
  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);

  const urlParams = new URLSearchParams(window.location.search);
  const jsonParams = urlParams.get("params");
  const workspaceTab = urlParams.get("workspaceTab") || undefined;
  const componentTab = urlParams.get("componentTab") || undefined;
  const component = urlParams.get("component") || undefined;
  let params: Record<string, string> | undefined;

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
      workspaceTab,
      componentTab,
      component,
    };
  }

  return { params, workspaceTab, componentTab, component };
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
  if (location.workspaceTab) {
    queryParts.push(
      `workspaceTab=${encodeURIComponent(location.workspaceTab)}`,
    );
  }
  if (location.componentTab) {
    queryParts.push(
      `componentTab=${encodeURIComponent(location.componentTab)}`,
    );
  }
  if (location.component) {
    queryParts.push(`component=${encodeURIComponent(location.component)}`);
  }

  if (queryParts.length > 0) {
    path += `?${queryParts.join("&")}`;
  }

  return path;
}

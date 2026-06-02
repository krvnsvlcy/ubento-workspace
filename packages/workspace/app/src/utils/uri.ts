/**
 * Constructs a strict TS virtual file path based on the WorkOS architecture.
 * Shape: /${workspace_id}/${module_id}/${version_id}.tsx
 */
export function makeTsPath(
  workspaceId: string,
  moduleId: string,
  versionId: string,
): string {
  const cleanWorkspace = workspaceId.replace(/^\/+|\/+$/g, "");
  const cleanModule = moduleId.replace(/^\/+|\/+$/g, "");
  const cleanVersion = versionId.replace(/^\/+|\/+$/g, "");
  return `/${cleanWorkspace}/${cleanModule}/${cleanVersion}.tsx`;
}

/**
 * Parses a strict TS virtual file path back into WorkOS domain entities.
 * Expected Shape: /${workspace_id}/${module_id}/${version_id}.tsx
 */
export function parseTsPath(tsPath: string): {
  workspaceId: string;
  moduleId: string;
  versionId: string;
} {
  // 1. Strip the leading slash so our first split segment isn't an empty string
  const cleanPath = tsPath.replace(/^\//, "");

  // 2. Strip the extension (.tsx or .ts) to isolate the version ID
  const withoutExt = cleanPath.replace(/\.tsx?$/, "");

  // 3. Break it into its routing segments
  const segments = withoutExt.split("/");

  // Guardrail: Ensure the path actually matches our strict 3-part architecture
  if (segments.length < 3) {
    throw new Error(
      `[uri-utils] Invalid TS path format. Expected /workspace/module/version.tsx, got: ${tsPath}`,
    );
  }

  return {
    workspaceId: segments[0],
    moduleId: segments[1],
    versionId: segments[2],
  };
}

/**
 * Converts a stringified Monaco Uri into a plain string path for the TS Language Server.
 */
export function monacoUriToTsPath(uriString: string): string {
  return uriString.replace(/^(ubento|file):\/\//, "/");
}

/**
 * Converts a TS Language Server string path back into a stringified Monaco Uri.
 * Example input: "/workspace_id/module_id/version_id.tsx"
 * Example output: "ubento://workspace_id/module_id/version_id.tsx"
 */
export function tsPathToMonacoUri(tsPath: string): string {
  // Strip the leading slash from the absolute path to prevent triple slashes (ubento:///)
  const cleanPath = tsPath.replace(/^\//, "");
  return `ubento://${cleanPath}`;
}

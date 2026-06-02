import { monacoUriToTsPath, parseTsPath, tsPathToMonacoUri } from "@/utils/uri.js";
import loader from "@monaco-editor/loader";
import type * as monaco from "monaco-editor";
import { TsService } from "../ts/ts-service.js";
import { setupTsLanguage } from "./ubento-ts.js";

export type Monaco = typeof monaco;

export class MonacoService {
  private monaco: Monaco | null = null;
  private initPromise: Promise<Monaco> | null = null;

  // Track all active workspaces by a unique identifier
  private activeWorkspaces = new Map<string, TsService>();

  async getMonaco() {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      const monacoInstance = await loader.init();
      this.monaco = monacoInstance;
      setupTsLanguage({
        // Route language features dynamically based on the model's URI
        getTsServiceForUri: (uri: string) => this.getTsServiceForUri(uri),
        monaco: monacoInstance,
      });
      return monacoInstance;
    })();

    return this.initPromise;
  }

  // Lifecycle management per workspace
  registerWorkspace(workspaceId: string, tsService: TsService) {
    this.activeWorkspaces.set(workspaceId, tsService);
  }

  unregisterWorkspace(workspaceId: string) {
    this.activeWorkspaces.delete(workspaceId);
  }

  /**
   * Extracts the workspace ID from a URI to find the correct service.
   * Assumes a URI structure like: ubento://workspaces/{workspaceId}/src/main.ts
   */
  private getTsServiceForUri(uriStr: string): TsService {
    try {
      const { workspaceId } = parseTsPath(monacoUriToTsPath(uriStr));
      const service = this.activeWorkspaces.get(workspaceId);
      if (!service) {
        throw new Error(
          `No TS Service registered for workspace: ${workspaceId}`,
        );
      }
      return service;
    } catch (e) {
      throw new Error(
        `Failed to route TS Service for URI: ${uriStr}. ${String(e)}`,
      );
    }
  }

  async updateFileDiagnostics(uri: string) {
    const monaco = await this.getMonaco();
    const monacoUriStr = uri.startsWith("/") ? tsPathToMonacoUri(uri) : uri;
    const model = monaco.editor.getModel(monaco.Uri.parse(monacoUriStr));
    if (!model) return;

    try {
      // Safely fetch the exact service tied to this specific file's workspace
      const tsService = this.getTsServiceForUri(monacoUriStr);
      const rpc = tsService.getRpc();
      const diagnostics = await rpc.call("getDiagnostics", {
        uri: monacoUriToTsPath(monacoUriStr),
      });

      const allDiags = [
        ...diagnostics.syntactic,
        ...diagnostics.semantic,
        ...diagnostics.suggestion,
      ];

      const markers = allDiags.map((d: any) => {
        const startPos = model.getPositionAt(d.start || 0);
        const endPos = model.getPositionAt((d.start || 0) + (d.length || 0));
        let severity = monaco.MarkerSeverity.Error;
        if (d.category === 0) severity = monaco.MarkerSeverity.Warning;
        else if (d.category === 2 || d.category === 3)
          severity = monaco.MarkerSeverity.Info;

        return {
          severity,
          message: d.messageText,
          startLineNumber: startPos.lineNumber,
          startColumn: startPos.column,
          endLineNumber: endPos.lineNumber,
          endColumn: endPos.column,
        };
      });

      monaco.editor.setModelMarkers(model, "typescript", markers);
    } catch (e) {
      console.warn(
        `[MonacoService] Failed to update diagnostics for ${uri}`,
        e,
      );
    }
  }

  dispose() {
    this.monaco = null;
    this.initPromise = null;
    this.activeWorkspaces.clear();
  }
}

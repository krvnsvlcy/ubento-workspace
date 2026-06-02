import { createDuplexRpc, createWindowPort } from "@ubento/rpc";
import * as ts from "typescript";
import { MainToTsWorkerRpcDef, TsWorkerToMainRpcDef } from "./rpc";

const DEFAULT_LIB_DIR = "/lib";
const pickAnchorLib = (opts: ts.CompilerOptions): string =>
  opts.lib?.length ? `lib.${opts.lib[0]}.d.ts` : "lib.esnext.d.ts";

const normPath = (p: string) => {
  if (!p) return "/";
  let s = p.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
  if (s.length > 1 && s.endsWith("/")) s = s.slice(0, -1);
  s = s.replace(/\/\.(?=\/|$)/g, "");
  return s || "/";
};

const join = (a: string, b: string) => normPath((a === "/" ? "" : a) + "/" + b);

export class TypeScriptWorkerService {
  private languageService: ts.LanguageService;
  private compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    allowNonTsExtensions: true,
    allowJs: true,
    strict: true,
    esModuleInterop: true,
  };

  private files = new Map<string, { content: string; version: number }>();
  private vfsFiles = new Set<string>();
  private vfsDirs = new Map<string, Set<string>>();
  private projectVersion = 1;

  private dependenciesOf = new Map<string, Set<string>>();
  private dependentsOf = new Map<string, Set<string>>();
  private moduleResolutionCache: ts.ModuleResolutionCache;
  private onDependencyUpdate?: (uris: string[]) => void;

  constructor({
    onDependencyUpdate,
  }: {
    onDependencyUpdate?: (uris: string[]) => void;
  }) {
    this.onDependencyUpdate = onDependencyUpdate;
    this.moduleResolutionCache = ts.createModuleResolutionCache(
      "/",
      (s) => normPath(s),
      this.compilerOptions,
    );

    const host: ts.LanguageServiceHost = {
      getScriptFileNames: () => Array.from(this.files.keys()),
      getScriptVersion: (fileName) => {
        const f = this.files.get(normPath(fileName));
        return f ? String(f.version) : "0";
      },
      getScriptSnapshot: (fileName) => {
        console.log("[ts.worker] host.getScriptSnapshot:", fileName);
        const f = this.files.get(normPath(fileName));
        return f ? ts.ScriptSnapshot.fromString(f.content) : undefined;
      },
      getScriptKind: (fileName) => {
        const ext = fileName.split(".").pop()?.toLowerCase();
        switch (ext) {
          case "ts":
            return ts.ScriptKind.TS;
          case "tsx":
            return ts.ScriptKind.TSX;
          case "js":
            return ts.ScriptKind.JS;
          case "jsx":
            return ts.ScriptKind.JSX;
          default:
            return ts.ScriptKind.Unknown;
        }
      },
      getCurrentDirectory: () => "/",
      getCompilationSettings: () => this.compilerOptions,
      getDefaultLibFileName: (opts) =>
        `${DEFAULT_LIB_DIR}/${pickAnchorLib(opts)}`,

      fileExists: (p) => {
        console.log("[ts.worker] host.fileExists:", p);
        return this.files.has(normPath(p));
      },
      readFile: (p) => {
        console.log("[ts.worker] host.readFile:", p);
        return this.files.get(normPath(p))?.content;
      },
      directoryExists: (p) => this.vfsDirs.has(normPath(p)),

      getDirectories: (p) => {
        const dir = normPath(p);
        const entries = this.vfsDirs.get(dir);
        if (!entries) return [];
        const out: string[] = [];
        for (const name of entries) {
          const candidate = join(dir, name);
          if (this.vfsDirs.has(candidate)) out.push(name);
        }
        return out;
      },
      readDirectory: (path) => {
        console.log("[ts.worker] host.readDirectory:", path);
        const dir = normPath(path);
        const entries = this.vfsDirs.get(dir);
        if (!entries) return [];
        const results: string[] = [];
        for (const name of entries) {
          const full = join(dir, name);
          if (this.vfsFiles.has(full)) results.push(full);
        }
        return results;
      },

      useCaseSensitiveFileNames: () => true,
      realpath: (p) => {
        console.log("[ts.worker] host.realpath:", p);
        return normPath(p);
      },
      getProjectVersion: () => String(this.projectVersion),
      getNewLine: () => "\n",
    };

    this.languageService = ts.createLanguageService(host);
  }

  private bumpProjectVersion() {
    this.projectVersion++;
  }

  private rebuildVfs() {
    this.vfsFiles.clear();
    this.vfsDirs.clear();

    const ensureDir = (dir: string) => {
      if (!this.vfsDirs.has(dir)) this.vfsDirs.set(dir, new Set());
    };

    ensureDir("/");

    for (const raw of this.files.keys()) {
      const file = normPath(raw);
      this.vfsFiles.add(file);

      const parts = file.split("/").filter(Boolean);
      let cur = "/";
      ensureDir(cur);

      for (let i = 0; i < parts.length - 1; i++) {
        const seg = parts[i];
        const next = join(cur, seg);
        ensureDir(next);
        this.vfsDirs.get(cur)!.add(seg);
        cur = next;
      }
      if (parts.length > 0) {
        const fname = parts[parts.length - 1];
        this.vfsDirs.get(cur)!.add(fname);
      }
    }
  }

  setCompilerOptions(options: ts.CompilerOptions, replace?: boolean) {
    this.compilerOptions = replace
      ? { ...options }
      : { ...this.compilerOptions, ...options };
    this.bumpProjectVersion();
  }

  writeFiles(files: Record<string, string>) {
    const uris = Object.keys(files);
    for (const rawUri of uris) {
      const uri = normPath(rawUri);
      const content = files[rawUri];
      const existing = this.files.get(uri);
      const nextVersion = existing ? existing.version + 1 : 1;
      this.files.set(uri, { content, version: nextVersion });
    }
    this.rebuildVfs();
    this.bumpProjectVersion();

    uris.forEach((uri) => {
      this.scheduleDependencyUpdatePublicationFor(uri);
    });
  }

  removeFiles(uris: string[]) {
    for (const u of uris) {
      const uri = normPath(u);
      this.files.delete(uri);
    }
    this.rebuildVfs();
    this.bumpProjectVersion();
  }

  getDiagnostics(uri: string) {
    const n = normPath(uri);
    const toDiag = (d: ts.Diagnostic) => {
      return {
        file: d.file?.fileName,
        start: d.start,
        length: d.length,
        messageText:
          typeof d.messageText === "string"
            ? d.messageText
            : d.messageText.messageText,
        category: d.category,
        code: d.code,
      };
    };

    return {
      syntactic: this.languageService.getSyntacticDiagnostics(n).map(toDiag),
      semantic: this.languageService.getSemanticDiagnostics(n).map(toDiag),
      suggestion: this.languageService.getSuggestionDiagnostics(n).map(toDiag),
    };
  }

  getCompletions(
    uri: string,
    offset: number,
    options?: ts.GetCompletionsAtPositionOptions,
    formatSettings?: ts.FormatCodeSettings,
  ) {
    const n = normPath(uri);
    return (
      this.languageService.getCompletionsAtPosition(
        n,
        offset,
        options,
        formatSettings,
      ) ?? {
        entries: [],
        isGlobalCompletion: false,
        isMemberCompletion: false,
        isNewIdentifierLocation: false,
      }
    );
  }

  getCompletionDetails(req: {
    uri: string;
    offset: number;
    entryName: string;
    formatSettings?: ts.FormatCodeSettings;
    source?: string;
    preferences?: ts.UserPreferences;
    data?: ts.CompletionEntryData;
  }) {
    const n = normPath(req.uri);
    const preferences: ts.UserPreferences = {
      includeCompletionsForModuleExports: true,
      includeCompletionsForImportStatements: true,
      includeCompletionsWithInsertText: true,
      ...(req.preferences ?? {}),
    };
    return this.languageService.getCompletionEntryDetails(
      n,
      req.offset,
      req.entryName,
      req.formatSettings ?? {},
      req.source,
      preferences,
      req.data,
    );
  }

  getHover(uri: string, offset: number) {
    const n = normPath(uri);
    const info = this.languageService.getQuickInfoAtPosition(n, offset);
    if (!info) return {};
    return {
      contents: info.displayParts,
      range: info.textSpan
        ? {
            start: this.offsetToPosition(n, info.textSpan.start),
            end: this.offsetToPosition(
              n,
              info.textSpan.start + info.textSpan.length,
            ),
          }
        : undefined,
    };
  }

  getSignatureHelp(uri: string, offset: number, trigger?: any) {
    const n = normPath(uri);
    const sig = this.languageService.getSignatureHelpItems(n, offset, {
      triggerCharacter: trigger?.triggerCharacter,
    } as any);
    if (!sig) return {};
    return {
      signatures: sig.items.map((item) => ({
        label:
          ts.displayPartsToString(item.prefixDisplayParts || []) +
          ts.displayPartsToString(item.suffixDisplayParts || []),
        documentation: item.documentation
          ? ts.displayPartsToString(item.documentation)
          : undefined,
        parameters: item.parameters?.map((p) => ({
          label: ts.displayPartsToString(p.displayParts),
          documentation: p.documentation
            ? ts.displayPartsToString(p.documentation)
            : undefined,
        })),
      })),
      activeSignature: sig.selectedItemIndex,
      activeParameter: sig.argumentIndex,
    };
  }

  getDefinition(uri: string, offset: number) {
    const n = normPath(uri);
    const defs = this.languageService.getDefinitionAtPosition(n, offset) ?? [];
    return defs.map((def) => ({
      uri: def.fileName,
      range: {
        start: this.offsetToPosition(def.fileName, def.textSpan.start),
        end: this.offsetToPosition(
          def.fileName,
          def.textSpan.start + def.textSpan.length,
        ),
      },
    }));
  }

  getTypeDefinition(uri: string, offset: number) {
    const n = normPath(uri);
    const defs =
      this.languageService.getTypeDefinitionAtPosition(n, offset) ?? [];
    return defs.map((def) => ({
      uri: def.fileName,
      range: {
        start: this.offsetToPosition(def.fileName, def.textSpan.start),
        end: this.offsetToPosition(
          def.fileName,
          def.textSpan.start + def.textSpan.length,
        ),
      },
    }));
  }

  getReferences(uri: string, offset: number) {
    const n = normPath(uri);
    const refs = this.languageService.getReferencesAtPosition(n, offset) ?? [];
    return refs.map((ref) => ({
      uri: ref.fileName,
      range: {
        start: this.offsetToPosition(ref.fileName, ref.textSpan.start),
        end: this.offsetToPosition(
          ref.fileName,
          ref.textSpan.start + ref.textSpan.length,
        ),
      },
      isWriteAccess: ref.isWriteAccess,
    }));
  }

  renamePrep(uri: string, offset: number) {
    const n = normPath(uri);
    const info = this.languageService.getRenameInfo(n, offset);
    return {
      canRename: info.canRename,
      reason: info.canRename ? undefined : info.localizedErrorMessage,
      range: info.canRename
        ? {
            start: this.offsetToPosition(n, info.triggerSpan.start),
            end: this.offsetToPosition(
              n,
              info.triggerSpan.start + info.triggerSpan.length,
            ),
          }
        : undefined,
    };
  }

  rename(uri: string, offset: number, newName: string) {
    const n = normPath(uri);
    const locs =
      this.languageService.findRenameLocations(n, offset, false, false) ?? [];
    return locs.map((loc) => ({
      range: {
        start: this.offsetToPosition(loc.fileName, loc.textSpan.start),
        end: this.offsetToPosition(
          loc.fileName,
          loc.textSpan.start + loc.textSpan.length,
        ),
      },
      newText: newName,
    }));
  }

  codeActions(uri: string, range: any, _kindFilter?: string[]) {
    const n = normPath(uri);
    const start = this.positionToOffset(n, range.start);
    const end = this.positionToOffset(n, range.end);
    const fixes =
      this.languageService.getCodeFixesAtPosition(n, start, end, [], {}, {}) ??
      [];
    return fixes.map((action) => ({
      title: action.description,
      kind: action.fixName,
      edit: {
        changes: action.changes.reduce(
          (acc, change) => {
            acc[change.fileName] = change.textChanges.map((tc) => ({
              range: {
                start: this.offsetToPosition(change.fileName, tc.span.start),
                end: this.offsetToPosition(
                  change.fileName,
                  tc.span.start + tc.span.length,
                ),
              },
              newText: tc.newText,
            }));
            return acc;
          },
          {} as { [uri: string]: any[] },
        ),
      },
    }));
  }

  format(uri: string, opts?: any) {
    const n = normPath(uri);
    const formatOptions: ts.FormatCodeSettings = {
      insertSpaceAfterCommaDelimiter: true,
      insertSpaceAfterSemicolonInForStatements: true,
      insertSpaceBeforeAndAfterBinaryOperators: true,
      insertSpaceAfterKeywordsInControlFlowStatements: true,
      insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
      insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
      placeOpenBraceOnNewLineForFunctions: false,
      placeOpenBraceOnNewLineForControlBlocks: false,
      ...(opts && {
        convertTabsToSpaces: opts.insertSpaces,
        tabSize: opts.tabSize,
        indentSize: opts.tabSize,
      }),
    };
    const edits =
      this.languageService.getFormattingEditsForDocument(n, formatOptions) ??
      [];
    return edits.map((e) => ({
      range: {
        start: this.offsetToPosition(n, e.span.start),
        end: this.offsetToPosition(n, e.span.start + e.span.length),
      },
      newText: e.newText,
    }));
  }

  listFiles() {
    return Array.from(this.files.keys());
  }

  readFile(uri: string) {
    const f = this.files.get(normPath(uri));
    return f ? { text: f.content } : undefined;
  }

  getCompilerOptions() {
    return this.compilerOptions;
  }

  private offsetToPosition(uri: string, offset: number) {
    const f = this.files.get(normPath(uri));
    if (!f) return { line: 0, character: 0 };
    const upTo = f.content.substring(0, offset);
    const lines = upTo.split("\n");
    return {
      line: lines.length - 1,
      character: lines[lines.length - 1].length,
    };
  }

  private positionToOffset(
    uri: string,
    pos: { line: number; character: number },
  ) {
    const f = this.files.get(normPath(uri));
    if (!f) return 0;
    const lines = f.content.split("\n");
    let off = 0;
    for (let i = 0; i < pos.line && i < lines.length; i++) {
      off += lines[i].length + 1;
    }
    return off + pos.character;
  }

  private createModuleResolutionHost(): ts.ModuleResolutionHost {
    return {
      fileExists: (p) => {
        console.log("[ts.worker] resolutionHost.fileExists:", p);
        return this.files.has(normPath(p));
      },
      readFile: (p) => {
        console.log("[ts.worker] resolutionHost.readFile:", p);
        return this.files.get(normPath(p))?.content;
      },
      directoryExists: (p) => this.vfsDirs.has(normPath(p)),
      getDirectories: (p) => {
        const dir = normPath(p);
        const entries = this.vfsDirs.get(dir);
        if (!entries) return [];
        const out: string[] = [];
        for (const name of entries) {
          const candidate = join(dir, name);
          if (this.vfsDirs.has(candidate)) out.push(name);
        }
        return out;
      },
      getCurrentDirectory: () => "/",
    };
  }

  private resolveModule(fromFile: string, spec: string): string | undefined {
    const host = this.createModuleResolutionHost();
    const resolved = ts.resolveModuleName(
      spec,
      normPath(fromFile),
      this.compilerOptions,
      host,
      this.moduleResolutionCache,
    );
    const rf = resolved.resolvedModule?.resolvedFileName;
    return rf ? normPath(rf) : undefined;
  }

  private resolveTypeRef(fromFile: string, spec: string): string | undefined {
    const host = this.createModuleResolutionHost();
    const resolved = ts.resolveTypeReferenceDirective(
      spec,
      normPath(fromFile),
      this.compilerOptions,
      host,
      undefined,
      this.moduleResolutionCache as any,
    );
    const rf = (resolved as any).resolvedTypeReferenceDirective
      ?.resolvedFileName;
    return rf ? normPath(rf) : undefined;
  }

  private setDirectDeps(uri: string, nextDeps: Set<string>) {
    const prevDeps = this.dependenciesOf.get(uri) ?? new Set<string>();
    for (const d of prevDeps) {
      if (!nextDeps.has(d)) {
        const set = this.dependentsOf.get(d);
        if (set) {
          set.delete(uri);
          if (set.size === 0) this.dependentsOf.delete(d);
        }
      }
    }
    for (const d of nextDeps) {
      if (!prevDeps.has(d)) {
        let set = this.dependentsOf.get(d);
        if (!set) {
          set = new Set<string>();
          this.dependentsOf.set(d, set);
        }
        set.add(uri);
      }
    }
    this.dependenciesOf.set(uri, nextDeps);
  }

  private computeDirectDeps(uri: string): Set<string> {
    const file = normPath(uri);
    const f = this.files.get(file);
    const out = new Set<string>();
    if (!f) return out;

    const info = ts.preProcessFile(
      f.content,
      /* readImportFiles */ true,
      /* detectJavaScriptImports */ true,
    );

    for (const im of info.importedFiles) {
      const dep = this.resolveModule(file, im.fileName);
      if (dep) out.add(dep);
    }
    for (const r of info.referencedFiles) {
      const dep = this.resolveModule(file, r.fileName) ?? normPath(r.fileName);
      if (dep) out.add(dep);
    }
    for (const t of info.typeReferenceDirectives) {
      const dep = this.resolveTypeRef(file, t.fileName);
      if (dep) out.add(dep);
    }

    const program = this.languageService.getProgram();
    const cfg = program?.getCompilerOptions().configFilePath;
    if (typeof cfg === "string") out.add(normPath(cfg));

    out.delete(file);
    return out;
  }

  private refreshDepsFor(uri: string) {
    const n = normPath(uri);
    const deps = this.computeDirectDeps(n);
    this.setDirectDeps(n, deps);
  }

  resolveDependentsDeepFor(uri: string, deps?: Set<string>) {
    const _deps = deps ?? new Set<string>();
    _deps.add(uri);

    const dependents = this.dependentsOf.get(uri);
    if (!dependents) return _deps;
    for (const dependent of dependents) {
      if (_deps.has(dependent)) continue;
      this.resolveDependentsDeepFor(dependent, _deps);
    }
    return _deps;
  }

  private nextDependentsUpdate = new Set<string>();
  private nextDependentsUpdateTimeout: any;

  scheduleDependencyUpdatePublicationFor(uri: string) {
    this.refreshDepsFor(uri);
    const deps = this.resolveDependentsDeepFor(uri);
    for (const dep of deps) {
      this.nextDependentsUpdate.add(dep);
    }
    if (this.nextDependentsUpdateTimeout) {
      clearTimeout(this.nextDependentsUpdateTimeout);
    }
    this.nextDependentsUpdateTimeout = setTimeout(() => {
      this.nextDependentsUpdateTimeout = undefined;
      this.onDependencyUpdate?.(Array.from(this.nextDependentsUpdate));
      this.nextDependentsUpdate.clear();
    }, 100);
  }
}

export function runTsWorker() {
  let tsService: TypeScriptWorkerService;

  const rpc = createDuplexRpc<MainToTsWorkerRpcDef, TsWorkerToMainRpcDef>({
    port: createWindowPort(self, self),
    handlers: {
      setCompilerOptions: (request) =>
        Promise.resolve(
          tsService.setCompilerOptions(request.options, request.replace),
        ),
      writeFiles: (request) =>
        Promise.resolve(tsService.writeFiles(request.files)),
      removeFiles: (request) =>
        Promise.resolve(tsService.removeFiles(request.uris)),

      getDiagnostics: (request) =>
        Promise.resolve(tsService.getDiagnostics(request.uri)),
      getCompletions: (request) =>
        Promise.resolve(
          tsService.getCompletions(
            request.uri,
            request.offset,
            request.options,
            request.formatSettings,
          ),
        ),
      getCompletionDetails: (request) =>
        Promise.resolve(tsService.getCompletionDetails(request)),

      getHover: (request) =>
        Promise.resolve(tsService.getHover(request.uri, request.offset)),
      getSignatureHelp: (request) =>
        Promise.resolve(
          tsService.getSignatureHelp(
            request.uri,
            request.offset,
            request.trigger,
          ),
        ),

      getDefinition: (request) =>
        Promise.resolve(tsService.getDefinition(request.uri, request.offset)),
      getTypeDefinition: (request) =>
        Promise.resolve(
          tsService.getTypeDefinition(request.uri, request.offset),
        ),
      getReferences: (request) =>
        Promise.resolve(tsService.getReferences(request.uri, request.offset)),

      renamePrep: (request) =>
        Promise.resolve(tsService.renamePrep(request.uri, request.offset)),
      rename: (request) =>
        Promise.resolve(
          tsService.rename(request.uri, request.offset, request.newName),
        ),

      codeActions: (request) =>
        Promise.resolve(
          tsService.codeActions(request.uri, request.range, request.kindFilter),
        ),
      format: (request) =>
        Promise.resolve(tsService.format(request.uri, request.opts)),

      listFiles: () => Promise.resolve(tsService.listFiles()),
      readFile: (request) => Promise.resolve(tsService.readFile(request.uri)),
      getCompilerOptions: () => Promise.resolve(tsService.getCompilerOptions()),
    },
  });

  tsService = new TypeScriptWorkerService({
    onDependencyUpdate: (uris) => {
      rpc.call("invalidated", { uris });
    },
  });
  rpc.run();
  console.log("TS worker started 1");
}

if (typeof self !== "undefined" && !("window" in self)) {
  runTsWorker();
}

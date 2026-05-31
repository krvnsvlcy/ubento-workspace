import { loader } from "@monaco-editor/react";
import { WorkspaceEngine } from "@/engine/workspace/engine";

export const UBENTO_TS_LANG_ID = "ubento-ts";
export const UBENTO_TSX_LANG_ID = "ubento-tsx";

export class MonacoService {
  readonly workspaceEngine: WorkspaceEngine;
  private monaco: any = null;
  private initPromise: Promise<any> | null = null;

  constructor(workspaceEngine: WorkspaceEngine) {
    this.workspaceEngine = workspaceEngine;
  }

  async getMonaco() {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      const monacoInstance = await loader.init();
      this.monaco = monacoInstance;
      this.setupLanguages();
      return monacoInstance;
    })();

    return this.initPromise;
  }

  private setupLanguages() {
    const monaco = this.monaco;

    // Register custom languages to avoid collision with Monaco's built-in TS validation
    monaco.languages.register({ id: UBENTO_TS_LANG_ID });
    monaco.languages.register({ id: UBENTO_TSX_LANG_ID });

    // Set configuration & monarch definitions
    const langConfig = this.getLanguageConfiguration();
    monaco.languages.setLanguageConfiguration(UBENTO_TS_LANG_ID, langConfig);
    monaco.languages.setLanguageConfiguration(UBENTO_TSX_LANG_ID, {
      ...langConfig,
      autoClosingPairs: [
        ...langConfig.autoClosingPairs,
        { open: "<", close: ">", notIn: ["string", "comment"] },
      ],
    });

    const tokenizer = this.getLanguageDefinition();
    monaco.languages.setMonarchTokensProvider(UBENTO_TS_LANG_ID, tokenizer);
    monaco.languages.setMonarchTokensProvider(UBENTO_TSX_LANG_ID, {
      ...tokenizer,
      jsx: true,
      tokenPostfix: ".tsx",
    });

    this.registerProviders();
  }

  async updateFileDiagnostics(uri: string) {
    const monaco = await this.getMonaco();
    const model = monaco.editor.getModel(monaco.Uri.parse(uri));
    if (!model) return;

    try {
      const tsService = this.workspaceEngine.getTsService();
      const rpc = tsService.getRpc();
      const diagnostics = await rpc.call("getDiagnostics", { uri });

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
        else if (d.category === 2 || d.category === 3) severity = monaco.MarkerSeverity.Info;

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
      console.warn("[MonacoService] Failed to update diagnostics", e);
    }
  }

  private registerProviders() {
    const monaco = this.monaco;
    const self = this;

    const setupForLang = (langId: string) => {
      // 1. Completion Provider
      monaco.languages.registerCompletionItemProvider(langId, {
        triggerCharacters: [".", '"', "'", "/", "@", "{", ",", "<"],
        provideCompletionItems: async (model: any, position: any) => {
          try {
            const tsService = self.workspaceEngine.getTsService();
            const rpc = tsService.getRpc();
            const offset = model.getOffsetAt(position);
            const uri = model.uri.toString();

            const res = await rpc.call("getCompletions", { uri, offset });
            if (!res || !res.entries) return { suggestions: [] };

            const word = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            };

            const suggestions = res.entries.map((entry: any) => ({
              label: entry.name,
              kind: self.mapCompletionKind(entry.kind),
              insertText: entry.insertText || entry.name,
              range,
              // Keep details lazy
              _tsEntryName: entry.name,
              _tsOffset: offset,
              _tsUri: uri,
              _tsSource: entry.source,
              _tsData: entry.data,
            }));

            return { suggestions };
          } catch (e) {
            return { suggestions: [] };
          }
        },
        resolveCompletionItem: async (item: any) => {
          try {
            const tsService = self.workspaceEngine.getTsService();
            const rpc = tsService.getRpc();
            const details = await rpc.call("getCompletionDetails", {
              uri: item._tsUri,
              offset: item._tsOffset,
              entryName: item._tsEntryName,
              source: item._tsSource,
              data: item._tsData,
            });
            if (details) {
              item.detail = monaco.languages.typescript.displayPartsToString(details.displayParts);
              item.documentation = {
                value: monaco.languages.typescript.displayPartsToString(details.documentation),
              };
            }
          } catch (e) {
            // Keep as is
          }
          return item;
        },
      });

      // 2. Hover Provider
      monaco.languages.registerHoverProvider(langId, {
        provideHover: async (model: any, position: any) => {
          try {
            const tsService = self.workspaceEngine.getTsService();
            const rpc = tsService.getRpc();
            const offset = model.getOffsetAt(position);
            const uri = model.uri.toString();

            const hover = await rpc.call("getHover", { uri, offset });
            if (!hover || !hover.contents) return null;

            const text = monaco.languages.typescript.displayPartsToString(hover.contents);
            const md = [{ value: "```typescript\n" + text + "\n```" }];
            return {
              contents: md,
              range: hover.range
                ? {
                    startLineNumber: hover.range.start.line + 1,
                    startColumn: hover.range.start.character + 1,
                    endLineNumber: hover.range.end.line + 1,
                    endColumn: hover.range.end.character + 1,
                  }
                : undefined,
            };
          } catch (e) {
            return null;
          }
        },
      });

      // 3. Definition Provider
      monaco.languages.registerDefinitionProvider(langId, {
        provideDefinition: async (model: any, position: any) => {
          try {
            const tsService = self.workspaceEngine.getTsService();
            const rpc = tsService.getRpc();
            const offset = model.getOffsetAt(position);
            const uri = model.uri.toString();

            const defs = await rpc.call("getDefinition", { uri, offset });
            if (!defs) return null;

            return defs.map((def: any) => ({
              uri: monaco.Uri.parse(def.uri),
              range: {
                startLineNumber: def.range.start.line + 1,
                startColumn: def.range.start.character + 1,
                endLineNumber: def.range.end.line + 1,
                endColumn: def.range.end.character + 1,
              },
            }));
          } catch (e) {
            return null;
          }
        },
      });

      // 4. Signature Help Provider
      monaco.languages.registerSignatureHelpProvider(langId, {
        signatureHelpTriggerCharacters: ["(", ","],
        signatureHelpRetriggerCharacters: [","],
        provideSignatureHelp: async (model: any, position: any, token: any, context: any) => {
          try {
            const tsService = self.workspaceEngine.getTsService();
            const rpc = tsService.getRpc();
            const offset = model.getOffsetAt(position);
            const uri = model.uri.toString();

            const sig = await rpc.call("getSignatureHelp", {
              uri,
              offset,
              trigger: {
                triggerCharacter: context.triggerCharacter,
              },
            });
            if (!sig || !sig.signatures) return null;

            return {
              value: {
                signatures: sig.signatures,
                activeSignature: sig.activeSignature,
                activeParameter: sig.activeParameter,
              },
              dispose: () => {},
            };
          } catch (e) {
            return null;
          }
        },
      });

      // 5. Rename Provider
      monaco.languages.registerRenameProvider(langId, {
        resolveRenameLocation: async (model: any, position: any) => {
          try {
            const tsService = self.workspaceEngine.getTsService();
            const rpc = tsService.getRpc();
            const offset = model.getOffsetAt(position);
            const uri = model.uri.toString();

            const prep = await rpc.call("renamePrep", { uri, offset });
            if (!prep || !prep.canRename) {
              throw new Error(prep?.reason || "Cannot rename this symbol");
            }
            return {
              range: {
                startLineNumber: prep.range.start.line + 1,
                startColumn: prep.range.start.character + 1,
                endLineNumber: prep.range.end.line + 1,
                endColumn: prep.range.end.character + 1,
              },
              text: "",
            };
          } catch (e) {
            return null;
          }
        },
        provideRenameEdits: async (model: any, position: any, newName: string) => {
          try {
            const tsService = self.workspaceEngine.getTsService();
            const rpc = tsService.getRpc();
            const offset = model.getOffsetAt(position);
            const uri = model.uri.toString();

            const edits = await rpc.call("rename", { uri, offset, newName });
            if (!edits) return null;

            const resourceEdits = edits.map((edit: any) => ({
              resource: model.uri,
              textEdit: {
                range: {
                  startLineNumber: edit.range.start.line + 1,
                  startColumn: edit.range.start.character + 1,
                  endLineNumber: edit.range.end.line + 1,
                  endColumn: edit.range.end.character + 1,
                },
                text: edit.newText,
              },
            }));

            return { edits: resourceEdits };
          } catch (e) {
            return null;
          }
        },
      });

      // 6. Formatting Provider
      monaco.languages.registerDocumentFormattingEditProvider(langId, {
        provideDocumentFormattingEdits: async (model: any, options: any) => {
          try {
            const tsService = self.workspaceEngine.getTsService();
            const rpc = tsService.getRpc();
            const uri = model.uri.toString();

            const edits = await rpc.call("format", {
              uri,
              opts: {
                tabSize: options.tabSize,
                insertSpaces: options.insertSpaces,
              },
            });
            if (!edits) return null;

            return edits.map((e: any) => ({
              range: {
                startLineNumber: e.range.start.line + 1,
                startColumn: e.range.start.character + 1,
                endLineNumber: e.range.end.line + 1,
                endColumn: e.range.end.character + 1,
              },
              text: e.newText,
            }));
          } catch (e) {
            return null;
          }
        },
      });
    };

    setupForLang(UBENTO_TS_LANG_ID);
    setupForLang(UBENTO_TSX_LANG_ID);
  }

  private mapCompletionKind(kind: string): number {
    const monaco = this.monaco;
    switch (kind) {
      case "method":
        return monaco.languages.CompletionItemKind.Method;
      case "function":
        return monaco.languages.CompletionItemKind.Function;
      case "constructor":
        return monaco.languages.CompletionItemKind.Constructor;
      case "field":
        return monaco.languages.CompletionItemKind.Field;
      case "variable":
        return monaco.languages.CompletionItemKind.Variable;
      case "class":
        return monaco.languages.CompletionItemKind.Class;
      case "interface":
        return monaco.languages.CompletionItemKind.Interface;
      case "module":
      case "namespace":
        return monaco.languages.CompletionItemKind.Module;
      case "property":
        return monaco.languages.CompletionItemKind.Property;
      case "enum":
        return monaco.languages.CompletionItemKind.Enum;
      case "keyword":
        return monaco.languages.CompletionItemKind.Keyword;
      default:
        return monaco.languages.CompletionItemKind.Text;
    }
  }

  private getLanguageConfiguration(): any {
    return {
      comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"],
      },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"', notIn: ["string"] },
        { open: "'", close: "'", notIn: ["string", "comment"] },
        { open: "`", close: "`", notIn: ["string", "comment"] },
      ],
      folding: {
        markers: {
          start: new RegExp("^\\s*//\\s*#?region\\b"),
          end: new RegExp("^\\s*//\\s*#?endregion\\b"),
        },
      },
    };
  }

  private getLanguageDefinition(): any {
    return {
      defaultToken: "invalid",
      tokenPostfix: ".ts",
      keywords: [
        "abstract", "any", "as", "asserts", "bigint", "boolean", "break", "case",
        "catch", "class", "continue", "const", "constructor", "debugger", "declare",
        "default", "delete", "do", "else", "enum", "export", "extends", "false",
        "finally", "for", "from", "function", "get", "if", "implements", "import",
        "in", "infer", "instanceof", "interface", "is", "keyof", "let", "module",
        "namespace", "never", "new", "null", "number", "object", "out", "package",
        "private", "protected", "public", "override", "readonly", "require",
        "global", "return", "satisfies", "set", "static", "string", "super",
        "switch", "symbol", "this", "throw", "true", "try", "type", "typeof",
        "undefined", "unique", "unknown", "var", "void", "while", "with",
        "yield", "async", "await", "of",
      ],
      operators: [
        "<=", ">=", "==", "!=", "===", "!==", "=>", "+", "-", "**", "*", "/", "%",
        "++", "--", "<<", "</", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||",
        "??", "?", ":", "=", "+=", "-=", "*=", "**=", "/=", "%=", "<<=", ">>=",
        ">>>=", "&=", "|=", "^=", "@",
      ],
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      digits: /\d+(_+\d+)*/,
      octaldigits: /[0-7]+(_+[0-7]+)*/,
      binarydigits: /[0-1]+(_+[0-1]+)*/,
      hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
      tokenizer: {
        root: [[/[{}]/, "delimiter.bracket"], { include: "common" }],
        common: [
          [/#?[a-z_$][\w$]*/, {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          }],
          [/[A-Z][\w\$]*/, "type.identifier"],
          { include: "@whitespace" },
          [/[()\[\]]/, "@brackets"],
          [/[<>](?!@symbols)/, "@brackets"],
          [/!(?=([^=]|$))/, "delimiter"],
          [/@symbols/, {
            cases: {
              "@operators": "delimiter",
              "@default": "",
            },
          }],
          [/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
          [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
          [/0[xX](@hexdigits)n?/, "number.hex"],
          [/0[oO]?(@octaldigits)n?/, "number.octal"],
          [/0[bB](@binarydigits)n?/, "number.binary"],
          [/(@digits)n?/, "number"],
          [/[;,.]/, "delimiter"],
          [/"([^"\\]|\\.)*$/, "string.invalid"],
          [/'([^'\\]|\\.)*$/, "string.invalid"],
          [/"/, "string", "@string_double"],
          [/'/, "string", "@string_single"],
          [/`/, "string", "@string_backtick"],
        ],
        whitespace: [
          [/[ \t\r\n]+/, ""],
          [/\/\*\*(?!\/)/, "comment.doc", "@jsdoc"],
          [/\/\*/, "comment", "@comment"],
          [/\/\/.*$/, "comment"],
        ],
        comment: [
          [/[^\/*]+/, "comment"],
          [/\*\//, "comment", "@pop"],
          [/[\/*]/, "comment"],
        ],
        jsdoc: [
          [/[^\/*]+/, "comment.doc"],
          [/\*\//, "comment.doc", "@pop"],
          [/[\/*]/, "comment.doc"],
        ],
        string_double: [
          [/[^\\"]+/, "string"],
          [/@escapes/, "string.escape"],
          [/\\./, "string.escape.invalid"],
          [/"/, "string", "@pop"],
        ],
        string_single: [
          [/[^\\']+/, "string"],
          [/@escapes/, "string.escape"],
          [/\\./, "string.escape.invalid"],
          [/'/, "string", "@pop"],
        ],
        string_backtick: [
          [/\$\{/, { token: "delimiter.bracket", next: "@bracketCounting" }],
          [/[^\\`$]+/, "string"],
          [/@escapes/, "string.escape"],
          [/\\./, "string.escape.invalid"],
          [/`/, "string", "@pop"],
        ],
        bracketCounting: [
          [/\{/, "delimiter.bracket", "@bracketCounting"],
          [/\}/, "delimiter.bracket", "@pop"],
          { include: "common" },
        ],
      },
    };
  }

  dispose() {
    this.monaco = null;
    this.initPromise = null;
  }
}

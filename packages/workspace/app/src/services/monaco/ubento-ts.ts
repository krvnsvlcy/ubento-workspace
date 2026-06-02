import type * as monaco from "monaco-editor";
import { TsService } from "../ts/ts-service.js";
import { Monaco } from "./monaco-service.js";
import { monacoUriToTsPath, tsPathToMonacoUri } from "@/utils/uri.js";

// --- CONSTANTS ---

export const ubentoTsLangId = "ubento-ts";

export const getUbentoTsLanguageConfiguration = (
  monaco: typeof import("monaco-editor"),
): monaco.languages.LanguageConfiguration => ({
  wordPattern:
    /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,

  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },

  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],

  onEnterRules: [
    {
      beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
      afterText: /^\s*\*\/$/,
      action: {
        indentAction: monaco.languages.IndentAction.IndentOutdent,
        appendText: " * ",
      },
    },
    {
      beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
      action: {
        indentAction: monaco.languages.IndentAction.None,
        appendText: " * ",
      },
    },
    {
      beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
      action: {
        indentAction: monaco.languages.IndentAction.None,
        appendText: "* ",
      },
    },
    {
      beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
      action: {
        indentAction: monaco.languages.IndentAction.None,
        removeText: 1,
      },
    },
  ],

  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"', notIn: ["string"] },
    { open: "'", close: "'", notIn: ["string", "comment"] },
    { open: "`", close: "`", notIn: ["string", "comment"] },
    { open: "/**", close: " */", notIn: ["string"] },
  ],

  folding: {
    markers: {
      start: new RegExp("^\\s*//\\s*#?region\\b"),
      end: new RegExp("^\\s*//\\s*#?endregion\\b"),
    },
  },
});

export const ubentoTsLanguageDefinition: monaco.languages.IMonarchLanguage = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: "invalid",
  tokenPostfix: ".ts",

  keywords: [
    "abstract",
    "any",
    "as",
    "asserts",
    "bigint",
    "boolean",
    "break",
    "case",
    "catch",
    "class",
    "continue",
    "const",
    "constructor",
    "debugger",
    "declare",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "from",
    "function",
    "get",
    "if",
    "implements",
    "import",
    "in",
    "infer",
    "instanceof",
    "interface",
    "is",
    "keyof",
    "let",
    "module",
    "namespace",
    "never",
    "new",
    "null",
    "number",
    "object",
    "out",
    "package",
    "private",
    "protected",
    "public",
    "override",
    "readonly",
    "require",
    "global",
    "return",
    "satisfies",
    "set",
    "static",
    "string",
    "super",
    "switch",
    "symbol",
    "this",
    "throw",
    "true",
    "try",
    "type",
    "typeof",
    "undefined",
    "unique",
    "unknown",
    "var",
    "void",
    "while",
    "with",
    "yield",
    "async",
    "await",
    "of",
  ],

  operators: [
    "<=",
    ">=",
    "==",
    "!=",
    "===",
    "!==",
    "=>",
    "+",
    "-",
    "**",
    "*",
    "/",
    "%",
    "++",
    "--",
    "<<",
    "</",
    ">>",
    ">>>",
    "&",
    "|",
    "^",
    "!",
    "~",
    "&&",
    "||",
    "??",
    "?",
    ":",
    "=",
    "+=",
    "-=",
    "*=",
    "**=",
    "/=",
    "%=",
    "<<=",
    ">>=",
    ">>>=",
    "&=",
    "|=",
    "^=",
    "@",
  ],

  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

  regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
  regexpesc:
    /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [[/[{}]/, "delimiter.bracket"], { include: "common" }],

    common: [
      // identifiers and keywords
      [
        /#?[a-z_$][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],
      [/[A-Z][\w\$]*/, "type.identifier"],

      // whitespace
      { include: "@whitespace" },

      // regular expression
      [
        /\/(?=([^\\\/]|\\.)+\/([dgimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,
        { token: "regexp", bracket: "@open", next: "@regexp" },
      ],

      // delimiters and operators
      [/[()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [/!(?=([^=]|$))/, "delimiter"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "delimiter",
            "@default": "",
          },
        },
      ],

      // numbers
      [/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
      [/0[xX](@hexdigits)n?/, "number.hex"],
      [/0[oO]?(@octaldigits)n?/, "number.octal"],
      [/0[bB](@binarydigits)n?/, "number.binary"],
      [/(@digits)n?/, "number"],

      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],

      // strings
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

    // We match regular expression quite precisely
    regexp: [
      [
        /(\{)(\d+(?:,\d*)?)(\})/,
        [
          "regexp.escape.control",
          "regexp.escape.control",
          "regexp.escape.control",
        ],
      ],
      [
        /(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/,
        [
          "regexp.escape.control",
          { token: "regexp.escape.control", next: "@regexrange" },
        ],
      ],
      [/(\()(\?:|\?=|\?!)/, ["regexp.escape.control", "regexp.escape.control"]],
      [/[()]/, "regexp.escape.control"],
      [/@regexpctl/, "regexp.escape.control"],
      [/[^\\\/]/, "regexp"],
      [/@regexpesc/, "regexp.escape"],
      [/\\\./, "regexp.invalid"],
      [
        /(\/)([dgimsuy]*)/,
        [{ token: "regexp", bracket: "@close", next: "@pop" }, "keyword.other"],
      ],
    ],

    regexrange: [
      [/-/, "regexp.escape.control"],
      [/\^/, "regexp.invalid"],
      [/@regexpesc/, "regexp.escape"],
      [/[^\]]/, "regexp"],
      [
        /\]/,
        {
          token: "regexp.escape.control",
          next: "@pop",
          bracket: "@close",
        },
      ],
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

export const ubentoTsxLangId = "ubento-tsx";

export const ubentoTsxLanguageDefinition: monaco.languages.IMonarchLanguage = {
  ...ubentoTsLanguageDefinition,
  jsx: true,
  tokenPostfix: ".tsx",
};

export const getUbentoTsxLanguageConfiguration = (
  monaco: typeof import("monaco-editor"),
): monaco.languages.LanguageConfiguration => {
  const config = getUbentoTsLanguageConfiguration(monaco);
  return {
    ...config,
    autoClosingPairs: [
      ...(config.autoClosingPairs ?? []),
      { open: "<", close: ">", notIn: ["string", "comment"] },
      { open: "<!--", close: "-->", notIn: ["string", "comment"] },
    ],
  };
};

export function setupTsLanguage({
  getTsServiceForUri,
  monaco,
}: {
  getTsServiceForUri: (uri: string) => TsService;
  monaco: Monaco;
}) {
  // 1. Register languages if they are not already registered
  const registeredLanguages = monaco.languages.getLanguages().map((l) => l.id);
  if (!registeredLanguages.includes(ubentoTsLangId)) {
    monaco.languages.register({ id: ubentoTsLangId });
    monaco.languages.setLanguageConfiguration(
      ubentoTsLangId,
      getUbentoTsLanguageConfiguration(monaco),
    );
    monaco.languages.setMonarchTokensProvider(
      ubentoTsLangId,
      ubentoTsLanguageDefinition,
    );
  }

  if (!registeredLanguages.includes(ubentoTsxLangId)) {
    monaco.languages.register({ id: ubentoTsxLangId });
    monaco.languages.setLanguageConfiguration(
      ubentoTsxLangId,
      getUbentoTsxLanguageConfiguration(monaco),
    );
    monaco.languages.setMonarchTokensProvider(
      ubentoTsxLangId,
      ubentoTsxLanguageDefinition,
    );
  }

  // Helper functions
  const mapCompletionKind = (
    kind: string,
  ): monaco.languages.CompletionItemKind => {
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
  };

  const displayPartsToString = (parts: any[] | undefined): string => {
    if (!parts) return "";
    return parts.map((p) => p.text).join("");
  };

  // Sync content changes
  const setupModel = (model: monaco.editor.ITextModel) => {
    const handleContentChange = async () => {
      const uri = model.uri.toString();
      try {
        await getTsServiceForUri(uri).writeFile(monacoUriToTsPath(uri), model.getValue());
      } catch (e) {
        console.warn("[TS Language] Failed to write file to worker", e);
      }
    };
    const disposable = model.onDidChangeContent(handleContentChange);
    handleContentChange();
    return disposable;
  };

  const activeModels = new Map<string, monaco.IDisposable>();

  const trackModel = (model: monaco.editor.ITextModel) => {
    const langId = model.getLanguageId();
    if (langId === ubentoTsLangId || langId === ubentoTsxLangId) {
      if (!activeModels.has(model.id)) {
        const disp = setupModel(model);
        activeModels.set(model.id, disp);
      }
    }
  };

  monaco.editor.onDidCreateModel((model) => {
    trackModel(model);
  });

  monaco.editor.onWillDisposeModel((model) => {
    const disp = activeModels.get(model.id);
    if (disp) {
      disp.dispose();
      activeModels.delete(model.id);
    }
  });

  // Track existing models (if any are already created)
  monaco.editor.getModels().forEach(trackModel);

  const setupProvidersForLang = (langId: string) => {
    // 1. Completion Provider
    monaco.languages.registerCompletionItemProvider(langId, {
      triggerCharacters: [".", '"', "'", "/", "@", "{", ",", "<"],
      provideCompletionItems: async (model: any, position: any) => {
        try {
          const uri = model.uri.toString();
          const rpc = getTsServiceForUri(uri).getRpc();
          const offset = model.getOffsetAt(position);

          const res = await rpc.call("getCompletions", {
            uri: monacoUriToTsPath(uri),
            offset,
          });
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
            kind: mapCompletionKind(entry.kind),
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
          const rpc = getTsServiceForUri(item._tsUri).getRpc();
          const details = await rpc.call("getCompletionDetails", {
            uri: monacoUriToTsPath(item._tsUri),
            offset: item._tsOffset,
            entryName: item._tsEntryName,
            source: item._tsSource,
            data: item._tsData,
          });
          if (details) {
            item.detail = displayPartsToString(details.displayParts);
            item.documentation = {
              value: displayPartsToString(details.documentation),
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
          const uri = model.uri.toString();
          const rpc = getTsServiceForUri(uri).getRpc();
          const offset = model.getOffsetAt(position);

          const hover = await rpc.call("getHover", {
            uri: monacoUriToTsPath(uri),
            offset,
          });
          console.log("hover", hover);
          if (!hover || !hover.contents) return null;

          const text = displayPartsToString(hover.contents);
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
          const uri = model.uri.toString();
          const rpc = getTsServiceForUri(uri).getRpc();
          const offset = model.getOffsetAt(position);

          const defs = await rpc.call("getDefinition", {
            uri: monacoUriToTsPath(uri),
            offset,
          });
          if (!defs) return null;

          return defs.map((def: any) => ({
            uri: monaco.Uri.parse(tsPathToMonacoUri(def.uri)),
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
      provideSignatureHelp: async (
        model: any,
        position: any,
        token: any,
        context: any,
      ) => {
        try {
          const uri = model.uri.toString();
          const rpc = getTsServiceForUri(uri).getRpc();
          const offset = model.getOffsetAt(position);

          const sig = await rpc.call("getSignatureHelp", {
            uri: monacoUriToTsPath(uri),
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
          const uri = model.uri.toString();
          const rpc = getTsServiceForUri(uri).getRpc();
          const offset = model.getOffsetAt(position);

          const prep = await rpc.call("renamePrep", {
            uri: monacoUriToTsPath(uri),
            offset,
          });
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
      provideRenameEdits: async (
        model: any,
        position: any,
        newName: string,
      ) => {
        try {
          const uri = model.uri.toString();
          const rpc = getTsServiceForUri(uri).getRpc();
          const offset = model.getOffsetAt(position);

          const edits = await rpc.call("rename", {
            uri: monacoUriToTsPath(uri),
            offset,
            newName,
          });
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
          const uri = model.uri.toString();
          const rpc = getTsServiceForUri(uri).getRpc();

          const edits = await rpc.call("format", {
            uri: monacoUriToTsPath(uri),
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

  setupProvidersForLang(ubentoTsLangId);
  setupProvidersForLang(ubentoTsxLangId);
}

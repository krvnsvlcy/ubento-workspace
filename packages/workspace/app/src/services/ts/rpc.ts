export interface MainToTsWorkerRpcDef {
  [key: string]: any;
  setCompilerOptions: (request: any) => Promise<void>;
  writeFiles: (request: any) => Promise<void>;
  removeFiles: (request: any) => Promise<void>;
  getDiagnostics: (request: any) => Promise<{
    syntactic: any[];
    semantic: any[];
    suggestion: any[];
  }>;
  getCompletions: (request: any) => Promise<any>;
  getCompletionDetails: (request: any) => Promise<any>;
  getHover: (request: any) => Promise<any>;
  getSignatureHelp: (request: any) => Promise<any>;
  getDefinition: (request: any) => Promise<any>;
  getTypeDefinition: (request: any) => Promise<any>;
  getReferences: (request: any) => Promise<any>;
  renamePrep: (request: any) => Promise<any>;
  rename: (request: any) => Promise<any>;
  codeActions: (request: any) => Promise<any>;
  format: (request: any) => Promise<any>;
  listFiles: () => Promise<string[]>;
  readFile: (request: any) => Promise<{ text: string } | undefined>;
}

export interface TsWorkerToMainRpcDef {
  [key: string]: any;
  invalidated: (request: any) => Promise<void>;
}

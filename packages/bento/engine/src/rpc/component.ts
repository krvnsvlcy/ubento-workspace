export type ComponentEngineRuntimeHostRpcInterface = {
  // connection
  connect: (payload: {}) => void; // sent to initialize connection with the host
  ready: (payload: {}) => void; // sent when engine is ready
  log: (payload: {
    type: "log" | "error" | "warn" | "info";
    args: any[];
  }) => void;
};

export type ComponentEngineRuntimeRpcInterface = {
  // connection
  init: (payload: { code: string }) => void;
  updateCode: (payload: { code: string }) => void;
  updateProps: (payload: { props: any }) => void;
};

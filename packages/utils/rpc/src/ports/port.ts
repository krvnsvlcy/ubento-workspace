export type RpcPort = {
  postMessage: (message: any, transfer?: Transferable[]) => void;
  onMessage: (
    listener: (data: any, ports: readonly MessagePort[]) => void,
  ) => () => void;
  onError: (listener: (error: any) => void) => () => void;
};

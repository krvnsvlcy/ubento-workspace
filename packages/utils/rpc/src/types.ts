export type RpcInterfaceDefinition = Record<
  string,
  { request: any; response: any } | ((arg: any) => any)
>;
export type RpcMethod<T extends RpcInterfaceDefinition> = keyof T;

// For function-style entries: (args) => R
// For object-style entries:   { request: Req; response: Res }
export type ReqOf<Entry> = Entry extends (a: infer A) => any
  ? A
  : Entry extends { request: infer Req }
    ? Req
    : unknown;

export type engineStateChanged<Entry> = Entry extends (...a: any[]) => infer R
  ? R
  : Entry extends { response: infer Res }
    ? Res
    : unknown;

// A strongly-typed handler map for Ingress: method -> (req) => res | Promise<res>
export type HandlerMap<Ingress extends RpcInterfaceDefinition> = {
  [K in keyof Ingress]: (
    req: ReqOf<Ingress[K]>,
  ) => engineStateChanged<Ingress[K]> | Promise<engineStateChanged<Ingress[K]>>;
};
export type HandlerMapProxy<Ingress extends RpcInterfaceDefinition> = {
  readonly [K in keyof Ingress]: (
    req: ReqOf<Ingress[K]>,
  ) => engineStateChanged<Ingress[K]> | Promise<engineStateChanged<Ingress[K]>>;
};

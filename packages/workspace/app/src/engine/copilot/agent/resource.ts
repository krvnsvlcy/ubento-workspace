import { MessageItem } from "./message/item.js";

export type AgentResource = {
  key: string;
  type: string;
  data: unknown;
};

export type ResourceType<D extends Record<string, any> = any> = {
  type: string;
  getMessageItem: (
    data: D,
    key: string,
  ) => engineStateChanged<MessageItem | undefined>;
};

export type ResourceTypeData<R> = R extends ResourceType<infer D> ? D : never;

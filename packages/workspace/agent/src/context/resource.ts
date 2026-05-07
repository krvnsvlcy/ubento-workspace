import { MessageItem } from "../utils/ui.js";

export type ResourceType<Data = any> = {
  type: string;
  getMessageItem: (data: Data, key: string) => Promise<MessageItem | undefined>;
};

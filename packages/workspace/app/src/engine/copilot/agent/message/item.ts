export type BaseMessageItem<T extends string> = {
  type: T;
  label: string;
};

export type ImageMessageItem = BaseMessageItem<"image"> & {
  url: string;
  mediaType: string;
};
export type FileMessageItem = BaseMessageItem<"file"> & {
  url: string;
  mediaType: string;
};
export type DataMessageItem = BaseMessageItem<"data"> & {
  data: unknown;
};
export type TextMessageItem = BaseMessageItem<"text"> & {
  text: string;
};

export type MessageItem =
  | ImageMessageItem
  | FileMessageItem
  | DataMessageItem
  | TextMessageItem;

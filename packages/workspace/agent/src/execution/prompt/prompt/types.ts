export interface TextPart {
  type: "text";
  text: string;
}

export interface ImagePart {
  type: "image";
  image: string | Uint8Array | ArrayBuffer | URL;
  mediaType?: string;
}

export interface FilePart {
  type: "file";
  data: string | Uint8Array | ArrayBuffer | URL;
  mediaType?: string;
}

export type MessagePart = TextPart | ImagePart | FilePart;

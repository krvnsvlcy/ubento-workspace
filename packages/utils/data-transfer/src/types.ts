import { SerializedBinary } from "./binary.js";
import { DataTransferType } from "./data_transfer.js";

export function createJsonType<T>(mime: string) {
    return {
        type: mime,
        serialize: (data: T) => JSON.stringify(data),
        deserialize: (str: string) => JSON.parse(str) as T,
    } as const;
}
export const createTextType = (mime: string) => {
    return {
        type: mime,
        serialize: (data: string) => data,
        deserialize: (str: string) => str,
    } as const;
}
export function createBlobType(mime: string) {
    return createJsonType<SerializedBinary>(mime);
}
export function createListType(mime: string) {
    return createJsonType<string[]>(mime);
}

export const baseDataTransferTypes = {
    json: createJsonType("application/json"),
    text: createTextType("text/plain"),
    markdown: createTextType("text/markdown"),
    html: createTextType("text/html"),
    css: createTextType("text/css"),
    svg: createTextType("image/svg+xml"),
    uriList: createListType("text/uri-list"),
    png: createBlobType("image/png"),
    jpeg: createBlobType("image/jpeg"),
    gif: createBlobType("image/gif"),
    bmp: createBlobType("image/bmp"),
    webp: createBlobType("image/webp"),
    pdf: createBlobType("application/pdf"),
} satisfies Record<string, DataTransferType<any>>;
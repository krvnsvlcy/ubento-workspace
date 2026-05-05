export type SerializedBinary = {
    data: string;
    encoding: "base64" | "hex";
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
        const v = bytes[i].toString(16).padStart(2, "0");
        hex += v;
    }
    return hex;
}

function hexToArrayBuffer(hex: string): ArrayBuffer {
    const len = hex.length / 2;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes.buffer;
}


export async function serializeBlob(blob: Blob): Promise<SerializedBinary> {
    const buffer = await blob.arrayBuffer();
    return {
        data: arrayBufferToBase64(buffer),
        encoding: "base64",
    };
}
export function deserializeBlob(payload: SerializedBinary, mime: string): Blob {
    const buffer =
        payload.encoding === "base64"
            ? base64ToArrayBuffer(payload.data)
            : hexToArrayBuffer(payload.data);

    return new Blob([buffer], { type: mime });
}

export function serializeArrayBuffer(
    buffer: ArrayBuffer,
    encoding: "base64" | "hex" = "base64"
): SerializedBinary {
    return {
        data:
            encoding === "base64"
                ? arrayBufferToBase64(buffer)
                : arrayBufferToHex(buffer),
        encoding,
    };
}
export function deserializeArrayBuffer(payload: SerializedBinary): ArrayBuffer {
    return payload.encoding === "base64"
        ? base64ToArrayBuffer(payload.data)
        : hexToArrayBuffer(payload.data);
}

export function serializeUint8Array(
    bytes: Uint8Array,
    encoding: "base64" | "hex" = "base64"
): SerializedBinary {
    return serializeArrayBuffer(bytes.buffer as ArrayBuffer, encoding);
}
export function deserializeUint8Array(payload: SerializedBinary): Uint8Array {
    return new Uint8Array(deserializeArrayBuffer(payload));
}

export async function serializeBinary(
    input: Blob | ArrayBuffer | Uint8Array,
    encoding: "base64" | "hex" = "base64"
): Promise<SerializedBinary> {
    if (input instanceof Blob) {
        return serializeBlob(input);
    }
    if (input instanceof Uint8Array) {
        return serializeUint8Array(input, encoding);
    }
    return serializeArrayBuffer(input, encoding);
}
export function deserializeBinary(
    payload: SerializedBinary
): Uint8Array {
    return deserializeUint8Array(payload);
}

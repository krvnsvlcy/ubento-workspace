import { z } from "zod";

// A valid JSON Pointer must start with a slash (or be empty for the root, but for patches it's usually a slash)
const jsonPointer = z.string().startsWith("/", {
  message: "Path must be a valid JSON Pointer starting with '/'",
});

// Define the shape for each specific operation type
const AddOperation = z.object({
  op: z.literal("add"),
  path: jsonPointer,
  value: z.any().describe("The value to add. Can be any valid JSON type."),
});

const RemoveOperation = z.object({
  op: z.literal("remove"),
  path: jsonPointer,
});

const ReplaceOperation = z.object({
  op: z.literal("replace"),
  path: jsonPointer,
  value: z.any().describe("The new value. Can be any valid JSON type."),
});

const MoveOperation = z.object({
  op: z.literal("move"),
  from: jsonPointer,
  path: jsonPointer,
});

const CopyOperation = z.object({
  op: z.literal("copy"),
  from: jsonPointer,
  path: jsonPointer,
});

const TestOperation = z.object({
  op: z.literal("test"),
  path: jsonPointer,
  value: z.any(),
});

// The discriminated union acts as a switch statement based on the 'op' key
export const JsonPatchOperationSchema = z.discriminatedUnion("op", [
  AddOperation,
  RemoveOperation,
  ReplaceOperation,
  MoveOperation,
  CopyOperation,
  TestOperation,
]);

// The final schema representing the full array of patches
export const JsonPatchSchema = z.array(JsonPatchOperationSchema);

// Exporting the inferred TypeScript types for your function signatures
export type JsonPatchOperation = z.infer<typeof JsonPatchOperationSchema>;
export type JsonPatch = z.infer<typeof JsonPatchSchema>;

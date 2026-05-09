import { ConnectionAuth } from "./auth/auth";
import { ActionSpec } from "./spec/action";
import { ConnectionSpec } from "./spec/connection";
import { QuerySpec } from "./spec/query";

export async function invokeService({
  operation,
  connection,
  args,
}: {
  operation: QuerySpec | ActionSpec;
  connection: {
    spec: ConnectionSpec;
    auth?: ConnectionAuth;
  };
  args: Record<string, unknown>;
}): Promise<unknown> {}

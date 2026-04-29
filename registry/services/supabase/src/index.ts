import { createClient } from "@supabase/supabase-js";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ supabaseUrl, supabaseKey }: { supabaseUrl: string, supabaseKey: string }) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  return {
    auth: createResourceProxy("supabase", supabase, "auth"),
    storage: createResourceProxy("supabase", supabase, "storage"),
    functions: createResourceProxy("supabase", supabase, "functions")
  };
}

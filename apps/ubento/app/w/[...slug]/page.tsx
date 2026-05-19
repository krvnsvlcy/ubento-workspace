import { getSession } from "@/lib/auth";
import { routes } from "@/routes";
import { Dashboard } from "@/views/dashboard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Workspace() {
  const head = await headers();
  const session = await getSession(
    new Request("http://localhost", { headers: head }),
  );

  if (!session) {
    return redirect(routes.login());
  }

  return <Dashboard />;
}

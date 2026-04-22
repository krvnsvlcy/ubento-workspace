export async function authorizeUserScope({
  userId,
  scope,
  audience,
}: {
  userId: string;
  scope: string;
  audience: string | string[];
}): Promise<string[] | null> {
  return [];
}

export async function authorizeClientScope({
  userId,
  scope,
  audience,
}: {
  userId: string;
  scope: string;
  audience: string | string[];
}) {}

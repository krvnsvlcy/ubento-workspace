type Options = {
  field?: string; // default: "version"
  models?: string[]; // optional allowlist; if omitted -> all models
};

type PrismaModule = {
  PrismaClientKnownRequestError: any;
};

export function autoIncrementOnUpdate(
  defineExtension: (client: any) => any,
  opts: Options = {},
) {
  const field = opts.field ?? "version";
  const allow = opts.models?.map((m) => m.toLowerCase()); // model is lowercase in extensions

  // Helper to add { increment: 1 } if caller didn't set the field
  const bump = (data: any) => {
    if (!data) data = {};
    if (data[field] == null) data[field] = { increment: 1 };
    return data;
  };

  return defineExtension((client: any) =>
    client.$extends({
      name: "autoIncrementOnUpdate",
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }: any) {
            if (allow && !allow.includes(model)) {
              return query(args);
            }

            if (operation === "update" || operation === "updateMany") {
              args.data = bump(args.data);
            } else if (operation === "upsert") {
              // Only bump on the update path; creation usually sets default(1)
              args.update = bump(args.update);
            }
            return query(args);
          },
        },
      },
    }),
  );
}

export function isPrismaNotFoundError(
  prisma: PrismaModule,
  error: any,
): boolean {
  return (
    error instanceof prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}

export function isPrismaUniqueConstraintError(
  prisma: PrismaModule,
  error: any,
): boolean {
  return (
    error instanceof prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

export function isPrismaForeignKeyConstraintError(
  prisma: PrismaModule,
  error: any,
): boolean {
  return (
    error instanceof prisma.PrismaClientKnownRequestError &&
    error.code === "P2003"
  );
}

export function isPrismaConstraintError(
  prisma: PrismaModule,
  error: any,
): boolean {
  return (
    isPrismaUniqueConstraintError(prisma, error) ||
    isPrismaForeignKeyConstraintError(prisma, error)
  );
}

export function mongoDbUrlWithDatabase(url: string, database: string): string {
  const u = new URL(url);
  u.pathname = `/${database}`;
  return u.toString();
}

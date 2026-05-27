export const env = {
  AUTH_BASE_URL: import.meta.env.AUTH_ISSUER_URL || process.env.AUTH_ISSUER_URL!,
  CLIENT_ID: import.meta.env.AUTH_CLIENT_ID || process.env.AUTH_CLIENT_ID!,
  CLIENT_SECRET: import.meta.env.AUTH_CLIENT_SECRET || process.env.AUTH_CLIENT_SECRET!,
  SECRET: import.meta.env.SECRET || process.env.SECRET!,
  SESSION_KEY: import.meta.env.SESSION_KEY || process.env.SESSION_KEY || "ubento-session",
};

if (!env.AUTH_BASE_URL || !env.CLIENT_ID || !env.SECRET) {
  console.warn(
    "Required environment variables (AUTH_ISSUER_URL, AUTH_CLIENT_ID, SECRET) are missing.",
  );
}

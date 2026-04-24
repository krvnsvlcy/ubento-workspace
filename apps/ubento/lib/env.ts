export const env = {
  AUTH_BASE_URL: process.env.AUTH_ISSUER_URL!,
  CLIENT_ID: process.env.AUTH_CLIENT_ID!,
  CLIENT_SECRET: process.env.AUTH_CLIENT_SECRET!,
  UBENTO_API_AUDIENCE: process.env.UBENTO_API_AUDIENCE!,
  SECRET: process.env.SECRET!,
  SESSION_KEY: process.env.SESSION_KEY || "ubento-session",
  APP_URL_TEMPLATE:
    process.env.APP_URL_TEMPLATE || process.env.NEXT_PUBLIC_APP_URL_TEMPLATE!,
};

if (!env.AUTH_BASE_URL || !env.CLIENT_ID || !env.SECRET) {
  console.warn(
    "Required environment variables (AUTH_ISSUER_URL, AUTH_CLIENT_ID, SECRET) are missing.",
  );
}

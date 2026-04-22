/**
 * Trusted issuer configuration.
 * We keep jwksUri explicit because not all issuers use `${issuer}/.well-known/jwks.json`.
 */
export type TrustedIssuer = {
  issuer: string;
  jwksUri: string;
  algorithms?: Array<"RS256" | "ES256">;
};

export const defaultTrustedIssuers: TrustedIssuer[] = [
  {
    issuer: "https://auth.ubento.dev",
    jwksUri: "https://auth.ubento.dev/jwks",
    algorithms: ["RS256"],
  },
];

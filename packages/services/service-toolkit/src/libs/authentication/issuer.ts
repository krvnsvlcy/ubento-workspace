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
    issuer: "http://localhost:48041",
    jwksUri: "http://localhost:48041/jwks",
    algorithms: ["RS256"],
  },
  {
    issuer: "https://auth.ubento.pro",
    jwksUri: "https://auth.ubento.pro/jwks",
    algorithms: ["RS256"],
  },
];

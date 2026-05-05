import { JwtKeyStatus } from "@ubento/services.database/iam";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import * as jose from "jose";
import { env } from "../../env.js";
import prisma from "../../lib/prisma.js";

const algorithm = "RS256";

export async function getSigningKey() {
  const activeKey = await prisma.jwtSigningKey.findFirst({
    where: { status: JwtKeyStatus.ACTIVE },
  });

  if (activeKey) return activeKey;

  // Generate new key
  const { publicKey, privateKey } = await jose.generateKeyPair(algorithm, {
    extractable: true,
  });
  const publicJwk = await jose.exportJWK(publicKey);
  const privateJwk = await jose.exportJWK(privateKey);

  // Add kid
  const kid = makeEntityId({
    code: ubentoEntities.jwtSigningKey.code,
    bareId: generateBareId(),
  });

  publicJwk.kid = kid;
  privateJwk.kid = kid;

  // Storing private key as string (skipping encryption for MVP, or assume env.SECRET used later)
  const privateJwkString = JSON.stringify(privateJwk);

  const key = await prisma.jwtSigningKey.create({
    data: {
      id: kid,
      public_jwk: publicJwk as any,
      private_jwk_encrypted: privateJwkString,
      algorithm: algorithm,
      status: JwtKeyStatus.ACTIVE,
    },
  });

  return key;
}

export async function signAccessToken(
  payload: jose.JWTPayload,
  { expiresIn }: { expiresIn?: string },
) {
  const keyRecord = await getSigningKey();
  const privateJwk = JSON.parse(keyRecord.private_jwk_encrypted!);
  const privateKey = await jose.importJWK(privateJwk, algorithm);

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: algorithm, kid: keyRecord.id })
    .setIssuedAt()
    .setIssuer(env.AUTH_SERVER_BASE_URL)
    .setExpirationTime(expiresIn || "1h")
    .sign(privateKey);

  return jwt;
}

export async function verifyAccessToken({
  token,
  audience,
}: {
  token: string;
  audience?: string;
}) {
  const jwks = await getJwks();
  const JWKS = jose.createLocalJWKSet({ keys: jwks.keys as any });

  const { payload } = await jose.jwtVerify(token, JWKS, {
    issuer: env.AUTH_SERVER_BASE_URL,
    audience,
  });

  return payload;
}

export async function getJwks() {
  const keys = await prisma.jwtSigningKey.findMany({
    where: { status: { in: [JwtKeyStatus.ACTIVE, JwtKeyStatus.ROTATED] } },
  });

  return {
    keys: keys.map((k) => k.public_jwk),
  };
}

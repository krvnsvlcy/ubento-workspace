import "@ubento/bento.style/dist/uno.css";
import { UbentoSDK } from "@ubento/services.sdk";
import { Ubento, createUbentoEngine } from "@ubento/workspace.app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@ubento/bento.style/css/themes.css";

const user = {
  id: "usr_9pgl4ey9quh9875nay09u0gu",
  email: "agent.003@ubento.pro",
  password: "whn8qjr4hkd4UNE!rvm",
  name: "Agent 003",
  picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent003",
};
const team = {
  id: "tem_oha89a9gywglkv64t3c3wgjw",
};
const clientId = "clt_jibiqhio08v7ids2r0pne1xh";
const clientSecret =
  "sk_084a0a2105ac4de5049b48670646a671c70c38763a374d11848333e408c91b4e";

const authServerBaseUrl = "https://auth.ubento.pro";
// const authServerBaseUrl = "http://localhost:48041";

type Token = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

let token: Token | null = null;
async function getToken() {
  if (token) return token.access_token;

  const res = await fetch(new URL("/oauth/token", authServerBaseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "password",
      email: user.email,
      password: user.password,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  const data: Token = await res.json();
  token = data;
  localStorage.setItem("ubento-access-token", JSON.stringify(data));
  return data.access_token;
}

const engine = createUbentoEngine({
  session: {
    userId: user.id,
    teamId: team.id,
    email: user.email,
    name: user.name,
    picture: user.picture,
  },
  ubentoApi: new UbentoSDK({
    baseUrl: "https://api.ubento.pro",
    tokenManager: {
      getToken,
    },
    serviceBaseUrls: {
      // module: "http://localhost:28888",
      // intelligence: "http://localhost:44513",
      vertex: "http://localhost:28642",
      billing: "http://localhost:6124",
    },
  }),
  workspaceRuntimeUrl:
    import.meta.env.VITE_RUNTIME_URL || "http://localhost:4020",
  componentRuntimeUrl:
    import.meta.env.VITE_COMPONENT_RUNTIME_URL || "http://localhost:4030",
});

function BentoShell() {
  return <Ubento engine={engine} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BentoShell />
  </StrictMode>,
);

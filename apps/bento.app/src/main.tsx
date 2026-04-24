import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bento, type BentoHost, type BentoLocation } from "@ubento/bento-app";
import "@ubento/bento-style/css/themes.css";
import "@ubento/bento-style/dist/uno.css";
import { UbentoSDK } from "@ubento/sdk";
import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient();
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

// const authServerBaseUrl = "https://auth.ubento.pro";
const appServerBaseUrl = "http://localhost:48041";

type Token = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

function tokenIsValid(token: string) {
  if (!token) return false;
  try {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return expiry - Date.now() / 1000 > 60;
  } catch (e) {
    return false;
  }
}

async function getToken() {
  let token: Token | null = null;
  try {
    token = JSON.parse(localStorage.getItem("ubento-access-token") || "");
  } catch (e) {}

  if (token && tokenIsValid(token.access_token)) return token.access_token;
  localStorage.removeItem("ubento-access-token");

  if (token && token.refresh_token) {
    const res = await fetch(new URL("/oauth/token", appServerBaseUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    const data: Token = await res.json();
    console.log(data);
    localStorage.setItem("ubento-access-token", JSON.stringify(data));
    return data.access_token;
  }

  const res = await fetch(new URL("/oauth/token", appServerBaseUrl), {
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
  console.log(data);
  localStorage.setItem("ubento-access-token", JSON.stringify(data));
  return data.access_token;
}

function BentoApp() {
  const [location, setLocation] = useState<BentoLocation>({
    view: "home",
    params: {},
  });

  const host: BentoHost = useMemo(
    () => ({
      session: {
        userId: user.id,
        teamId: team.id,
      },
      ubento: new UbentoSDK({
        baseUrl: "https://api.ubento.pro",
        tokenManager: {
          getToken,
        },
        serviceBaseUrls: {
          app: "http://localhost:13020",
        },
      }),
      iframeUrl: import.meta.env.VITE_RUNTIME_URL || "http://localhost:4020",
      goToLocation: (loc) => setLocation(loc),
    }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Bento host={host} location={location} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BentoApp />
  </StrictMode>,
);

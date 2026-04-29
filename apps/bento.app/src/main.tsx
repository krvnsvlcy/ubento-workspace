import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Ubento, createUbentoEngine, type UbentoLocation } from "@ubento/bento-app";
import "@ubento/bento-style/dist/uno.css";
import { UbentoSDK } from "@ubento/sdk";
import { StrictMode, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";

import "@ubento/bento-style/css/themes.css";

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

function parseLocation(path: string): UbentoLocation {
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "w" && parts[1]) {
    return {
      view: "workspace",
      params: { slug: parts[1], boardId: parts[2] },
    };
  }
  if (parts[0] === "workspaces") {
    return { view: "workspaces", params: {} };
  }
  return { view: "home", params: {} };
}

function buildUrl(location: UbentoLocation): string {
  if (location.view === "workspace") {
    return `/w/${location.params.slug}${location.params.boardId ? `/${location.params.boardId}` : ""}`;
  }
  if (location.view === "workspaces") {
    return "/workspaces";
  }
  return "/";
}

function BentoShell() {
  const engine = useMemo(() => {
    const e = createUbentoEngine({
      session: {
        userId: user.id,
        teamId: team.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
      location: parseLocation(window.location.pathname),
      ubentoApi: new UbentoSDK({
        baseUrl: "https://api.ubento.pro",
        tokenManager: {
          getToken,
        },
        serviceBaseUrls: {
          module: "http://localhost:28888",
        },
      }),
      workspaceRuntimeUrl: import.meta.env.VITE_RUNTIME_URL || "http://localhost:4020",
      moduleUrlTemplate:
        import.meta.env.VITE_MODULE_URL_TEMPLATE ||
        "https://modules.ubento.pro/{moduleId}/{versionId}/index.js",
      componentRuntimeUrl:
        import.meta.env.VITE_COMPONENT_RUNTIME_URL || "http://localhost:4030",
    });

    const originalGoToLocation = e.goToLocation;
    e.goToLocation = (loc) => {
      const url = buildUrl(loc);
      if (window.location.pathname !== url) {
        window.history.pushState(null, "", url);
      }
      originalGoToLocation(loc);
    };

    return e;
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      engine.goToLocation(parseLocation(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [engine]);

  return (
    <QueryClientProvider client={queryClient}>
      <Ubento engine={engine} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BentoShell />
  </StrictMode>,
);

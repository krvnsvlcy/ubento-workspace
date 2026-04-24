export interface Host {
  currentSession?: {
    name?: string;
    picture?: string;
    tenantId?: string;
  } | null;
  ubento: {
    app: {
      listApps: (args: { team_id: string }) => Promise<any[]>;
      createApp: (args: { name: string; team_id: string }) => Promise<any>;
    };
  };
  iframeUrl?: string; // The URL to load in the iframe, e.g., "http://localhost:4020"
}

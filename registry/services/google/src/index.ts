import { google } from "googleapis";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ auth }: { auth: any }) {
  const calendar = google.calendar({ version: "v3", auth });
  return {
    events: createResourceProxy("google", calendar, "events"),
    calendars: createResourceProxy("google", calendar, "calendars"),
    settings: createResourceProxy("google", calendar, "settings")
  };
}

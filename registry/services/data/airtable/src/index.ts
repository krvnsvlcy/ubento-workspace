import Airtable from "airtable";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ apiKey }: { apiKey: string }) {
  const airtable = new Airtable({ apiKey });
  return {
    base: airtable.base.bind(airtable)
  };
}

import { createJsonType } from "@ubento/data-transfer";

type ModuleReference = { id: string; versionId?: string; scope?: string };

export const bentoModuleType = createJsonType<{
  ref: ModuleReference;
}>("application/vnd.bento.module");

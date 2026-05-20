import { ModuleReference } from "@ubento/bento.runtime";
import { createJsonType } from "@ubento/data-transfer";

export const bentoModuleType = createJsonType<{
  ref: ModuleReference;
}>("application/vnd.bento.module");

import { ModuleReference } from "@ubento/bento.engine";
import { createJsonType } from "@ubento/data-transfer";

export const bentoModuleType = createJsonType<{
  ref: ModuleReference;
}>("application/vnd.bento.module");

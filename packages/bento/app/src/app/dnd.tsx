import { createJsonType } from "@ubento/data-transfer";
import { ModuleReference } from "@ubento/engine";

export const bentoModuleType = createJsonType<{
  ref: ModuleReference;
}>("application/vnd.bento.module");

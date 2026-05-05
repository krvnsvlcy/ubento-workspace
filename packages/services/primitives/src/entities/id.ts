export type EntityIdStruct = {
  code: string;
  bareId: string;
};

export function makeEntityId({ code, bareId }: EntityIdStruct): string {
  return `${code}_${bareId}`;
}
export function parseEntityId(entityId: string): EntityIdStruct {
  const [code, bareId] = entityId.split("_", 2);
  return { code: code || "", bareId: bareId || "" };
}

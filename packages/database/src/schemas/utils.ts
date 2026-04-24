export function cleanUpJsonSchema(schema: any): any {
  if (schema === null || typeof schema !== "object") {
    return schema;
  }
  if (Array.isArray(schema)) {
    return schema.map((item) => cleanUpJsonSchema(item));
  }
  const cleanedSchema: any = {};
  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      const value = schema[key];
      if (key === "type" && Array.isArray(value)) {
        const nonNullTypes = value.filter((t) => t !== "null");
        if (nonNullTypes.length === 1) {
          cleanedSchema[key] = nonNullTypes[0];
        } else if (nonNullTypes.includes("object")) {
          cleanedSchema[key] = "object";
        } else {
          cleanedSchema[key] = value;
        }
      } else {
        cleanedSchema[key] = cleanUpJsonSchema(value);
      }
    }
  }
  return cleanedSchema;
}

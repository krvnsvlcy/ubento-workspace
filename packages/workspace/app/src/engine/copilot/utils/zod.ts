import { z, ZodObject, ZodTypeAny } from "zod";

// Helper to recursively parse a schema's type into a string representation
function parseTypeToString(schema: ZodTypeAny): string {
  try {
    // Use constructor name as a fallback for type detection
    const typeName = schema.constructor.name;

    switch (typeName) {
      case "ZodObject":
        return "**object**";
      case "ZodString":
        return "**string**";
      case "ZodNumber":
        return "**number**";
      case "ZodBoolean":
        return "**boolean**";
      case "ZodDate":
        return "**Date**";
      case "ZodArray":
        // For arrays, try to get the element type safely
        const arrayDef = (schema as any)._def;
        if (arrayDef && arrayDef.type) {
          return `Array<${parseTypeToString(arrayDef.type)}>`;
        }
        return "Array<unknown>";
      case "ZodEnum":
        // For enums, try to get values safely
        const enumDef = (schema as any)._def;
        if (enumDef && enumDef.values && Array.isArray(enumDef.values)) {
          return enumDef.values
            .map((v: any) => `\`"${v.toString()}"\``)
            .join(" | ");
        }
        return "**enum**";
      case "ZodUnion":
        // For unions, try to get options safely
        const unionDef = (schema as any)._def;
        if (unionDef && unionDef.options && Array.isArray(unionDef.options)) {
          return unionDef.options
            .map((opt: ZodTypeAny) => parseTypeToString(opt))
            .join(" | ");
        }
        return "**union**";
      case "ZodLiteral":
        // For literals, try to get value safely
        const literalDef = (schema as any)._def;
        if (literalDef && "value" in literalDef) {
          return `\`${JSON.stringify(literalDef.value)}\``;
        }
        return "**literal**";
      case "ZodOptional":
        // For optional, try to get inner type safely
        const optionalDef = (schema as any)._def;
        if (optionalDef && optionalDef.innerType) {
          return parseTypeToString(optionalDef.innerType);
        }
        return "**optional**";
      case "ZodNullable":
        // For nullable, try to get inner type safely
        const nullableDef = (schema as any)._def;
        if (nullableDef && nullableDef.innerType) {
          return parseTypeToString(nullableDef.innerType);
        }
        return "**nullable**";
      case "ZodDefault":
        // For default, try to get inner type and default value safely
        const defaultDef = (schema as any)._def;
        if (defaultDef && defaultDef.innerType) {
          const innerType = parseTypeToString(defaultDef.innerType);
          if (
            defaultDef.defaultValue &&
            typeof defaultDef.defaultValue === "function"
          ) {
            try {
              const defaultValue = JSON.stringify(defaultDef.defaultValue());
              return `${innerType} (default: \`${defaultValue}\`)`;
            } catch {
              return `${innerType} (default: <function>)`;
            }
          }
          return innerType;
        }
        return "**default**";
      case "ZodAny":
        return "**any**";
      case "ZodUnknown":
        return "**unknown**";
      default:
        return `**${typeName}**`;
    }
  } catch (error) {
    // Fallback if anything goes wrong
    return "**unknown**";
  }
}

/**
 * Recursively traverses a Zod schema to build a flat list of fields.
 * @param schema The Zod schema to parse.
 * @param lines The array to accumulate markdown lines into.
 * @param prefix The current dot-notation prefix for field names.
 */
function parseSchemaToList(
  schema: ZodTypeAny,
  lines: string[],
  prefix = "",
): void {
  const typeName = schema.constructor.name;

  if (typeName !== "ZodObject") {
    throw new Error(
      "This function only supports a ZodObject as the root schema.",
    );
  }

  try {
    const def = (schema as ZodObject<any>)._def;
    const shape = def.shape;

    for (const key in shape) {
      const fieldSchema = (shape as any)[key] as ZodTypeAny;
      const fieldTypeName = fieldSchema.constructor.name;
      const currentPath = prefix ? `${prefix}.${key}` : key;

      const typeString = parseTypeToString(fieldSchema);
      // Check if the field is optional by checking if it's wrapped in ZodOptional
      const isOptional = fieldTypeName === "ZodOptional";
      const description = (fieldSchema as any).description || "";

      let line = `- \`${currentPath}\`: ${typeString}`;
      if (description || isOptional) {
        line += " - ";
      }
      if (isOptional) {
        line += "(optional) ";
      }
      line += description;

      lines.push(line);

      // Recurse into nested objects
      if (fieldTypeName === "ZodObject") {
        parseSchemaToList(fieldSchema, lines, currentPath);
      }
      // Handle optional objects
      else if (fieldTypeName === "ZodOptional") {
        const innerSchema = (fieldSchema as any)._def?.innerType;
        if (innerSchema && innerSchema.constructor.name === "ZodObject") {
          parseSchemaToList(innerSchema, lines, currentPath);
        }
      }
      // Recurse into arrays of objects
      else if (fieldTypeName === "ZodArray") {
        const arrayElementSchema = (fieldSchema as any)._def?.type;
        if (
          arrayElementSchema &&
          arrayElementSchema.constructor.name === "ZodObject"
        ) {
          parseSchemaToList(arrayElementSchema, lines, `${currentPath}[n]`);
        }
      }
    }
  } catch (error) {
    // If we can't parse the schema structure, add a fallback message
    lines.push("- Unable to parse schema structure");
  }
}

export function generateZodSchemaMarkdown(schema: z.ZodObject<any>): string {
  const lines: string[] = [];
  parseSchemaToList(schema, lines);
  return lines.join("\n");
}

export function safeNullable(schema: z.ZodTypeAny) {
  return z.preprocess((value) => {
    if (value === "null") {
      return null;
    }
    return value;
  }, schema.nullable());
}

export function cleanJsonSchema(schema: any) {
  if (typeof schema === "object") {
    delete schema.$schema;
  }
  return schema;
}

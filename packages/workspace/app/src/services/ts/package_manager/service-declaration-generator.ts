function jsonSchemaToTs(schema: any, serviceName: string): string {
  if (!schema) return "any";
  if (schema.type === "$ref" && typeof schema.ref === "string") {
    const refName = schema.ref.split("/").pop();
    return refName ? `UbentoService_${serviceName}.${refName}` : "any";
  }

  switch (schema.type) {
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    case "null":
      return "null";
    case "array": {
      const itemsType = jsonSchemaToTs(schema.items, serviceName);
      return `Array<${itemsType}>`;
    }
    case "object": {
      if (!schema.properties) return "Record<string, any>";
      const props = Object.entries(schema.properties).map(([key, propSchema]) => {
        const isRequired = Array.isArray(schema.required) && schema.required.includes(key);
        const typeStr = jsonSchemaToTs(propSchema, serviceName);
        return `    ${key}${isRequired ? "" : "?"}: ${typeStr};`;
      });
      return `{\n${props.join("\n")}\n  }`;
    }
    default:
      return "any";
  }
}

function operationArgsToTs(args: Record<string, any> | undefined, serviceName: string): string {
  if (!args || Object.keys(args).length === 0) return "Record<string, never>";
  const props = Object.entries(args).map(([key, argObj]: [string, any]) => {
    const isRequired = argObj.required === true;
    const typeStr = jsonSchemaToTs(argObj.schema, serviceName);
    return `      ${key}${isRequired ? "" : "?"}: ${typeStr};`;
  });
  return `{\n${props.join("\n")}\n    }`;
}

export function generateServiceDeclarations(specs: Record<string, any>): string {
  const namespaces: string[] = [];
  const serviceEntries: string[] = [];

  for (const [serviceName, spec] of Object.entries(specs)) {
    // 1. Generate schemas namespace
    const schemaDefs: string[] = [];
    if (spec.schemas) {
      for (const [schemaName, schema] of Object.entries(spec.schemas)) {
        schemaDefs.push(`  export interface ${schemaName} ${jsonSchemaToTs(schema, serviceName)}`);
      }
    }
    namespaces.push(`declare namespace UbentoService_${serviceName} {\n${schemaDefs.join("\n\n")}\n}`);

    if (spec.type === "mongodb") {
      const collections: string[] = [];
      if (spec.collections) {
        for (const col of spec.collections) {
          const docType = col.schema ? jsonSchemaToTs(col.schema, serviceName) : "any";
          collections.push(`        "${col.name}": {\n          document: ${docType};\n        };`);
        }
      }
      serviceEntries.push(`    "${serviceName}": {
      queries: Record<string, never>;
      actions: Record<string, never>;
      collections: {
${collections.join("\n")}
      };
    };`);
    } else {
      // 2. Generate service operations
      const queries: string[] = [];
      if (spec.queries) {
        for (const [queryName, queryOp] of Object.entries(spec.queries)) {
          const argsType = operationArgsToTs((queryOp as any).args, serviceName);
          const resultType = jsonSchemaToTs((queryOp as any).schema, serviceName);
          queries.push(`        "${queryName}": {\n          args: ${argsType};\n          result: ${resultType};\n        };`);
        }
      }

      const actions: string[] = [];
      if (spec.actions) {
        for (const [actionName, actionOp] of Object.entries(spec.actions)) {
          const argsType = operationArgsToTs((actionOp as any).args, serviceName);
          const resultType = jsonSchemaToTs((actionOp as any).schema, serviceName);
          actions.push(`        "${actionName}": {\n          args: ${argsType};\n          result: ${resultType};\n        };`);
        }
      }

      serviceEntries.push(`    "${serviceName}": {
      queries: {
${queries.join("\n")}
      };
      actions: {
${actions.join("\n")}
      };
      collections: Record<string, never>;
    };`);
    }
  }

  return `// Generated service declarations
${namespaces.join("\n\n")}

declare module "ubento" {
  export interface UbentoServices {
${serviceEntries.join("\n")}
  }
}
`;
}

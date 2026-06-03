import { OperationSpec } from "./operation.js";
import {
  HttpConnectionSpec,
  httpHandlerSchema,
} from "./protocols/http/handler.js";
import { ServiceSpecV1_r } from "./service.js";

export interface ServiceSpecTemplate {
  name: string;
  summary?: string;
  tags?: string[];
  baseUrl?: string;
  connection: HttpConnectionSpec;
  discover?: boolean;
  queries?: Record<
    string,
    {
      path: string;
      method?: string;
      name?: string;
    }
  >;
  actions?: Record<
    string,
    {
      path: string;
      method?: string;
      name?: string;
    }
  >;
}

/**
 * Ensures a string is safely formatted as camelCase,
 * stripping invalid characters from raw OpenAPI properties.
 */
function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}

/**
 * Specialized generator for operation names and IDs.
 * Can be exported and tested independently.
 */
export function generateOperationName(
  method: string,
  path: string,
  operation: any = {},
): string {
  // 1. Explicit operationId is the best source of truth, but must be sanitized
  if (operation.operationId) {
    return toCamelCase(operation.operationId);
  }

  // 2. Fallback: Map HTTP methods to standard action verbs
  const methodActionMap: Record<string, string> = {
    get: "get",
    post: "create",
    put: "update",
    patch: "update",
    delete: "delete",
  };

  const verb = methodActionMap[method.toLowerCase()] || method.toLowerCase();

  // 3. Parse the path to generate a readable name
  // Example: /workspaces/{workspaceId}/projects -> getWorkspacesByWorkspaceIdProjects
  const segments = path.split("/").filter(Boolean);
  const nameParts = [verb];

  for (const segment of segments) {
    if (segment.startsWith("{") && segment.endsWith("}")) {
      // It's a path parameter
      const paramName = segment.slice(1, -1);
      nameParts.push("By", paramName);
    } else {
      // It's a static route segment (strip any weird chars just in case)
      nameParts.push(segment.replace(/[^a-zA-Z0-9]/g, ""));
    }
  }

  // Join everything into a single camelCase string
  return toCamelCase(nameParts.join("-"));
}

export function generateServiceSpecFromOpenApi({
  openapi,
  template,
}: {
  openapi: any;
  template: ServiceSpecTemplate;
}): ServiceSpecV1_r {
  const schemas: Record<string, any> = {};

  function sortObjectKeys<T extends Record<string, any>>(
    obj: T | undefined,
  ): T | undefined {
    if (!obj) return obj;
    const sorted: any = {};
    for (const key of Object.keys(obj).sort()) {
      sorted[key] = obj[key];
    }
    return sorted;
  }

  function processSchema(schema: any): any {
    if (!schema) return { type: "object" };

    if (schema.$ref) {
      const originalRef = schema.$ref;
      if (originalRef.startsWith("#/components/schemas/")) {
        const refName = schema.$ref.replace(
          "#/components/schemas/",
          "#/schemas/",
        );
        return { type: "$ref", ref: refName };
      } else {
        return {
          type: "object",
          properties: {
            dynamicPayload: true,
          },
        };
      }
    }

    const type = schema.type;

    if (type === "object") {
      const properties: Record<string, any> = {};
      if (schema.properties) {
        for (const [k, v] of Object.entries(schema.properties)) {
          properties[k] = processSchema(v);
        }
      }
      return { ...schema, properties };
    }

    if (type === "array") {
      return {
        ...schema,
        items: processSchema(schema.items),
      };
    }

    return { ...schema };
  }

  // 1. Convert schemas
  if (openapi.components && openapi.components.schemas) {
    for (const [name, schema] of Object.entries(openapi.components.schemas)) {
      schemas[name] = processSchema(schema);
    }
  }

  const spec: ServiceSpecV1_r = {
    spec: 1,
    name: template.name,
    description: template.summary,
    tags: template.tags,
    type: "http",
    connection: template.connection,
    schemas,
    queries: {},
    actions: {},
  };

  function createOperation(
    path: string,
    method: string,
    tplOp: any = {},
  ): OperationSpec<typeof httpHandlerSchema> | null {
    const pathObj = openapi.paths?.[path];
    if (!pathObj) return null;

    const op = pathObj[method.toLowerCase()];
    if (!op) return null;

    const args: Record<string, any> = {};
    const paramsMap: Record<string, any> = {};
    const queryMap: Record<string, any> = {};

    // Merge parameters from path level and operation level
    const allParameters = [
      ...(pathObj.parameters || []),
      ...(op.parameters || []),
    ];

    for (const param of allParameters) {
      // Skip resolved/complex refs for now or handle them simply
      const argName = param.name;
      args[argName] = {
        schema: processSchema(param.schema),
        required: param.required || false,
      };
      if (param.in === "path") {
        paramsMap[argName] = { $resolve: `args.${argName}` };
      } else if (param.in === "query") {
        queryMap[argName] = { $resolve: `args.${argName}` };
      }
    }

    let bodyMap = undefined;
    if (op.requestBody && op.requestBody.content) {
      const jsonContent = op.requestBody.content["application/json"];
      if (jsonContent && jsonContent.schema) {
        args["data"] = {
          schema: processSchema(jsonContent.schema),
          required: op.requestBody.required || false,
        };
        bodyMap = {
          type: "json" as const,
          data: { $resolve: "args.data" },
        };
      }
    }

    let resSchema = { type: "object" };
    if (op.responses && op.responses["200"] && op.responses["200"].content) {
      const jsonContent = op.responses["200"].content["application/json"];
      if (jsonContent && jsonContent.schema) {
        resSchema = processSchema(jsonContent.schema);
      }
    }

    return {
      // Use the injected template name, or fall back to the new generator
      name: tplOp.name || generateOperationName(method, path, op),
      description: op.description,
      schema: resSchema,
      args,
      handler: {
        request: {
          method: method.toUpperCase() as any,
          path: path,
          params: Object.keys(paramsMap).length > 0 ? paramsMap : undefined,
          query: Object.keys(queryMap).length > 0 ? queryMap : undefined,
          body: bodyMap,
        },
      },
    };
  }

  // 3. Add queries
  if (template.queries) {
    for (const [key, tplOp] of Object.entries(template.queries)) {
      const op = createOperation(tplOp.path, tplOp.method || "get", tplOp);
      if (op) spec.queries![key] = op;
    }
  }

  // 4. Add actions
  if (template.actions) {
    for (const [key, tplOp] of Object.entries(template.actions)) {
      const op = createOperation(tplOp.path, tplOp.method || "post", tplOp);
      if (op) spec.actions![key] = op;
    }
  }

  // 5. Discovery
  if (template.discover && openapi.paths) {
    const mappedPaths = new Set<string>();
    if (template.queries) {
      for (const tpl of Object.values(template.queries)) {
        mappedPaths.add(`${tpl.method || "get"}:${tpl.path}`);
      }
    }
    if (template.actions) {
      for (const tpl of Object.values(template.actions)) {
        mappedPaths.add(`${tpl.method || "post"}:${tpl.path}`);
      }
    }

    for (const [path, methods] of Object.entries(openapi.paths)) {
      for (const method of Object.keys(methods as any)) {
        if (!["get", "post", "put", "patch", "delete"].includes(method))
          continue;
        if (mappedPaths.has(`${method}:${path}`)) continue;

        const op = createOperation(path, method);
        if (op) {
          // Generate a safe, deterministic ID for discovered routes
          const opId = generateOperationName(
            method,
            path,
            (methods as any)[method],
          );

          if (method === "get") {
            spec.queries![opId] = op;
          } else {
            spec.actions![opId] = op;
          }
        }
      }
    }
  }

  spec.schemas = sortObjectKeys(spec.schemas);
  spec.queries = sortObjectKeys(spec.queries);
  spec.actions = sortObjectKeys(spec.actions);

  return spec;
}

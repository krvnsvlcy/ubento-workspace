import { OperationSpec } from "./operation.js";
import { HttpHandler } from "./protocols/http.js";
import { ServiceSpecV1 } from "./service.js";

export interface ServiceSpecTemplate {
  name: string;
  baseUrl?: string;
  provider?: string;
  discover?: boolean;
  entities?: Record<
    string,
    {
      name: string;
      primaryKey: string;
      schema: string;
    }
  >;
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

export function generateServiceSpec(
  openapi: any,
  template: ServiceSpecTemplate,
): ServiceSpecV1 {
  const schemas: Record<string, any> = {};

  function convertSchema(schema: any): any {
    if (!schema) return { type: "object" };

    if (schema.$ref) {
      const refName = schema.$ref.replace("#/components/schemas/", "");
      return { type: "ref", ref: refName };
    }

    if (schema.allOf || schema.oneOf || schema.anyOf) {
      // simplification: take the first one
      const list = schema.allOf || schema.oneOf || schema.anyOf;
      return convertSchema(list[0]);
    }

    const type = schema.type || "object";

    if (type === "object") {
      const properties: Record<string, any> = {};
      if (schema.properties) {
        for (const [k, v] of Object.entries(schema.properties)) {
          properties[k] = convertSchema(v);
        }
      }
      const res: any = { type: "object", properties };
      if (schema.required) res.required = schema.required;
      return res;
    }

    if (type === "array") {
      return {
        type: "array",
        items: convertSchema(schema.items),
      };
    }

    if (["string", "number", "integer", "boolean"].includes(type)) {
      return { type: type === "integer" ? "number" : type };
    }

    return { type: "object" }; // fallback
  }

  // 1. Convert schemas
  if (openapi.components && openapi.components.schemas) {
    for (const [name, schema] of Object.entries(openapi.components.schemas)) {
      schemas[name] = convertSchema(schema);
    }
  }

  const spec: ServiceSpecV1 = {
    spec: 1,
    name: template.name,
    type: "http",
    connection: {
      provider: template.provider || template.name,
      baseUrl: template.baseUrl || openapi.servers?.[0]?.url || "",
    },
    schemas,
    entities: {},
    queries: {},
    actions: {},
  };

  // 2. Add entities
  if (template.entities) {
    for (const [key, entity] of Object.entries(template.entities)) {
      spec.entities![key] = {
        name: entity.name,
        primaryKey: entity.primaryKey,
        schema: { type: "ref", ref: entity.schema },
      };
    }
  }

  function createOperation(
    path: string,
    method: string,
    tplOp: any = {},
  ): OperationSpec<HttpHandler> | null {
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
        schema: convertSchema(param.schema),
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
          schema: convertSchema(jsonContent.schema),
          required: op.requestBody.required || false,
        };
        bodyMap = {
          type: "json",
          data: { $resolve: "args.data" },
        };
      }
    }

    let resSchema = { type: "object" };
    if (op.responses && op.responses["200"] && op.responses["200"].content) {
      const jsonContent = op.responses["200"].content["application/json"];
      if (jsonContent && jsonContent.schema) {
        resSchema = convertSchema(jsonContent.schema);
      }
    }

    return {
      name: tplOp.name || op.summary || op.operationId || `${method} ${path}`,
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

        const opId =
          (methods as any)[method].operationId ||
          `${method}${path.replace(/[\/\{\}]/g, "_")}`;
        const op = createOperation(path, method);
        if (op) {
          if (method === "get") {
            spec.queries![opId] = op;
          } else {
            spec.actions![opId] = op;
          }
        }
      }
    }
  }

  return spec;
}

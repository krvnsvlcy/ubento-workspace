import assert from "assert";
import { Request, Response, Router } from "express";

// OpenAPI Spec route
export const openApiSpec = (name: string, spec: any): Router => {
  const router = Router();
  router.get(`/meta/${name}/openapi.json`, (req: Request, res: Response) => {
    res.json(spec);
  });
  return router;
};

/* Rebase $ref fields in an object from one base path to another */
export function rebaseRefs<T>(obj: T, from: string, to: string): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => rebaseRefs(item, from, to)) as unknown as T;
  } else if (obj && typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      if (
        key === "$ref" &&
        typeof obj[key] === "string" &&
        obj[key].startsWith(from)
      ) {
        newObj[key] = to + obj[key].slice(from.length);
      } else {
        newObj[key] = rebaseRefs((obj as any)[key], from, to);
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

export type JsonSchemaOutput = {
  definitions: Record<
    string,
    {
      type: any;
      properties?: Record<
        string,
        {
          type: any;
        }
      >;
      required?: string[];
    }
  >;
};
export function standardizeJsonSchemaOutput<T extends JsonSchemaOutput>(
  obj: T
): T {
  // rebase
  const rebased = rebaseRefs(obj, "#/definitions", "#/components/schemas");
  // require core fields
  for (const name in rebased.definitions) {
    const type = rebased.definitions[name];
    if (!type.properties) continue;

    if ("id" in type.properties && "entity" in type.properties) {
      // entity type
      assert(
        type.properties.id.type === "string",
        "entity id must be of type string"
      );
      assert(
        type.properties.entity.type === "string",
        "entity type must be of type string"
      );

      // other properties
      assert(
        "version" in type.properties,
        "every entity must have a version field"
      );
      assert(
        type.properties.version.type === "integer",
        "entity version must be of type integer"
      );
      assert(
        "created_at" in type.properties,
        "every entity must have a created_at field"
      );
      assert(
        type.properties.created_at.type === "string",
        "entity created_at must be of type string"
      );
      assert(
        "updated_at" in type.properties,
        "every entity must have an updated_at field"
      );
      assert(
        type.properties.updated_at.type === "string",
        "entity updated_at must be of type string"
      );

      // make sure all properties are required
      const required = new Set([
        ...(type.required || []),
        "id",
        "entity",
        "version",
        "created_at",
        "updated_at",
      ]);
      type.required = Array.from(required).sort();
    }
  }

  return rebased;
}

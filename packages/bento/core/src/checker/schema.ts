export interface BaseSchema {
  description?: string;
}

export interface StringSchema extends BaseSchema {
  type: "string";
  enum?: string[];
}

export interface NumberSchema extends BaseSchema {
  type: "number";
}

export interface BooleanSchema extends BaseSchema {
  type: "boolean";
}

export interface NullSchema extends BaseSchema {
  type: "null";
}

export interface ArraySchema extends BaseSchema {
  type: "array";
  items?: ObjectSchema;
}

export interface ObjectNodeSchema extends BaseSchema {
  type: "object";
  properties?: Record<string, ObjectSchema>;
  required?: string[];
  additionalProperties?: boolean | ObjectSchema;
}

export interface FunctionSchema extends BaseSchema {
  type: "function";
  parameters?: ObjectNodeSchema; // named parameters
  returns?: ObjectSchema;
}

export interface AnySchema extends BaseSchema {
  type: "any";
}

export interface UnionSchema extends BaseSchema {
  type: "union";
  types: ObjectSchema[];
}

export type ObjectSchema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | NullSchema
  | ArraySchema
  | ObjectNodeSchema
  | FunctionSchema
  | UnionSchema
  | AnySchema;

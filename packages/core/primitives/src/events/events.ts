export type Event = {
  type: string;
  payload: any;
};

export const ubentoEventTypes = {
  entity: {
    created: "entity.created",
    updated: "entity.updated",
    deleted: "entity.deleted",
  },
} as const;

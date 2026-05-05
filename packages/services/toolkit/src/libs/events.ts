import { PubSub } from "@google-cloud/pubsub";
import { ubentoEventTypes } from "@ubento/services.primitives";

export function createEventPublisher({
  topicName = "ubento-events",
}: {
  topicName?: string;
} = {}) {
  const pubSubClient = new PubSub();
  const eventTopic = pubSubClient.topic(topicName);

  async function publishEvent(
    type: string,
    payload: any,
    attributes: Record<string, string> = {},
  ) {
    const messageId = await eventTopic.publishMessage({
      json: {
        type,
        payload,
      },
      attributes: {
        "content-type": "application/json",
        ...attributes,
      },
    });
    return messageId;
  }

  async function publishEntity(
    event: "created" | "updated" | "deleted",
    entity: { id: string; entity: string },
  ) {
    switch (event) {
      case "created":
        return publishEvent(ubentoEventTypes.entity.created, entity, {
          "ubento-entity": entity.entity,
        });
      case "updated":
        return publishEvent(ubentoEventTypes.entity.updated, entity, {
          "ubento-entity": entity.entity,
        });
      case "deleted":
        return publishEvent(ubentoEventTypes.entity.deleted, entity, {
          "ubento-entity": entity.entity,
        });
    }
  }

  return { publishEvent, publishEntity };
}

import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "zendesk",
  "type": "http",
  "connection": {
    "provider": "zendesk",
    "baseUrl": "https://{subdomain}.zendesk.com/sc"
  },
  "schemas": {
    "page": {
      "type": "object",
      "properties": {
        "after": {
          "type": "string"
        },
        "before": {
          "type": "string"
        },
        "size": {
          "type": "number"
        }
      }
    },
    "displayName": {
      "type": "string"
    },
    "appSettings": {
      "type": "object",
      "properties": {
        "conversationRetentionSeconds": {
          "type": "number"
        },
        "maskCreditCardNumbers": {
          "type": "boolean"
        },
        "useAnimalNames": {
          "type": "boolean"
        },
        "echoPostback": {
          "type": "boolean"
        },
        "ignoreAutoConversationStart": {
          "type": "boolean"
        },
        "multiConvoEnabled": {
          "type": "boolean"
        },
        "appLocalizationEnabled": {
          "type": "boolean"
        },
        "endSessionEnabled": {
          "type": "boolean"
        },
        "disableConversationReopen": {
          "type": "boolean"
        }
      }
    },
    "metadata": {
      "type": "object",
      "properties": {}
    },
    "app": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "displayName": {
          "type": "ref",
          "ref": "displayName"
        },
        "settings": {
          "type": "ref",
          "ref": "appSettings"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      }
    },
    "meta": {
      "type": "object",
      "properties": {
        "hasMore": {
          "type": "boolean"
        },
        "afterCursor": {
          "type": "string"
        },
        "beforeCursor": {
          "type": "string"
        }
      }
    },
    "links": {
      "type": "object",
      "properties": {
        "prev": {
          "type": "string"
        },
        "next": {
          "type": "string"
        }
      }
    },
    "appListResponse": {
      "type": "object",
      "properties": {
        "apps": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "app"
          }
        },
        "meta": {
          "type": "ref",
          "ref": "meta"
        },
        "links": {
          "type": "ref",
          "ref": "links"
        }
      }
    },
    "error": {
      "type": "object",
      "properties": {
        "code": {
          "type": "string"
        },
        "title": {
          "type": "string"
        }
      }
    },
    "errorResponse": {
      "type": "object",
      "properties": {
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "error"
          }
        }
      }
    },
    "appCreateBody": {
      "type": "object",
      "properties": {
        "displayName": {
          "type": "ref",
          "ref": "displayName"
        },
        "settings": {
          "type": "ref",
          "ref": "appSettings"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      },
      "required": [
        "displayName"
      ]
    },
    "appResponse": {
      "type": "object",
      "properties": {
        "app": {
          "type": "ref",
          "ref": "app"
        }
      }
    },
    "appSubdomain": {
      "type": "object",
      "properties": {
        "subdomain": {
          "type": "string"
        }
      }
    },
    "appResponseWithSubdomain": {
      "type": "object",
      "properties": {
        "app": {
          "type": "ref",
          "ref": "app"
        }
      }
    },
    "appUpdateBody": {
      "type": "object",
      "properties": {
        "displayName": {
          "type": "ref",
          "ref": "displayName"
        },
        "settings": {
          "type": "ref",
          "ref": "appSettings"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      }
    },
    "appKey": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "displayName": {
          "type": "string"
        },
        "secret": {
          "type": "string"
        }
      }
    },
    "appKeyListResponse": {
      "type": "object",
      "properties": {
        "keys": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "appKey"
          }
        }
      }
    },
    "appKeyResponse": {
      "type": "object",
      "properties": {
        "key": {
          "type": "ref",
          "ref": "appKey"
        }
      }
    },
    "attachmentUploadBody": {
      "type": "object",
      "properties": {
        "source": {
          "type": "string"
        }
      },
      "required": [
        "source"
      ]
    },
    "attachmentSchema": {
      "type": "object",
      "properties": {
        "mediaUrl": {
          "type": "string"
        },
        "mediaType": {
          "type": "string"
        }
      }
    },
    "attachmentResponse": {
      "type": "object",
      "properties": {
        "attachment": {
          "type": "ref",
          "ref": "attachmentSchema"
        }
      }
    },
    "attachmentDeleteBody": {
      "type": "object",
      "properties": {
        "mediaUrl": {
          "type": "string"
        }
      },
      "required": [
        "mediaUrl"
      ]
    },
    "conversationType": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "switchboardIntegrationId": {
      "type": "string"
    },
    "switchboardIntegrationType": {
      "type": "string"
    },
    "switchboardIntegrationWebhook": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "ref",
          "ref": "name"
        },
        "integrationId": {
          "type": "ref",
          "ref": "switchboardIntegrationId"
        },
        "integrationType": {
          "type": "ref",
          "ref": "switchboardIntegrationType"
        }
      }
    },
    "conversationTruncated": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "conversationType"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        },
        "activeSwitchboardIntegration": {
          "type": "ref",
          "ref": "switchboardIntegrationWebhook"
        },
        "pendingSwitchboardIntegration": {
          "type": "ref",
          "ref": "switchboardIntegrationWebhook"
        }
      }
    },
    "description": {
      "type": "string"
    },
    "icon": {
      "type": "string"
    },
    "conversation": {
      "type": "ref",
      "ref": "conversationTruncated"
    },
    "conversationListResponse": {
      "type": "object",
      "properties": {
        "conversations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "conversation"
          }
        },
        "meta": {
          "type": "ref",
          "ref": "meta"
        },
        "links": {
          "type": "ref",
          "ref": "links"
        }
      }
    },
    "participantSubSchema": {
      "type": "object",
      "properties": {
        "userId": {
          "type": "string"
        },
        "subscribeSDKClient": {
          "type": "boolean"
        }
      }
    },
    "conversationCreateBody": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "conversationType"
        },
        "participants": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "participantSubSchema"
          }
        },
        "displayName": {
          "type": "ref",
          "ref": "displayName"
        },
        "description": {
          "type": "ref",
          "ref": "description"
        },
        "iconUrl": {
          "type": "ref",
          "ref": "icon"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      },
      "required": [
        "type"
      ]
    },
    "conversationResponse": {
      "type": "object",
      "properties": {
        "conversation": {
          "type": "ref",
          "ref": "conversation"
        }
      }
    },
    "conversationUpdateBody": {
      "type": "object",
      "properties": {
        "displayName": {
          "type": "ref",
          "ref": "displayName"
        },
        "description": {
          "type": "ref",
          "ref": "description"
        },
        "iconUrl": {
          "type": "ref",
          "ref": "icon"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      }
    },
    "participantJoinBody": {
      "type": "ref",
      "ref": "participantSubSchema"
    },
    "clientType": {
      "type": "string"
    },
    "clientAssociation": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "clientType"
        },
        "clientId": {
          "type": "string"
        }
      }
    },
    "participant": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "userId": {
          "type": "string"
        },
        "unreadCount": {
          "type": "number"
        },
        "clientAssociations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "clientAssociation"
          }
        },
        "userExternalId": {
          "type": "string"
        },
        "lastRead": {
          "type": "string"
        }
      }
    },
    "participantListResponse": {
      "type": "object",
      "properties": {
        "participants": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "participant"
          }
        },
        "meta": {
          "type": "ref",
          "ref": "meta"
        },
        "links": {
          "type": "ref",
          "ref": "links"
        }
      }
    },
    "participantLeaveBody": {
      "type": "object",
      "properties": {
        "userId": {
          "type": "string"
        }
      }
    },
    "author": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "subtypes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "userId": {
          "type": "string"
        },
        "userExternalId": {
          "type": "string"
        },
        "displayName": {
          "type": "string"
        },
        "avatarUrl": {
          "type": "ref",
          "ref": "icon"
        }
      },
      "required": [
        "type"
      ]
    },
    "ticketClosed": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "type"
      ]
    },
    "transferToEmail": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "type"
      ]
    },
    "endedByUser": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "type"
      ]
    },
    "activityMessage": {
      "type": "ref",
      "ref": "ticketClosed"
    },
    "htmlText": {
      "type": "string"
    },
    "markdownText": {
      "type": "string"
    },
    "buy": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "amount": {
          "type": "number"
        },
        "currency": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      },
      "required": [
        "text",
        "type",
        "amount"
      ]
    },
    "extraChannelOptions": {
      "type": "object",
      "properties": {
        "messenger": {
          "type": "object",
          "properties": {
            "messenger_extensions": {
              "type": "boolean"
            },
            "webview_share_button": {
              "type": "string"
            }
          }
        }
      }
    },
    "link": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "default": {
          "type": "boolean"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        },
        "extraChannelOptions": {
          "type": "ref",
          "ref": "extraChannelOptions"
        }
      },
      "required": [
        "text",
        "type",
        "uri"
      ]
    },
    "locationRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      },
      "required": [
        "text",
        "type"
      ]
    },
    "postback": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "payload": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      },
      "required": [
        "text",
        "type",
        "payload"
      ]
    },
    "reply": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "payload": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        },
        "iconUrl": {
          "type": "string"
        }
      },
      "required": [
        "text",
        "type",
        "payload"
      ]
    },
    "webview": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "default": {
          "type": "boolean"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        },
        "extraChannelOptions": {
          "type": "ref",
          "ref": "extraChannelOptions"
        },
        "size": {
          "type": "string"
        },
        "fallback": {
          "type": "string"
        },
        "openOnReceive": {
          "type": "boolean"
        }
      },
      "required": [
        "text",
        "type",
        "uri",
        "fallback"
      ]
    },
    "action": {
      "type": "ref",
      "ref": "buy"
    },
    "textMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "htmlText": {
          "type": "ref",
          "ref": "htmlText"
        },
        "blockChatInput": {
          "type": "boolean"
        },
        "markdownText": {
          "type": "ref",
          "ref": "markdownText"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "action"
          }
        },
        "payload": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "actionSubset": {
      "type": "ref",
      "ref": "buy"
    },
    "item": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "mediaUrl": {
          "type": "string"
        },
        "mediaType": {
          "type": "string"
        },
        "altText": {
          "type": "string"
        },
        "size": {
          "type": "string"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "actionSubset"
          }
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      },
      "required": [
        "title",
        "actions"
      ]
    },
    "carouselMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "blockChatInput": {
          "type": "boolean"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "item"
          }
        },
        "displaySettings": {
          "type": "object",
          "properties": {
            "imageAspectRatio": {
              "type": "string"
            }
          }
        }
      },
      "required": [
        "type",
        "items"
      ]
    },
    "fileMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "mediaUrl": {
          "type": "string"
        },
        "mediaSize": {
          "type": "number"
        },
        "mediaType": {
          "type": "string"
        },
        "altText": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "blockChatInput": {
          "type": "boolean"
        },
        "htmlText": {
          "type": "ref",
          "ref": "htmlText"
        },
        "markdownText": {
          "type": "ref",
          "ref": "markdownText"
        },
        "attachmentId": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "mediaUrl"
      ]
    },
    "field": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "select": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {}
          }
        },
        "format": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "name",
        "label"
      ]
    },
    "formOptions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "label": {
            "type": "string"
          },
          "name": {
            "type": "string"
          }
        }
      }
    },
    "formMessageField": {
      "type": "ref",
      "ref": "field"
    },
    "formMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "submitted": {
          "type": "boolean"
        },
        "blockChatInput": {
          "type": "boolean"
        },
        "fields": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "formMessageField"
          }
        },
        "text": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "fields"
      ]
    },
    "formResponseMessageField": {
      "type": "ref",
      "ref": "field"
    },
    "formResponseMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "fields": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "formResponseMessageField"
          }
        },
        "textFallback": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "fields"
      ]
    },
    "imageMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "mediaUrl": {
          "type": "string"
        },
        "mediaType": {
          "type": "string"
        },
        "mediaSize": {
          "type": "number"
        },
        "altText": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "blockChatInput": {
          "type": "boolean"
        },
        "htmlText": {
          "type": "ref",
          "ref": "htmlText"
        },
        "markdownText": {
          "type": "ref",
          "ref": "markdownText"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "action"
          }
        },
        "attachmentId": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "mediaUrl"
      ]
    },
    "listMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "blockChatInput": {
          "type": "boolean"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "item"
          }
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "actionSubset"
          }
        }
      },
      "required": [
        "type",
        "items"
      ]
    },
    "locationMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "blockChatInput": {
          "type": "boolean"
        },
        "coordinates": {
          "type": "object",
          "properties": {
            "lat": {
              "type": "number"
            },
            "long": {
              "type": "number"
            }
          },
          "required": [
            "lat",
            "long"
          ]
        },
        "location": {
          "type": "object",
          "properties": {
            "address": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        }
      },
      "required": [
        "type",
        "coordinates"
      ]
    },
    "templateMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "blockChatInput": {
          "type": "boolean"
        },
        "template": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "type",
        "template"
      ]
    },
    "content": {
      "type": "ref",
      "ref": "textMessage"
    },
    "client": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "clientType"
        },
        "status": {
          "type": "string"
        },
        "integrationId": {
          "type": "string"
        },
        "externalId": {
          "type": "string"
        },
        "lastSeen": {
          "type": "string"
        },
        "linkedAt": {
          "type": "string"
        },
        "displayName": {
          "type": "string"
        },
        "avatarUrl": {
          "type": "string"
        },
        "info": {
          "type": "object",
          "properties": {}
        },
        "raw": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "device": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "guid": {
          "type": "string"
        },
        "clientId": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "integrationId": {
          "type": "string"
        },
        "lastSeen": {
          "type": "string"
        },
        "pushNotificationToken": {
          "type": "string"
        },
        "info": {
          "type": "object",
          "properties": {}
        },
        "appVersion": {
          "type": "string"
        }
      }
    },
    "source": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "integrationId": {
          "type": "string"
        },
        "originalMessageId": {
          "type": "string"
        },
        "originalMessageTimestamp": {
          "type": "string"
        },
        "client": {
          "type": "ref",
          "ref": "client"
        },
        "device": {
          "type": "ref",
          "ref": "device"
        }
      },
      "required": [
        "type"
      ]
    },
    "message": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "received": {
          "type": "string"
        },
        "author": {
          "type": "ref",
          "ref": "author"
        },
        "activity": {
          "type": "ref",
          "ref": "activityMessage"
        },
        "content": {
          "type": "ref",
          "ref": "content"
        },
        "source": {
          "type": "ref",
          "ref": "source"
        },
        "quotedMessage": {
          "type": "ref",
          "ref": "quotedMessage"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        },
        "deleted": {
          "type": "boolean"
        },
        "references": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "reference"
          }
        }
      }
    },
    "quotedMessageMessage": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "message": {
          "type": "ref",
          "ref": "message"
        }
      },
      "required": [
        "type"
      ]
    },
    "quotedMessageExternalMessageId": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "externalMessageId": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "quotedMessage": {
      "type": "ref",
      "ref": "quotedMessageMessage"
    },
    "reference": {
      "type": "object",
      "properties": {
        "uri": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "uri"
      ]
    },
    "messageListResponse": {
      "type": "object",
      "properties": {
        "messages": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "message"
          }
        },
        "meta": {
          "type": "ref",
          "ref": "meta"
        },
        "links": {
          "type": "ref",
          "ref": "links"
        }
      }
    },
    "destination": {
      "type": "object",
      "properties": {
        "integrationId": {
          "type": "string"
        }
      }
    },
    "appleMessageOverridePayload": {
      "type": "object",
      "properties": {
        "payload": {
          "type": "object",
          "properties": {}
        },
        "withCapabilities": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "messageOverridePayload": {
      "type": "object",
      "properties": {
        "payload": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "messageOverride": {
      "type": "object",
      "properties": {
        "apple": {
          "type": "ref",
          "ref": "appleMessageOverridePayload"
        }
      }
    },
    "messagePost": {
      "type": "object",
      "properties": {
        "author": {
          "type": "ref",
          "ref": "author"
        },
        "content": {
          "type": "ref",
          "ref": "content"
        },
        "destination": {
          "type": "ref",
          "ref": "destination"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        },
        "override": {
          "type": "ref",
          "ref": "messageOverride"
        },
        "schema": {
          "type": "string"
        }
      },
      "required": [
        "author",
        "content"
      ]
    },
    "messagePostResponse": {
      "type": "object",
      "properties": {
        "messages": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "message"
          }
        }
      }
    },
    "activityTypes": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      }
    },
    "activityPost": {
      "type": "object",
      "properties": {
        "author": {
          "type": "ref",
          "ref": "author"
        }
      }
    },
    "passControlBody": {
      "type": "object",
      "properties": {
        "switchboardIntegration": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      },
      "required": [
        "switchboardIntegration"
      ]
    },
    "releaseControlBody": {
      "type": "object",
      "properties": {
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      }
    },
    "offerControlBody": {
      "type": "object",
      "properties": {
        "switchboardIntegration": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      },
      "required": [
        "switchboardIntegration"
      ]
    },
    "acceptControlBody": {
      "type": "object",
      "properties": {
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      }
    },
    "downloadMessageRefBody": {
      "type": "object",
      "properties": {
        "userId": {
          "type": "string"
        },
        "apple": {
          "type": "object",
          "properties": {
            "interactiveDataRef": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string"
                },
                "bid": {
                  "type": "string"
                },
                "key": {
                  "type": "string"
                },
                "signature": {
                  "type": "string"
                },
                "owner": {
                  "type": "string"
                }
              },
              "required": [
                "url",
                "bid",
                "key",
                "signature",
                "owner"
              ]
            }
          },
          "required": [
            "interactiveDataRef"
          ]
        }
      }
    },
    "metaConversionEvent": {
      "type": "object",
      "properties": {
        "payload": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {}
              }
            }
          },
          "required": [
            "data"
          ]
        }
      },
      "required": [
        "payload"
      ]
    },
    "conversionEventsBody": {
      "type": "object",
      "properties": {
        "messenger": {
          "type": "ref",
          "ref": "metaConversionEvent"
        }
      }
    },
    "conversionEvents": {
      "type": "object",
      "properties": {
        "datasetId": {
          "type": "string"
        },
        "eventsReceived": {
          "type": "number"
        }
      }
    },
    "conversionEventsResponse": {
      "type": "object",
      "properties": {
        "conversionEvents": {
          "type": "ref",
          "ref": "conversionEvents"
        }
      }
    },
    "integration": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "status"
        },
        "displayName": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "defaultResponderId": {
      "type": "object",
      "properties": {
        "defaultResponderId": {
          "type": "string"
        }
      }
    },
    "defaultResponder": {
      "type": "object",
      "properties": {
        "defaultResponder": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "integrationId": {
              "type": "string"
            },
            "integrationType": {
              "type": "string"
            },
            "deliverStandbyEvents": {
              "type": "boolean"
            },
            "nextSwitchboardIntegrationId": {
              "type": "string"
            },
            "messageHistoryCount": {
              "type": "number"
            },
            "inherited": {
              "type": "boolean"
            }
          }
        }
      }
    },
    "showAIDisclaimer": {
      "type": "object",
      "properties": {
        "showAIDisclaimer": {
          "type": "boolean"
        }
      }
    },
    "android": {
      "type": "ref",
      "ref": "integration"
    },
    "apple": {
      "type": "ref",
      "ref": "integration"
    },
    "target": {
      "type": "string"
    },
    "triggers": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "includeFullUser": {
      "type": "boolean"
    },
    "includeFullSource": {
      "type": "boolean"
    },
    "webhook": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "version": {
          "type": "string"
        },
        "target": {
          "type": "ref",
          "ref": "target"
        },
        "triggers": {
          "type": "ref",
          "ref": "triggers"
        },
        "secret": {
          "type": "string"
        },
        "includeFullUser": {
          "type": "ref",
          "ref": "includeFullUser"
        },
        "includeFullSource": {
          "type": "ref",
          "ref": "includeFullSource"
        }
      },
      "required": [
        "target",
        "triggers"
      ]
    },
    "custom": {
      "type": "ref",
      "ref": "integration"
    },
    "instagram": {
      "type": "ref",
      "ref": "integration"
    },
    "ios": {
      "type": "ref",
      "ref": "integration"
    },
    "line": {
      "type": "ref",
      "ref": "integration"
    },
    "mailgun": {
      "type": "ref",
      "ref": "integration"
    },
    "messagebird": {
      "type": "ref",
      "ref": "integration"
    },
    "messenger": {
      "type": "ref",
      "ref": "integration"
    },
    "telegram": {
      "type": "ref",
      "ref": "integration"
    },
    "twilio": {
      "type": "ref",
      "ref": "integration"
    },
    "twitter": {
      "type": "ref",
      "ref": "integration"
    },
    "unity": {
      "type": "ref",
      "ref": "integration"
    },
    "viber": {
      "type": "ref",
      "ref": "integration"
    },
    "prechatCapture": {
      "type": "object",
      "properties": {
        "avatarUrl": {
          "type": "string"
        },
        "enabled": {
          "type": "boolean"
        },
        "enableEmailLinking": {
          "type": "boolean"
        },
        "fields": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "field"
          }
        }
      }
    },
    "web": {
      "type": "ref",
      "ref": "integration"
    },
    "whatsapp": {
      "type": "ref",
      "ref": "integration"
    },
    "status": {
      "type": "string"
    },
    "integrationListResponse": {
      "type": "object",
      "properties": {
        "integrations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "integration"
          }
        },
        "meta": {
          "type": "ref",
          "ref": "meta"
        },
        "links": {
          "type": "ref",
          "ref": "links"
        }
      }
    },
    "integrationResponse": {
      "type": "object",
      "properties": {
        "integration": {
          "type": "ref",
          "ref": "integration"
        }
      }
    },
    "integrationUpdateBase": {
      "type": "object",
      "properties": {
        "displayName": {
          "type": "string"
        },
        "defaultResponderId": {
          "type": "string"
        },
        "showAIDisclaimer": {
          "type": "boolean"
        }
      }
    },
    "androidUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "appleUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "customUpdate": {
      "type": "object",
      "properties": {
        "displayName": {
          "type": "string"
        }
      }
    },
    "instagramUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "iosUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "lineUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "mailgunUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "messageBirdUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "messengerUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "telegramUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "twilioUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "twitterUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "unityUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "viberUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "webUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "whatsAppUpdate": {
      "type": "ref",
      "ref": "integrationUpdateBase"
    },
    "integrationUpdate": {
      "type": "ref",
      "ref": "androidUpdate"
    },
    "apiKey": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "displayName": {
          "type": "ref",
          "ref": "displayName"
        },
        "secret": {
          "type": "string"
        }
      }
    },
    "integrationApiKeyResponse": {
      "type": "object",
      "properties": {
        "key": {
          "type": "ref",
          "ref": "apiKey"
        }
      }
    },
    "webhookListResponse": {
      "type": "object",
      "properties": {
        "webhooks": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "webhook"
          }
        }
      }
    },
    "webhookBody": {
      "type": "object",
      "properties": {
        "target": {
          "type": "ref",
          "ref": "target"
        },
        "triggers": {
          "type": "ref",
          "ref": "triggers"
        },
        "includeFullUser": {
          "type": "ref",
          "ref": "includeFullUser"
        },
        "includeFullSource": {
          "type": "ref",
          "ref": "includeFullSource"
        }
      }
    },
    "webhookCreateBody": {
      "type": "ref",
      "ref": "webhookBody"
    },
    "webhookResponse": {
      "type": "object",
      "properties": {
        "webhook": {
          "type": "ref",
          "ref": "webhook"
        }
      }
    },
    "enabled": {
      "type": "boolean"
    },
    "defaultSwitchboardIntegrationId": {
      "type": "string"
    },
    "switchboard": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "enabled": {
          "type": "ref",
          "ref": "enabled"
        },
        "defaultSwitchboardIntegrationId": {
          "type": "ref",
          "ref": "defaultSwitchboardIntegrationId"
        }
      },
      "required": [
        "id",
        "enabled"
      ]
    },
    "switchboardListResponse": {
      "type": "object",
      "properties": {
        "switchboards": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "switchboard"
          }
        }
      }
    },
    "switchboardResponse": {
      "type": "object",
      "properties": {
        "switchboard": {
          "type": "ref",
          "ref": "switchboard"
        }
      }
    },
    "switchboardUpdateBody": {
      "type": "object",
      "properties": {
        "enabled": {
          "type": "ref",
          "ref": "enabled"
        },
        "defaultSwitchboardIntegrationId": {
          "type": "ref",
          "ref": "defaultSwitchboardIntegrationId"
        }
      }
    },
    "deliverStandbyEvents": {
      "type": "boolean"
    },
    "nextSwitchboardIntegrationId": {
      "type": "string"
    },
    "messageHistoryCount": {
      "type": "number"
    },
    "switchboardIntegration": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "ref",
          "ref": "name"
        },
        "integrationId": {
          "type": "ref",
          "ref": "switchboardIntegrationId"
        },
        "integrationType": {
          "type": "ref",
          "ref": "switchboardIntegrationType"
        },
        "deliverStandbyEvents": {
          "type": "ref",
          "ref": "deliverStandbyEvents"
        },
        "nextSwitchboardIntegrationId": {
          "type": "ref",
          "ref": "nextSwitchboardIntegrationId"
        },
        "messageHistoryCount": {
          "type": "ref",
          "ref": "messageHistoryCount"
        }
      },
      "required": [
        "id",
        "name",
        "integrationId",
        "integrationType",
        "deliverStandbyEvents"
      ]
    },
    "switchboardIntegrationListResponse": {
      "type": "object",
      "properties": {
        "switchboardIntegrations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "switchboardIntegration"
          }
        }
      }
    },
    "switchboardIntegrationCreateBody": {
      "type": "object",
      "properties": {
        "name": {
          "type": "ref",
          "ref": "name"
        },
        "integrationId": {
          "type": "ref",
          "ref": "switchboardIntegrationId"
        },
        "integrationType": {
          "type": "ref",
          "ref": "switchboardIntegrationType"
        },
        "deliverStandbyEvents": {
          "type": "ref",
          "ref": "deliverStandbyEvents"
        },
        "nextSwitchboardIntegrationId": {
          "type": "ref",
          "ref": "nextSwitchboardIntegrationId"
        },
        "messageHistoryCount": {
          "type": "ref",
          "ref": "messageHistoryCount"
        }
      },
      "required": [
        "name"
      ]
    },
    "switchboardIntegrationResponse": {
      "type": "object",
      "properties": {
        "switchboardIntegration": {
          "type": "ref",
          "ref": "switchboardIntegration"
        }
      }
    },
    "switchboardIntegrationUpdateBody": {
      "type": "object",
      "properties": {
        "name": {
          "type": "ref",
          "ref": "name"
        },
        "integrationId": {
          "type": "ref",
          "ref": "switchboardIntegrationId"
        },
        "integrationType": {
          "type": "ref",
          "ref": "switchboardIntegrationType"
        },
        "deliverStandbyEvents": {
          "type": "ref",
          "ref": "deliverStandbyEvents"
        },
        "nextSwitchboardIntegrationId": {
          "type": "ref",
          "ref": "nextSwitchboardIntegrationId"
        },
        "messageHistoryCount": {
          "type": "ref",
          "ref": "messageHistoryCount"
        }
      }
    },
    "userTruncated": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "authenticated": {
          "type": "boolean"
        },
        "externalId": {
          "type": "string"
        },
        "zendeskId": {
          "type": "string"
        }
      }
    },
    "signedUpAt": {
      "type": "string"
    },
    "toBeRetained": {
      "type": "boolean"
    },
    "profile": {
      "type": "object",
      "properties": {
        "givenName": {
          "type": "string"
        },
        "surname": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "avatarUrl": {
          "type": "string"
        },
        "locale": {
          "type": "string"
        }
      }
    },
    "identity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "verification": {
          "type": "string"
        }
      }
    },
    "user": {
      "type": "ref",
      "ref": "userTruncated"
    },
    "userListResponse": {
      "type": "object",
      "properties": {
        "users": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "user"
          }
        }
      }
    },
    "userCreateBody": {
      "type": "object",
      "properties": {
        "externalId": {
          "type": "string"
        },
        "signedUpAt": {
          "type": "ref",
          "ref": "signedUpAt"
        },
        "toBeRetained": {
          "type": "ref",
          "ref": "toBeRetained"
        },
        "profile": {
          "type": "ref",
          "ref": "profile"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      },
      "required": [
        "externalId"
      ]
    },
    "userResponse": {
      "type": "object",
      "properties": {
        "user": {
          "type": "ref",
          "ref": "user"
        }
      }
    },
    "userUpdateBody": {
      "type": "object",
      "properties": {
        "signedUpAt": {
          "type": "ref",
          "ref": "signedUpAt"
        },
        "toBeRetained": {
          "type": "ref",
          "ref": "toBeRetained"
        },
        "profile": {
          "type": "ref",
          "ref": "profile"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      }
    },
    "clientListResponse": {
      "type": "object",
      "properties": {
        "clients": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "client"
          }
        },
        "meta": {
          "type": "ref",
          "ref": "meta"
        },
        "links": {
          "type": "ref",
          "ref": "links"
        }
      }
    },
    "matchCriteriaMailgun": {
      "type": "ref",
      "ref": "matchCriteriaBase"
    },
    "matchCriteriaMessagebird": {
      "type": "ref",
      "ref": "matchCriteriaBase"
    },
    "matchCriteriaTwilio": {
      "type": "ref",
      "ref": "matchCriteriaBase"
    },
    "matchCriteriaWhatsapp": {
      "type": "ref",
      "ref": "matchCriteriaBase"
    },
    "matchCriteriaBase": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "integrationId": {
          "type": "string"
        },
        "primary": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "integrationId"
      ]
    },
    "matchCriteria": {
      "type": "ref",
      "ref": "matchCriteriaMailgun"
    },
    "clientCreate": {
      "type": "object",
      "properties": {
        "matchCriteria": {
          "type": "ref",
          "ref": "matchCriteria"
        },
        "confirmation": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string"
            },
            "message": {
              "type": "ref",
              "ref": "messagePost"
            }
          },
          "required": [
            "type"
          ]
        },
        "target": {
          "type": "object",
          "properties": {
            "conversationId": {
              "type": "string"
            }
          },
          "required": [
            "conversationId"
          ]
        }
      },
      "required": [
        "matchCriteria",
        "confirmation",
        "target"
      ]
    },
    "deviceListResponse": {
      "type": "object",
      "properties": {
        "devices": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "device"
          }
        }
      }
    },
    "deviceResponse": {
      "type": "object",
      "properties": {
        "device": {
          "type": "ref",
          "ref": "device"
        }
      }
    },
    "syncUserBody": {
      "type": "object",
      "properties": {
        "survivingZendeskId": {
          "type": "string"
        }
      }
    },
    "appSubSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        }
      }
    },
    "webhookSubSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "version": {
          "type": "string"
        }
      }
    },
    "eventSubSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "createdAt": {
          "type": "string"
        }
      }
    },
    "sourceWebhook": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "integrationId": {
          "type": "string"
        },
        "originalMessageId": {
          "type": "string"
        },
        "originalMessageTimestamp": {
          "type": "string"
        },
        "client": {
          "type": "ref",
          "ref": "client"
        },
        "device": {
          "type": "ref",
          "ref": "device"
        }
      }
    },
    "clientAddEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "clientRemoveEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "clientUpdateEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "campaign": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        }
      }
    },
    "sourceWithCampaignWebhook": {
      "type": "ref",
      "ref": "sourceWebhook"
    },
    "referral": {
      "type": "object",
      "properties": {
        "code": {
          "type": "string"
        },
        "details": {
          "type": "object",
          "properties": {
            "source": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "adId": {
              "type": "string"
            }
          }
        }
      }
    },
    "conversationCreateEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "conversationJoinEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "conversationLeaveEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "conversationRemoveEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "conversationMessageDeliveryPayload": {
      "type": "object",
      "properties": {
        "user": {
          "type": "ref",
          "ref": "user"
        },
        "conversation": {
          "type": "ref",
          "ref": "conversationTruncated"
        },
        "message": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          }
        },
        "destination": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string"
            },
            "integrationId": {
              "type": "string"
            }
          }
        },
        "externalMessages": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              }
            }
          }
        },
        "isFinalEvent": {
          "type": "boolean"
        }
      }
    },
    "conversationMessageDeliveryChannelEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "conversationMessageDeliveryFailureEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "conversationMessageDeliveryUserEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "authorWebhook": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "userId": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "user"
        }
      },
      "required": [
        "type"
      ]
    },
    "messageWebhook": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "received": {
          "type": "string"
        },
        "author": {
          "type": "ref",
          "ref": "authorWebhook"
        },
        "content": {
          "type": "ref",
          "ref": "content"
        },
        "source": {
          "type": "ref",
          "ref": "source"
        },
        "quotedMessage": {
          "type": "ref",
          "ref": "quotedMessage"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "conversationMessageEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "postbackWebhook": {
      "type": "object",
      "properties": {
        "payload": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "metadata"
        }
      }
    },
    "conversationPostbackEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "activity": {
      "type": "ref",
      "ref": "activityTypes"
    },
    "conversationReadEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "conversationReferralEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "conversationTypingEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "switchboardAcceptControl": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "switchboardAcceptControlFailure": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "switchboardOfferControl": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "switchboardOfferControlFailure": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "switchboardPassControl": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "switchboardPassControlFailure": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "switchboardReleaseControl": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "userMergeEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "userUpdateEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    },
    "userRemoveEvent": {
      "type": "ref",
      "ref": "eventSubSchema"
    }
  },
  "entities": {},
  "queries": {
    "ListApps": {
      "name": "List Apps",
      "schema": {
        "type": "ref",
        "ref": "appListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps"
        }
      }
    },
    "GetApp": {
      "name": "Get App",
      "schema": {
        "type": "ref",
        "ref": "appResponseWithSubdomain"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}"
        }
      }
    },
    "ListAppKeys": {
      "name": "List App Keys",
      "schema": {
        "type": "ref",
        "ref": "appKeyListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/keys"
        }
      }
    },
    "GetAppKey": {
      "name": "Get App Key",
      "schema": {
        "type": "ref",
        "ref": "appKeyResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/keys/{keyId}"
        }
      }
    },
    "ListConversations": {
      "name": "List Conversations",
      "schema": {
        "type": "ref",
        "ref": "conversationListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/conversations"
        }
      }
    },
    "GetConversation": {
      "name": "Get Conversation",
      "schema": {
        "type": "ref",
        "ref": "conversationResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/conversations/{conversationId}"
        }
      }
    },
    "ListParticipants": {
      "name": "List Participants",
      "schema": {
        "type": "ref",
        "ref": "participantListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/participants"
        }
      }
    },
    "ListMessages": {
      "name": "List Messages",
      "schema": {
        "type": "ref",
        "ref": "messageListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/messages"
        }
      }
    },
    "ListIntegrations": {
      "name": "List Integrations",
      "schema": {
        "type": "ref",
        "ref": "integrationListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/integrations"
        }
      }
    },
    "GetIntegration": {
      "name": "Get Integration",
      "schema": {
        "type": "ref",
        "ref": "integrationResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/integrations/{integrationId}"
        }
      }
    },
    "ListCustomIntegrationKeys": {
      "name": "List Integration Keys",
      "schema": {
        "type": "object",
        "properties": {
          "keys": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "apiKey"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/integrations/{integrationId}/keys"
        }
      }
    },
    "GetCustomIntegrationKey": {
      "name": "Get Integration Key",
      "schema": {
        "type": "ref",
        "ref": "integrationApiKeyResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/integrations/{integrationId}/keys/{keyId}"
        }
      }
    },
    "ListWebhooks": {
      "name": "List Webhooks",
      "schema": {
        "type": "ref",
        "ref": "webhookListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/integrations/{integrationId}/webhooks"
        }
      }
    },
    "GetWebhook": {
      "name": "Get Webhook",
      "schema": {
        "type": "ref",
        "ref": "webhookResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/integrations/{integrationId}/webhooks/{webhookId}"
        }
      }
    },
    "ListSwitchboards": {
      "name": "List Switchboards",
      "schema": {
        "type": "ref",
        "ref": "switchboardListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/switchboards"
        }
      }
    },
    "ListSwitchboardIntegrations": {
      "name": "List Switchboard Integrations",
      "schema": {
        "type": "ref",
        "ref": "switchboardIntegrationListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/switchboards/{switchboardId}/switchboardIntegrations"
        }
      }
    },
    "ListUsers": {
      "name": "List Users",
      "schema": {
        "type": "ref",
        "ref": "userListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/users"
        }
      }
    },
    "GetUser": {
      "name": "Get User",
      "schema": {
        "type": "ref",
        "ref": "userResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/users/{userIdOrExternalId}"
        }
      }
    },
    "ListClients": {
      "name": "List Clients",
      "schema": {
        "type": "ref",
        "ref": "clientListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/users/{userIdOrExternalId}/clients"
        }
      }
    },
    "ListDevices": {
      "name": "List Devices",
      "schema": {
        "type": "ref",
        "ref": "deviceListResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/users/{userIdOrExternalId}/devices"
        }
      }
    },
    "GetDevice": {
      "name": "Get Device",
      "schema": {
        "type": "ref",
        "ref": "deviceResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{appId}/users/{userIdOrExternalId}/devices/{deviceId}"
        }
      }
    },
    "GetTokenInfo": {
      "name": "Get Token Info",
      "schema": {
        "type": "ref",
        "ref": "appResponseWithSubdomain"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/tokenInfo"
        }
      }
    },
    "Authorize": {
      "name": "Authorize",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/oauth/authorize"
        }
      }
    }
  },
  "actions": {
    "CreateApp": {
      "name": "Create App",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "appCreateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "UpdateApp": {
      "name": "Update App",
      "schema": {
        "type": "ref",
        "ref": "appResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "appUpdateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/apps/{appId}",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteApp": {
      "name": "Delete App",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}"
        }
      }
    },
    "CreateAppKey": {
      "name": "Create App Key",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "displayName": {
                "type": "ref",
                "ref": "displayName"
              }
            },
            "required": [
              "displayName"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/keys",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteAppKey": {
      "name": "Delete App Key",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/keys/{keyId}"
        }
      }
    },
    "UploadAttachment": {
      "name": "Upload Attachment",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/attachments"
        }
      }
    },
    "DeleteAttachment": {
      "name": "Delete Attachment",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "attachmentDeleteBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/attachments/remove",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "CreateConversation": {
      "name": "Create Conversation",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "conversationCreateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "UpdateConversation": {
      "name": "Update Conversation",
      "schema": {
        "type": "ref",
        "ref": "conversationResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "conversationUpdateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/apps/{appId}/conversations/{conversationId}",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteConversation": {
      "name": "Delete Conversation",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/conversations/{conversationId}"
        }
      }
    },
    "JoinConversation": {
      "name": "Join Conversation",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "participantJoinBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/join",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "LeaveConversation": {
      "name": "Leave Conversation",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "participantLeaveBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/leave",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "PostMessage": {
      "name": "Post Message",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "messagePost"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/messages",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteAllMessages": {
      "name": "Delete All Messages",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/messages"
        }
      }
    },
    "DeleteMessage": {
      "name": "Delete Message",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/messages/{messageId}"
        }
      }
    },
    "PostActivity": {
      "name": "Post Activity",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "activityPost"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/activity",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "PassControl": {
      "name": "Pass Control",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "passControlBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/passControl",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ReleaseControl": {
      "name": "Release Control",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "releaseControlBody"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/releaseControl",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "OfferControl": {
      "name": "Offer Control",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "offerControlBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/offerControl",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "AcceptControl": {
      "name": "Accept Control",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "acceptControlBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/acceptControl",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DownloadMessageRef": {
      "name": "Download Message Ref",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "downloadMessageRefBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/download",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "PostConversionEvents": {
      "name": "Post Conversion Events",
      "schema": {
        "type": "ref",
        "ref": "conversionEventsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "conversionEventsBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/conversations/{conversationId}/conversionEvents",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "CreateIntegration": {
      "name": "Create Integration",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "integration"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/integrations",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "UpdateIntegration": {
      "name": "Update Integration",
      "schema": {
        "type": "ref",
        "ref": "integrationResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "integrationUpdate"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/apps/{appId}/integrations/{integrationId}",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteIntegration": {
      "name": "Delete Integration",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/integrations/{integrationId}"
        }
      }
    },
    "CreateCustomIntegrationKey": {
      "name": "Create Integration Key",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "displayName": {
                "type": "string"
              }
            },
            "required": [
              "displayName"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/integrations/{integrationId}/keys",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteCustomIntegrationKey": {
      "name": "Delete Integration Key",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/integrations/{integrationId}/keys/{keyId}"
        }
      }
    },
    "CreateWebhook": {
      "name": "Create Webhook",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "webhookCreateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/integrations/{integrationId}/webhooks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "UpdateWebhook": {
      "name": "Update Webhook",
      "schema": {
        "type": "ref",
        "ref": "webhookResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "webhookBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/apps/{appId}/integrations/{integrationId}/webhooks/{webhookId}",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteWebhook": {
      "name": "Delete Webhook",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/integrations/{integrationId}/webhooks/{webhookId}"
        }
      }
    },
    "CreateSwitchboard": {
      "name": "Create Switchboard",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/switchboards"
        }
      }
    },
    "UpdateSwitchboard": {
      "name": "Update Switchboard",
      "schema": {
        "type": "ref",
        "ref": "switchboardResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "switchboardUpdateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/apps/{appId}/switchboards/{switchboardId}",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteSwitchboard": {
      "name": "Delete Switchboard",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/switchboards/{switchboardId}"
        }
      }
    },
    "CreateSwitchboardIntegration": {
      "name": "Create Switchboard Integration",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "switchboardIntegrationCreateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/switchboards/{switchboardId}/switchboardIntegrations",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "UpdateSwitchboardIntegration": {
      "name": "Update Switchboard Integration",
      "schema": {
        "type": "ref",
        "ref": "switchboardIntegrationResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "switchboardIntegrationUpdateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/apps/{appId}/switchboards/{switchboardId}/switchboardIntegrations/{switchboardIntegrationId}",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteSwitchboardIntegration": {
      "name": "Delete Switchboard Integration",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/switchboards/{switchboardId}/switchboardIntegrations/{switchboardIntegrationId}"
        }
      }
    },
    "CreateUser": {
      "name": "Create User",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "userCreateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/users",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "UpdateUser": {
      "name": "Update User",
      "schema": {
        "type": "ref",
        "ref": "userResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "userUpdateBody"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/apps/{appId}/users/{userIdOrExternalId}",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "DeleteUser": {
      "name": "Delete User",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/users/{userIdOrExternalId}"
        }
      }
    },
    "CreateClient": {
      "name": "Create Client",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "clientCreate"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/users/{userIdOrExternalId}/clients",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "RemoveClient": {
      "name": "Remove Client",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/users/{userIdOrExternalId}/clients/{clientId}"
        }
      }
    },
    "DeleteUserPersonalInformation": {
      "name": "Delete User Personal Information",
      "schema": {
        "type": "ref",
        "ref": "userResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{appId}/users/{userIdOrExternalId}/personalinformation"
        }
      }
    },
    "SyncUser": {
      "name": "Synchronize User",
      "schema": {
        "type": "ref",
        "ref": "userResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "syncUserBody"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{appId}/users/{zendeskId}/sync",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "GetToken": {
      "name": "Get Token",
      "schema": {
        "type": "object",
        "properties": {
          "access_token": {
            "type": "string"
          },
          "token_type": {
            "type": "string"
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "code": {
                "type": "string"
              },
              "grant_type": {
                "type": "string"
              },
              "client_id": {
                "type": "string"
              },
              "client_secret": {
                "type": "string"
              }
            },
            "required": [
              "code",
              "grant_type",
              "client_id",
              "client_secret"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/oauth/token",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "RevokeAccess": {
      "name": "Revoke Access",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/oauth/authorization"
        }
      }
    }
  }
};

export default spec;

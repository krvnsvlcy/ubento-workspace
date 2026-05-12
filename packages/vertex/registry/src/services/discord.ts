import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "discord",
  "type": "http",
  "connection": {
    "provider": "discord",
    "baseUrl": "https://discord.com/api/v10"
  },
  "schemas": {
    "AccountResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "ActionRowComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ButtonComponentForMessageRequest"
          }
        }
      },
      "required": [
        "type",
        "components"
      ]
    },
    "ActionRowComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TextInputComponentForModalRequest"
          }
        }
      },
      "required": [
        "type",
        "components"
      ]
    },
    "ActionRowComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ButtonComponentResponse"
          }
        }
      },
      "required": [
        "type",
        "id",
        "components"
      ]
    },
    "ActionTypes": {
      "type": "object",
      "properties": {}
    },
    "ActivitiesAttachmentResponse": {
      "type": "object",
      "properties": {
        "attachment": {
          "type": "ref",
          "ref": "AttachmentResponse"
        }
      },
      "required": [
        "attachment"
      ]
    },
    "ActivityActionTypes": {
      "type": "object",
      "properties": {}
    },
    "AfkTimeouts": {
      "type": "object",
      "properties": {}
    },
    "AllowedMentionTypes": {
      "type": "object",
      "properties": {}
    },
    "ApplicationCommandAttachmentOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandAttachmentOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandAutocompleteCallbackRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        },
        "data": {
          "type": "ref",
          "ref": "InteractionApplicationCommandAutocompleteCallbackIntegerData"
        }
      },
      "required": [
        "type",
        "data"
      ]
    },
    "ApplicationCommandBooleanOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandBooleanOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandChannelOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "channel_types": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandChannelOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        },
        "channel_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChannelTypes"
          }
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandCreateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "description_localizations": {
          "type": "object"
        },
        "options": {
          "type": "object"
        },
        "default_member_permissions": {
          "type": "object"
        },
        "dm_permission": {
          "type": "object"
        },
        "contexts": {
          "type": "object"
        },
        "integration_types": {
          "type": "object"
        },
        "handler": {
          "type": "object"
        },
        "type": {
          "type": "object"
        }
      },
      "required": [
        "name"
      ]
    },
    "ApplicationCommandHandler": {
      "type": "object"
    },
    "ApplicationCommandIntegerOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "autocomplete": {
          "type": "object"
        },
        "choices": {
          "type": "object"
        },
        "min_value": {
          "type": "object"
        },
        "max_value": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandIntegerOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        },
        "autocomplete": {
          "type": "boolean"
        },
        "choices": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApplicationCommandOptionIntegerChoiceResponse"
          }
        },
        "min_value": {
          "type": "ref",
          "ref": "Int53Type"
        },
        "max_value": {
          "type": "ref",
          "ref": "Int53Type"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandInteractionMetadataResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "InteractionTypes"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "authorizing_integration_owners": {
          "type": "object",
          "properties": {}
        },
        "original_response_message_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "target_user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "target_message_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "type",
        "authorizing_integration_owners"
      ]
    },
    "ApplicationCommandMentionableOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandMentionableOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandNumberOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "autocomplete": {
          "type": "object"
        },
        "choices": {
          "type": "object"
        },
        "min_value": {
          "type": "object"
        },
        "max_value": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandNumberOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        },
        "autocomplete": {
          "type": "boolean"
        },
        "choices": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApplicationCommandOptionNumberChoiceResponse"
          }
        },
        "min_value": {
          "type": "number"
        },
        "max_value": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandOptionIntegerChoice": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "value": {
          "type": "ref",
          "ref": "Int53Type"
        }
      },
      "required": [
        "name",
        "value"
      ]
    },
    "ApplicationCommandOptionIntegerChoiceResponse": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "value": {
          "type": "ref",
          "ref": "Int53Type"
        }
      },
      "required": [
        "name",
        "value"
      ]
    },
    "ApplicationCommandOptionNumberChoice": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "name",
        "value"
      ]
    },
    "ApplicationCommandOptionNumberChoiceResponse": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "name",
        "value"
      ]
    },
    "ApplicationCommandOptionStringChoice": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "value": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "value"
      ]
    },
    "ApplicationCommandOptionStringChoiceResponse": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "value": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "value"
      ]
    },
    "ApplicationCommandOptionType": {
      "type": "object",
      "properties": {}
    },
    "ApplicationCommandPatchRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "description_localizations": {
          "type": "object"
        },
        "options": {
          "type": "object"
        },
        "default_member_permissions": {
          "type": "object"
        },
        "dm_permission": {
          "type": "object"
        },
        "contexts": {
          "type": "object"
        },
        "integration_types": {
          "type": "object"
        },
        "handler": {
          "type": "object"
        }
      }
    },
    "ApplicationCommandPermission": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandPermissionType"
        },
        "permission": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "type",
        "permission"
      ]
    },
    "ApplicationCommandPermissionType": {
      "type": "object",
      "properties": {}
    },
    "ApplicationCommandResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "version": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "default_member_permissions": {
          "type": "object"
        },
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "dm_permission": {
          "type": "boolean"
        },
        "contexts": {
          "type": "object"
        },
        "integration_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApplicationIntegrationType"
          }
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApplicationCommandAttachmentOptionResponse"
          }
        },
        "nsfw": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "application_id",
        "version",
        "default_member_permissions",
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandRoleOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandRoleOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandStringOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "autocomplete": {
          "type": "object"
        },
        "min_length": {
          "type": "object"
        },
        "max_length": {
          "type": "object"
        },
        "choices": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandStringOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        },
        "autocomplete": {
          "type": "boolean"
        },
        "choices": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApplicationCommandOptionStringChoiceResponse"
          }
        },
        "min_length": {
          "type": "number"
        },
        "max_length": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandSubcommandGroupOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "options": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandSubcommandGroupOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApplicationCommandSubcommandOptionResponse"
          }
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandSubcommandOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "options": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandSubcommandOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApplicationCommandAttachmentOptionResponse"
          }
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandType": {
      "type": "object",
      "properties": {}
    },
    "ApplicationCommandUpdateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "description_localizations": {
          "type": "object"
        },
        "options": {
          "type": "object"
        },
        "default_member_permissions": {
          "type": "object"
        },
        "dm_permission": {
          "type": "object"
        },
        "contexts": {
          "type": "object"
        },
        "integration_types": {
          "type": "object"
        },
        "handler": {
          "type": "object"
        },
        "type": {
          "type": "object"
        },
        "id": {
          "type": "object"
        }
      },
      "required": [
        "name"
      ]
    },
    "ApplicationCommandUserOption": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationCommandUserOptionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandOptionType"
        },
        "name": {
          "type": "string"
        },
        "name_localized": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localized": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        },
        "required": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "name",
        "description"
      ]
    },
    "ApplicationEventWebhooksStatus": {
      "type": "object",
      "properties": {}
    },
    "ApplicationExplicitContentFilterTypes": {
      "type": "object",
      "properties": {}
    },
    "ApplicationFormPartial": {
      "type": "object",
      "properties": {
        "description": {
          "type": "object"
        },
        "icon": {
          "type": "object"
        },
        "cover_image": {
          "type": "object"
        },
        "team_id": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        },
        "interactions_endpoint_url": {
          "type": "object"
        },
        "explicit_content_filter": {
          "type": "object"
        },
        "max_participants": {
          "type": "object"
        },
        "type": {
          "type": "object"
        },
        "tags": {
          "type": "object"
        },
        "custom_install_url": {
          "type": "object"
        },
        "install_params": {
          "type": "object"
        },
        "role_connections_verification_url": {
          "type": "object"
        },
        "integration_types_config": {
          "type": "object"
        },
        "event_webhooks_status": {
          "type": "object"
        },
        "event_webhooks_url": {
          "type": "object"
        },
        "event_webhooks_types": {
          "type": "object"
        }
      }
    },
    "ApplicationIdentityProviderAuthType": {
      "type": "object",
      "properties": {}
    },
    "ApplicationIncomingWebhookResponse": {
      "type": "object",
      "properties": {
        "application_id": {
          "type": "object"
        },
        "avatar": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        },
        "guild_id": {
          "type": "object"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "WebhookTypes"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        }
      },
      "required": [
        "application_id",
        "avatar",
        "channel_id",
        "id",
        "name",
        "type"
      ]
    },
    "ApplicationIntegrationType": {
      "type": "object",
      "properties": {}
    },
    "ApplicationIntegrationTypeConfiguration": {
      "type": "object",
      "properties": {
        "oauth2_install_params": {
          "type": "object"
        }
      }
    },
    "ApplicationIntegrationTypeConfigurationResponse": {
      "type": "object",
      "properties": {
        "oauth2_install_params": {
          "type": "ref",
          "ref": "ApplicationOAuth2InstallParamsResponse"
        }
      }
    },
    "ApplicationOAuth2InstallParams": {
      "type": "object",
      "properties": {
        "scopes": {
          "type": "object"
        },
        "permissions": {
          "type": "object"
        }
      }
    },
    "ApplicationOAuth2InstallParamsResponse": {
      "type": "object",
      "properties": {
        "scopes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "OAuth2Scopes"
          }
        },
        "permissions": {
          "type": "string"
        }
      },
      "required": [
        "scopes",
        "permissions"
      ]
    },
    "ApplicationResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "type": {
          "type": "object"
        },
        "cover_image": {
          "type": "string"
        },
        "primary_sku_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "bot": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "slug": {
          "type": "string"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "rpc_origins": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "bot_public": {
          "type": "boolean"
        },
        "bot_require_code_grant": {
          "type": "boolean"
        },
        "terms_of_service_url": {
          "type": "string"
        },
        "privacy_policy_url": {
          "type": "string"
        },
        "custom_install_url": {
          "type": "string"
        },
        "install_params": {
          "type": "ref",
          "ref": "ApplicationOAuth2InstallParamsResponse"
        },
        "integration_types_config": {
          "type": "object",
          "properties": {}
        },
        "verify_key": {
          "type": "string"
        },
        "flags": {
          "type": "number"
        },
        "flags_new": {
          "type": "string"
        },
        "max_participants": {
          "type": "object"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "id",
        "name",
        "icon",
        "description",
        "type",
        "verify_key",
        "flags",
        "flags_new"
      ]
    },
    "ApplicationRoleConnectionsMetadataItemRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MetadataItemTypes"
        },
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "key",
        "name",
        "description"
      ]
    },
    "ApplicationRoleConnectionsMetadataItemResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MetadataItemTypes"
        },
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "name_localizations": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "description_localizations": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "key",
        "name",
        "description"
      ]
    },
    "ApplicationTypes": {
      "type": "object",
      "properties": {}
    },
    "ApplicationUserRoleConnectionResponse": {
      "type": "object",
      "properties": {
        "platform_name": {
          "type": "string"
        },
        "platform_username": {
          "type": "object"
        },
        "metadata": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "AttachmentResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "filename": {
          "type": "string"
        },
        "size": {
          "type": "number"
        },
        "url": {
          "type": "string"
        },
        "proxy_url": {
          "type": "string"
        },
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        },
        "duration_secs": {
          "type": "number"
        },
        "waveform": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "content_type": {
          "type": "string"
        },
        "ephemeral": {
          "type": "boolean"
        },
        "flags": {
          "type": "number"
        },
        "placeholder": {
          "type": "string"
        },
        "placeholder_version": {
          "type": "number"
        },
        "title": {
          "type": "object"
        },
        "application": {
          "type": "ref",
          "ref": "ApplicationResponse"
        },
        "clip_created_at": {
          "type": "string"
        },
        "clip_participants": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        }
      },
      "required": [
        "id",
        "filename",
        "size",
        "url",
        "proxy_url"
      ]
    },
    "AuditLogActionTypes": {
      "type": "object",
      "properties": {}
    },
    "AuditLogEntryResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "action_type": {
          "type": "ref",
          "ref": "AuditLogActionTypes"
        },
        "user_id": {
          "type": "object"
        },
        "target_id": {
          "type": "object"
        },
        "changes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AuditLogObjectChangeResponse"
          }
        },
        "options": {
          "type": "object",
          "properties": {}
        },
        "reason": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "action_type",
        "user_id",
        "target_id"
      ]
    },
    "AuditLogObjectChangeResponse": {
      "type": "object",
      "properties": {
        "key": {
          "type": "object"
        },
        "new_value": {
          "type": "object",
          "properties": {}
        },
        "old_value": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "key"
      ]
    },
    "AuthorType": {
      "type": "object",
      "properties": {}
    },
    "AutomodActionType": {
      "type": "object",
      "properties": {}
    },
    "AutomodEventType": {
      "type": "object",
      "properties": {}
    },
    "AutomodKeywordPresetType": {
      "type": "object",
      "properties": {}
    },
    "AutomodTriggerType": {
      "type": "object",
      "properties": {}
    },
    "AvailableLocalesEnum": {
      "type": "object",
      "properties": {}
    },
    "BanUserFromGuildRequest": {
      "type": "object",
      "properties": {
        "delete_message_seconds": {
          "type": "object"
        },
        "delete_message_days": {
          "type": "object"
        }
      }
    },
    "BaseCreateMessageCreateRequest": {
      "type": "object",
      "properties": {
        "content": {
          "type": "object"
        },
        "embeds": {
          "type": "object"
        },
        "allowed_mentions": {
          "type": "object"
        },
        "sticker_ids": {
          "type": "object"
        },
        "components": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        },
        "attachments": {
          "type": "object"
        },
        "poll": {
          "type": "object"
        },
        "shared_client_theme": {
          "type": "object"
        }
      }
    },
    "BasicApplicationResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "type": {
          "type": "object"
        },
        "cover_image": {
          "type": "string"
        },
        "primary_sku_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "bot": {
          "type": "ref",
          "ref": "UserResponse"
        }
      },
      "required": [
        "id",
        "name",
        "icon",
        "description",
        "type"
      ]
    },
    "BasicGuildMemberResponse": {
      "type": "object",
      "properties": {
        "avatar": {
          "type": "object"
        },
        "avatar_decoration_data": {
          "type": "object"
        },
        "banner": {
          "type": "object"
        },
        "communication_disabled_until": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "joined_at": {
          "type": "string"
        },
        "nick": {
          "type": "object"
        },
        "pending": {
          "type": "boolean"
        },
        "premium_since": {
          "type": "object"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "collectibles": {
          "type": "object"
        }
      },
      "required": [
        "avatar",
        "banner",
        "communication_disabled_until",
        "flags",
        "joined_at",
        "nick",
        "pending",
        "premium_since",
        "roles"
      ]
    },
    "BasicMessageResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageType"
        },
        "content": {
          "type": "string"
        },
        "mentions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        },
        "mention_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "attachments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageAttachmentResponse"
          }
        },
        "embeds": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageEmbedResponse"
          }
        },
        "timestamp": {
          "type": "string"
        },
        "edited_timestamp": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ActionRowComponentResponse"
          }
        },
        "stickers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildStickerResponse"
          }
        },
        "sticker_items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageStickerItemResponse"
          }
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "author": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "pinned": {
          "type": "boolean"
        },
        "mention_everyone": {
          "type": "boolean"
        },
        "tts": {
          "type": "boolean"
        },
        "call": {
          "type": "ref",
          "ref": "MessageCallResponse"
        },
        "activity": {
          "type": "ref",
          "ref": "MessageActivityResponse"
        },
        "application": {
          "type": "ref",
          "ref": "BasicApplicationResponse"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "interaction": {
          "type": "ref",
          "ref": "MessageInteractionResponse"
        },
        "nonce": {
          "type": "number"
        },
        "webhook_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "message_reference": {
          "type": "ref",
          "ref": "MessageReferenceResponse"
        },
        "thread": {
          "type": "ref",
          "ref": "ThreadResponse"
        },
        "mention_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageMentionChannelResponse"
          }
        },
        "role_subscription_data": {
          "type": "ref",
          "ref": "MessageRoleSubscriptionDataResponse"
        },
        "purchase_notification": {
          "type": "ref",
          "ref": "PurchaseNotificationResponse"
        },
        "position": {
          "type": "number"
        },
        "resolved": {
          "type": "ref",
          "ref": "ResolvedObjectsResponse"
        },
        "poll": {
          "type": "ref",
          "ref": "PollResponse"
        },
        "shared_client_theme": {
          "type": "ref",
          "ref": "CustomClientThemeResponse"
        },
        "interaction_metadata": {
          "type": "ref",
          "ref": "ApplicationCommandInteractionMetadataResponse"
        },
        "message_snapshots": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageSnapshotResponse"
          }
        }
      },
      "required": [
        "type",
        "content",
        "mentions",
        "mention_roles",
        "attachments",
        "embeds",
        "timestamp",
        "edited_timestamp",
        "flags",
        "components",
        "id",
        "channel_id",
        "author",
        "pinned",
        "mention_everyone",
        "tts"
      ]
    },
    "BlockMessageAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "AutomodActionType"
        },
        "metadata": {
          "type": "object"
        }
      },
      "required": [
        "type"
      ]
    },
    "BlockMessageActionMetadata": {
      "type": "object",
      "properties": {
        "custom_message": {
          "type": "object"
        }
      }
    },
    "BlockMessageActionMetadataResponse": {
      "type": "object",
      "properties": {
        "custom_message": {
          "type": "string"
        }
      }
    },
    "BlockMessageActionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "AutomodActionType"
        },
        "metadata": {
          "type": "ref",
          "ref": "BlockMessageActionMetadataResponse"
        }
      },
      "required": [
        "type",
        "metadata"
      ]
    },
    "BotAccountPatchRequest": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string"
        },
        "avatar": {
          "type": "object"
        },
        "banner": {
          "type": "object"
        }
      },
      "required": [
        "username"
      ]
    },
    "BotAddGuildMemberRequest": {
      "type": "object",
      "properties": {
        "nick": {
          "type": "object"
        },
        "roles": {
          "type": "object"
        },
        "mute": {
          "type": "object"
        },
        "deaf": {
          "type": "object"
        },
        "access_token": {
          "type": "string"
        },
        "flags": {
          "type": "object"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "BulkBanUsersRequest": {
      "type": "object",
      "properties": {
        "user_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "delete_message_seconds": {
          "type": "object"
        }
      },
      "required": [
        "user_ids"
      ]
    },
    "BulkBanUsersResponse": {
      "type": "object",
      "properties": {
        "banned_users": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "failed_users": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        }
      },
      "required": [
        "banned_users",
        "failed_users"
      ]
    },
    "BulkLobbyMemberRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "metadata": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        },
        "remove_member": {
          "type": "object"
        }
      },
      "required": [
        "id"
      ]
    },
    "ButtonComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "object"
        },
        "style": {
          "type": "ref",
          "ref": "ButtonStyleTypes"
        },
        "label": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "url": {
          "type": "object"
        },
        "sku_id": {
          "type": "object"
        },
        "emoji": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "style"
      ]
    },
    "ButtonComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "custom_id": {
          "type": "string"
        },
        "style": {
          "type": "ref",
          "ref": "ButtonStyleTypes"
        },
        "label": {
          "type": "string"
        },
        "disabled": {
          "type": "boolean"
        },
        "emoji": {
          "type": "ref",
          "ref": "ComponentEmojiResponse"
        },
        "url": {
          "type": "object"
        },
        "sku_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "type",
        "id",
        "style"
      ]
    },
    "ButtonStyleTypes": {
      "type": "object",
      "properties": {}
    },
    "ChannelFollowerResponse": {
      "type": "object",
      "properties": {
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "webhook_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "channel_id",
        "webhook_id"
      ]
    },
    "ChannelFollowerWebhookResponse": {
      "type": "object",
      "properties": {
        "application_id": {
          "type": "object"
        },
        "avatar": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        },
        "guild_id": {
          "type": "object"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "WebhookTypes"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "source_guild": {
          "type": "ref",
          "ref": "WebhookSourceGuildResponse"
        },
        "source_channel": {
          "type": "ref",
          "ref": "WebhookSourceChannelResponse"
        }
      },
      "required": [
        "application_id",
        "avatar",
        "channel_id",
        "id",
        "name",
        "type"
      ]
    },
    "ChannelPermissionOverwriteRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "object"
        },
        "allow": {
          "type": "object"
        },
        "deny": {
          "type": "object"
        }
      },
      "required": [
        "id"
      ]
    },
    "ChannelPermissionOverwriteResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "ChannelPermissionOverwrites"
        },
        "allow": {
          "type": "string"
        },
        "deny": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "type",
        "allow",
        "deny"
      ]
    },
    "ChannelPermissionOverwrites": {
      "type": "object",
      "properties": {}
    },
    "ChannelSelectComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "default_values": {
          "type": "object"
        },
        "channel_types": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "ChannelSelectComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "default_values": {
          "type": "object"
        },
        "channel_types": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "ChannelSelectComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "string"
        },
        "min_values": {
          "type": "number"
        },
        "max_values": {
          "type": "number"
        },
        "disabled": {
          "type": "boolean"
        },
        "channel_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChannelTypes"
          }
        },
        "default_values": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChannelSelectDefaultValueResponse"
          }
        }
      },
      "required": [
        "type",
        "id",
        "custom_id",
        "min_values",
        "max_values"
      ]
    },
    "ChannelSelectDefaultValue": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "SnowflakeSelectDefaultValueTypes"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "type",
        "id"
      ]
    },
    "ChannelSelectDefaultValueResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "SnowflakeSelectDefaultValueTypes"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "type",
        "id"
      ]
    },
    "ChannelTypes": {
      "type": "object",
      "properties": {}
    },
    "CheckboxComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "default": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "CheckboxGroupComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CheckboxGroupOptionForRequest"
          }
        }
      },
      "required": [
        "type",
        "custom_id",
        "options"
      ]
    },
    "CheckboxGroupOptionForRequest": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "default": {
          "type": "object"
        }
      },
      "required": [
        "label",
        "value"
      ]
    },
    "CommandPermissionResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "ApplicationCommandPermissionType"
        },
        "permission": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "type",
        "permission"
      ]
    },
    "CommandPermissionsResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "permissions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CommandPermissionResponse"
          }
        }
      },
      "required": [
        "id",
        "application_id",
        "guild_id",
        "permissions"
      ]
    },
    "ComponentEmojiForRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "object"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "ComponentEmojiResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "animated": {
          "type": "boolean"
        }
      },
      "required": [
        "name"
      ]
    },
    "ConnectedAccountGuildResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "name",
        "icon"
      ]
    },
    "ConnectedAccountIntegrationResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "IntegrationTypes"
        },
        "account": {
          "type": "ref",
          "ref": "AccountResponse"
        },
        "guild": {
          "type": "ref",
          "ref": "ConnectedAccountGuildResponse"
        }
      },
      "required": [
        "id",
        "type",
        "account",
        "guild"
      ]
    },
    "ConnectedAccountProviders": {
      "type": "object",
      "properties": {}
    },
    "ConnectedAccountResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "object"
        },
        "type": {
          "type": "ref",
          "ref": "ConnectedAccountProviders"
        },
        "friend_sync": {
          "type": "boolean"
        },
        "integrations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ConnectedAccountIntegrationResponse"
          }
        },
        "show_activity": {
          "type": "boolean"
        },
        "two_way_link": {
          "type": "boolean"
        },
        "verified": {
          "type": "boolean"
        },
        "visibility": {
          "type": "ref",
          "ref": "ConnectedAccountVisibility"
        },
        "revoked": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "name",
        "type",
        "friend_sync",
        "show_activity",
        "two_way_link",
        "verified",
        "visibility"
      ]
    },
    "ConnectedAccountVisibility": {
      "type": "object",
      "properties": {}
    },
    "ContainerComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "accent_color": {
          "type": "object"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ActionRowComponentForMessageRequest"
          }
        },
        "spoiler": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "components"
      ]
    },
    "ContainerComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "accent_color": {
          "type": "object"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ActionRowComponentResponse"
          }
        },
        "spoiler": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "id",
        "accent_color",
        "components",
        "spoiler"
      ]
    },
    "CreateEntitlementRequestData": {
      "type": "object",
      "properties": {
        "sku_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "owner_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "owner_type": {
          "type": "ref",
          "ref": "EntitlementOwnerTypes"
        }
      },
      "required": [
        "sku_id",
        "owner_id",
        "owner_type"
      ]
    },
    "CreateForumThreadRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "auto_archive_duration": {
          "type": "object"
        },
        "rate_limit_per_user": {
          "type": "object"
        },
        "applied_tags": {
          "type": "object"
        },
        "message": {
          "type": "ref",
          "ref": "BaseCreateMessageCreateRequest"
        }
      },
      "required": [
        "name",
        "message"
      ]
    },
    "CreateGroupDMInviteRequest": {
      "type": "object",
      "properties": {
        "max_age": {
          "type": "object"
        }
      }
    },
    "CreateGuildChannelRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "position": {
          "type": "object"
        },
        "topic": {
          "type": "object"
        },
        "bitrate": {
          "type": "object"
        },
        "user_limit": {
          "type": "object"
        },
        "nsfw": {
          "type": "object"
        },
        "rate_limit_per_user": {
          "type": "object"
        },
        "parent_id": {
          "type": "object"
        },
        "permission_overwrites": {
          "type": "object"
        },
        "rtc_region": {
          "type": "object"
        },
        "video_quality_mode": {
          "type": "object"
        },
        "default_auto_archive_duration": {
          "type": "object"
        },
        "default_reaction_emoji": {
          "type": "object"
        },
        "default_thread_rate_limit_per_user": {
          "type": "object"
        },
        "default_sort_order": {
          "type": "object"
        },
        "default_forum_layout": {
          "type": "object"
        },
        "default_tag_setting": {
          "type": "object"
        },
        "available_tags": {
          "type": "object"
        }
      },
      "required": [
        "name"
      ]
    },
    "CreateGuildInviteRequest": {
      "type": "object",
      "properties": {
        "max_age": {
          "type": "object"
        },
        "temporary": {
          "type": "object"
        },
        "max_uses": {
          "type": "object"
        },
        "unique": {
          "type": "object"
        },
        "target_user_id": {
          "type": "object"
        },
        "target_application_id": {
          "type": "object"
        },
        "target_type": {
          "type": "object"
        }
      }
    },
    "CreateMessageInteractionCallbackRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        },
        "data": {
          "type": "object"
        }
      },
      "required": [
        "type"
      ]
    },
    "CreateMessageInteractionCallbackResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        },
        "message": {
          "type": "ref",
          "ref": "MessageResponse"
        }
      },
      "required": [
        "type",
        "message"
      ]
    },
    "CreateOrUpdateThreadTagRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        },
        "moderated": {
          "type": "object"
        }
      },
      "required": [
        "name"
      ]
    },
    "CreatePrivateChannelRequest": {
      "type": "object",
      "properties": {
        "recipient_id": {
          "type": "object"
        },
        "access_tokens": {
          "type": "object"
        },
        "nicks": {
          "type": "object"
        }
      }
    },
    "CreateRoleRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object"
        },
        "permissions": {
          "type": "object"
        },
        "color": {
          "type": "object"
        },
        "colors": {
          "type": "object"
        },
        "hoist": {
          "type": "object"
        },
        "mentionable": {
          "type": "object"
        },
        "icon": {
          "type": "object"
        },
        "unicode_emoji": {
          "type": "object"
        }
      }
    },
    "CreateTextThreadWithMessageRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "auto_archive_duration": {
          "type": "object"
        },
        "rate_limit_per_user": {
          "type": "object"
        }
      },
      "required": [
        "name"
      ]
    },
    "CreateTextThreadWithoutMessageRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "auto_archive_duration": {
          "type": "object"
        },
        "rate_limit_per_user": {
          "type": "object"
        },
        "type": {
          "type": "object"
        },
        "invitable": {
          "type": "object"
        }
      },
      "required": [
        "name"
      ]
    },
    "CreatedThreadResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "ChannelTypes"
        },
        "last_message_id": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "last_pin_timestamp": {
          "type": "object"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "parent_id": {
          "type": "object"
        },
        "rate_limit_per_user": {
          "type": "number"
        },
        "bitrate": {
          "type": "number"
        },
        "user_limit": {
          "type": "number"
        },
        "rtc_region": {
          "type": "object"
        },
        "video_quality_mode": {
          "type": "ref",
          "ref": "VideoQualityModes"
        },
        "permissions": {
          "type": "string"
        },
        "owner_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "thread_metadata": {
          "type": "ref",
          "ref": "ThreadMetadataResponse"
        },
        "message_count": {
          "type": "number"
        },
        "member_count": {
          "type": "number"
        },
        "total_message_sent": {
          "type": "number"
        },
        "applied_tags": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "member": {
          "type": "ref",
          "ref": "ThreadMemberResponse"
        }
      },
      "required": [
        "id",
        "type",
        "flags",
        "guild_id",
        "name",
        "owner_id",
        "thread_metadata",
        "message_count",
        "member_count",
        "total_message_sent"
      ]
    },
    "CustomClientThemeResponse": {
      "type": "object",
      "properties": {
        "colors": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "gradient_angle": {
          "type": "number"
        },
        "base_mix": {
          "type": "number"
        },
        "base_theme": {
          "type": "ref",
          "ref": "MessageShareCustomUserThemeBaseTheme"
        }
      },
      "required": [
        "colors",
        "gradient_angle",
        "base_mix",
        "base_theme"
      ]
    },
    "CustomClientThemeShareRequest": {
      "type": "object",
      "properties": {
        "colors": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "gradient_angle": {
          "type": "number"
        },
        "base_mix": {
          "type": "number"
        },
        "base_theme": {
          "type": "object"
        }
      },
      "required": [
        "colors",
        "gradient_angle",
        "base_mix"
      ]
    },
    "DefaultKeywordListTriggerMetadata": {
      "type": "object",
      "properties": {
        "allow_list": {
          "type": "object"
        },
        "presets": {
          "type": "object"
        }
      }
    },
    "DefaultKeywordListTriggerMetadataResponse": {
      "type": "object",
      "properties": {
        "allow_list": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "presets": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomodKeywordPresetType"
          }
        }
      },
      "required": [
        "allow_list",
        "presets"
      ]
    },
    "DefaultKeywordListUpsertRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        },
        "exempt_roles": {
          "type": "object"
        },
        "exempt_channels": {
          "type": "object"
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "trigger_metadata": {
          "type": "ref",
          "ref": "DefaultKeywordListTriggerMetadata"
        }
      },
      "required": [
        "name",
        "event_type",
        "trigger_type",
        "trigger_metadata"
      ]
    },
    "DefaultKeywordListUpsertRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        },
        "exempt_roles": {
          "type": "object"
        },
        "exempt_channels": {
          "type": "object"
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "trigger_metadata": {
          "type": "ref",
          "ref": "DefaultKeywordListTriggerMetadata"
        }
      }
    },
    "DefaultKeywordRuleResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "creator_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BlockMessageActionResponse"
          }
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "enabled": {
          "type": "boolean"
        },
        "exempt_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "exempt_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "trigger_metadata": {
          "type": "ref",
          "ref": "DefaultKeywordListTriggerMetadataResponse"
        }
      },
      "required": [
        "id",
        "guild_id",
        "creator_id",
        "name",
        "event_type",
        "actions",
        "trigger_type",
        "enabled",
        "exempt_roles",
        "exempt_channels",
        "trigger_metadata"
      ]
    },
    "DefaultReactionEmojiResponse": {
      "type": "object",
      "properties": {
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        }
      },
      "required": [
        "emoji_id",
        "emoji_name"
      ]
    },
    "DiscordIntegrationResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "IntegrationTypes"
        },
        "name": {
          "type": "object"
        },
        "account": {
          "type": "ref",
          "ref": "AccountResponse"
        },
        "enabled": {
          "type": "boolean"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "application": {
          "type": "ref",
          "ref": "IntegrationApplicationResponse"
        },
        "scopes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "OAuth2Scopes"
          }
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        }
      },
      "required": [
        "type",
        "name",
        "account",
        "enabled",
        "id",
        "application",
        "scopes"
      ]
    },
    "EmbeddedActivityInstance": {
      "type": "object",
      "properties": {
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "instance_id": {
          "type": "string"
        },
        "launch_id": {
          "type": "string"
        },
        "location": {
          "type": "ref",
          "ref": "GuildChannelLocation"
        },
        "users": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        }
      },
      "required": [
        "application_id",
        "instance_id",
        "launch_id",
        "location",
        "users"
      ]
    },
    "EmbeddedActivityLocationKind": {
      "type": "object",
      "properties": {}
    },
    "EmojiResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "require_colons": {
          "type": "boolean"
        },
        "managed": {
          "type": "boolean"
        },
        "animated": {
          "type": "boolean"
        },
        "available": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "name",
        "roles",
        "require_colons",
        "managed",
        "animated",
        "available"
      ]
    },
    "EntitlementOwnerTypes": {
      "type": "object"
    },
    "EntitlementResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "sku_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "user_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "object"
        },
        "deleted": {
          "type": "boolean"
        },
        "starts_at": {
          "type": "object"
        },
        "ends_at": {
          "type": "object"
        },
        "type": {
          "type": "ref",
          "ref": "EntitlementTypes"
        },
        "fulfilled_at": {
          "type": "object"
        },
        "fulfillment_status": {
          "type": "object"
        },
        "consumed": {
          "type": "boolean"
        },
        "gifter_user_id": {
          "type": "object"
        },
        "parent_id": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "sku_id",
        "application_id",
        "user_id",
        "deleted",
        "starts_at",
        "ends_at",
        "type"
      ]
    },
    "EntitlementTenantFulfillmentStatusResponse": {
      "type": "object",
      "properties": {}
    },
    "EntitlementTypes": {
      "type": "object",
      "properties": {}
    },
    "EntityMetadataExternal": {
      "type": "object",
      "properties": {
        "location": {
          "type": "string"
        }
      },
      "required": [
        "location"
      ]
    },
    "EntityMetadataExternalResponse": {
      "type": "object",
      "properties": {
        "location": {
          "type": "string"
        }
      },
      "required": [
        "location"
      ]
    },
    "EntityMetadataStageInstance": {
      "type": "object",
      "properties": {}
    },
    "EntityMetadataStageInstanceResponse": {
      "type": "object",
      "properties": {}
    },
    "EntityMetadataVoice": {
      "type": "object",
      "properties": {}
    },
    "EntityMetadataVoiceResponse": {
      "type": "object",
      "properties": {}
    },
    "ExternalConnectionIntegrationResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "IntegrationTypes"
        },
        "name": {
          "type": "object"
        },
        "account": {
          "type": "ref",
          "ref": "AccountResponse"
        },
        "enabled": {
          "type": "boolean"
        },
        "id": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "revoked": {
          "type": "boolean"
        },
        "expire_behavior": {
          "type": "ref",
          "ref": "IntegrationExpireBehaviorTypes"
        },
        "expire_grace_period": {
          "type": "ref",
          "ref": "IntegrationExpireGracePeriodTypes"
        },
        "subscriber_count": {
          "type": "number"
        },
        "synced_at": {
          "type": "string"
        },
        "role_id": {
          "type": "object"
        },
        "syncing": {
          "type": "boolean"
        },
        "enable_emoticons": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "name",
        "account",
        "enabled",
        "id",
        "user"
      ]
    },
    "ExternalScheduledEventCreateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "entity_type": {
          "type": "ref",
          "ref": "GuildScheduledEventEntityTypes"
        },
        "channel_id": {
          "type": "object"
        },
        "entity_metadata": {
          "type": "ref",
          "ref": "EntityMetadataExternal"
        }
      },
      "required": [
        "name",
        "scheduled_start_time",
        "privacy_level",
        "entity_type",
        "entity_metadata"
      ]
    },
    "ExternalScheduledEventPatchRequestPartial": {
      "type": "object",
      "properties": {
        "status": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "entity_type": {
          "type": "object"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "channel_id": {
          "type": "object"
        },
        "entity_metadata": {
          "type": "ref",
          "ref": "EntityMetadataExternal"
        }
      }
    },
    "ExternalScheduledEventResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        },
        "creator_id": {
          "type": "object"
        },
        "creator": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "status": {
          "type": "ref",
          "ref": "GuildScheduledEventStatuses"
        },
        "entity_type": {
          "type": "ref",
          "ref": "GuildScheduledEventEntityTypes"
        },
        "entity_id": {
          "type": "object"
        },
        "user_count": {
          "type": "number"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "user_rsvp": {
          "type": "object"
        },
        "entity_metadata": {
          "type": "ref",
          "ref": "EntityMetadataExternalResponse"
        }
      },
      "required": [
        "id",
        "guild_id",
        "name",
        "description",
        "channel_id",
        "creator_id",
        "image",
        "scheduled_start_time",
        "scheduled_end_time",
        "status",
        "entity_type",
        "entity_id",
        "privacy_level",
        "entity_metadata"
      ]
    },
    "FileComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "spoiler": {
          "type": "object"
        },
        "file": {
          "type": "ref",
          "ref": "UnfurledMediaRequestWithAttachmentReferenceRequired"
        }
      },
      "required": [
        "type",
        "file"
      ]
    },
    "FileComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "file": {
          "type": "ref",
          "ref": "UnfurledMediaResponse"
        },
        "name": {
          "type": "object"
        },
        "size": {
          "type": "object"
        },
        "spoiler": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "id",
        "file",
        "name",
        "size",
        "spoiler"
      ]
    },
    "FileUploadComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "required": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "FlagToChannelAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "AutomodActionType"
        },
        "metadata": {
          "type": "ref",
          "ref": "FlagToChannelActionMetadata"
        }
      },
      "required": [
        "type",
        "metadata"
      ]
    },
    "FlagToChannelActionMetadata": {
      "type": "object",
      "properties": {
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "channel_id"
      ]
    },
    "FlagToChannelActionMetadataResponse": {
      "type": "object",
      "properties": {
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "channel_id"
      ]
    },
    "FlagToChannelActionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "AutomodActionType"
        },
        "metadata": {
          "type": "ref",
          "ref": "FlagToChannelActionMetadataResponse"
        }
      },
      "required": [
        "type",
        "metadata"
      ]
    },
    "ForumLayout": {
      "type": "object",
      "properties": {}
    },
    "ForumTagResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "moderated": {
          "type": "boolean"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "name",
        "moderated",
        "emoji_id",
        "emoji_name"
      ]
    },
    "FriendInviteResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InviteTypes"
        },
        "code": {
          "type": "string"
        },
        "inviter": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "max_age": {
          "type": "number"
        },
        "created_at": {
          "type": "string"
        },
        "expires_at": {
          "type": "object"
        },
        "friends_count": {
          "type": "number"
        },
        "channel": {
          "type": "object"
        },
        "is_contact": {
          "type": "boolean"
        },
        "uses": {
          "type": "number"
        },
        "max_uses": {
          "type": "number"
        },
        "flags": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "code",
        "expires_at",
        "channel"
      ]
    },
    "GatewayBotResponse": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "session_start_limit": {
          "type": "ref",
          "ref": "GatewayBotSessionStartLimitResponse"
        },
        "shards": {
          "type": "number"
        }
      },
      "required": [
        "url",
        "session_start_limit",
        "shards"
      ]
    },
    "GatewayBotSessionStartLimitResponse": {
      "type": "object",
      "properties": {
        "max_concurrency": {
          "type": "number"
        },
        "remaining": {
          "type": "number"
        },
        "reset_after": {
          "type": "number"
        },
        "total": {
          "type": "number"
        }
      },
      "required": [
        "max_concurrency",
        "remaining",
        "reset_after",
        "total"
      ]
    },
    "GatewayResponse": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        }
      },
      "required": [
        "url"
      ]
    },
    "GithubAuthor": {
      "type": "object",
      "properties": {
        "username": {
          "type": "object"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "GithubCheckApp": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "GithubCheckPullRequest": {
      "type": "object",
      "properties": {
        "number": {
          "type": "number"
        }
      },
      "required": [
        "number"
      ]
    },
    "GithubCheckRun": {
      "type": "object",
      "properties": {
        "conclusion": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "html_url": {
          "type": "string"
        },
        "check_suite": {
          "type": "ref",
          "ref": "GithubCheckSuite"
        },
        "details_url": {
          "type": "object"
        },
        "output": {
          "type": "object"
        },
        "pull_requests": {
          "type": "object"
        }
      },
      "required": [
        "name",
        "html_url",
        "check_suite"
      ]
    },
    "GithubCheckRunOutput": {
      "type": "object",
      "properties": {
        "title": {
          "type": "object"
        },
        "summary": {
          "type": "object"
        }
      }
    },
    "GithubCheckSuite": {
      "type": "object",
      "properties": {
        "conclusion": {
          "type": "object"
        },
        "head_branch": {
          "type": "object"
        },
        "head_sha": {
          "type": "string"
        },
        "pull_requests": {
          "type": "object"
        },
        "app": {
          "type": "ref",
          "ref": "GithubCheckApp"
        }
      },
      "required": [
        "head_sha",
        "app"
      ]
    },
    "GithubComment": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "html_url": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "GithubUser"
        },
        "commit_id": {
          "type": "object"
        },
        "body": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "html_url",
        "user",
        "body"
      ]
    },
    "GithubCommit": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "author": {
          "type": "ref",
          "ref": "GithubAuthor"
        }
      },
      "required": [
        "id",
        "url",
        "message",
        "author"
      ]
    },
    "GithubDiscussion": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "number": {
          "type": "number"
        },
        "html_url": {
          "type": "string"
        },
        "answer_html_url": {
          "type": "object"
        },
        "body": {
          "type": "object"
        },
        "user": {
          "type": "ref",
          "ref": "GithubUser"
        }
      },
      "required": [
        "title",
        "number",
        "html_url",
        "user"
      ]
    },
    "GithubIssue": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "number": {
          "type": "number"
        },
        "html_url": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "GithubUser"
        },
        "title": {
          "type": "string"
        },
        "body": {
          "type": "object"
        },
        "pull_request": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "id",
        "number",
        "html_url",
        "user",
        "title"
      ]
    },
    "GithubRelease": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "tag_name": {
          "type": "string"
        },
        "html_url": {
          "type": "string"
        },
        "author": {
          "type": "ref",
          "ref": "GithubUser"
        }
      },
      "required": [
        "id",
        "tag_name",
        "html_url",
        "author"
      ]
    },
    "GithubRepository": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "html_url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "full_name": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "html_url",
        "name",
        "full_name"
      ]
    },
    "GithubReview": {
      "type": "object",
      "properties": {
        "user": {
          "type": "ref",
          "ref": "GithubUser"
        },
        "body": {
          "type": "object"
        },
        "html_url": {
          "type": "string"
        },
        "state": {
          "type": "string"
        }
      },
      "required": [
        "user",
        "html_url",
        "state"
      ]
    },
    "GithubUser": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "login": {
          "type": "string"
        },
        "html_url": {
          "type": "string"
        },
        "avatar_url": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "login",
        "html_url",
        "avatar_url"
      ]
    },
    "GithubWebhook": {
      "type": "object",
      "properties": {
        "action": {
          "type": "object"
        },
        "ref": {
          "type": "object"
        },
        "ref_type": {
          "type": "object"
        },
        "comment": {
          "type": "object"
        },
        "issue": {
          "type": "object"
        },
        "pull_request": {
          "type": "object"
        },
        "repository": {
          "type": "object"
        },
        "forkee": {
          "type": "object"
        },
        "sender": {
          "type": "ref",
          "ref": "GithubUser"
        },
        "member": {
          "type": "object"
        },
        "release": {
          "type": "object"
        },
        "head_commit": {
          "type": "object"
        },
        "commits": {
          "type": "object"
        },
        "forced": {
          "type": "object"
        },
        "compare": {
          "type": "object"
        },
        "review": {
          "type": "object"
        },
        "check_run": {
          "type": "object"
        },
        "check_suite": {
          "type": "object"
        },
        "discussion": {
          "type": "object"
        },
        "answer": {
          "type": "object"
        }
      },
      "required": [
        "sender"
      ]
    },
    "GroupDMInviteResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InviteTypes"
        },
        "code": {
          "type": "string"
        },
        "inviter": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "max_age": {
          "type": "number"
        },
        "created_at": {
          "type": "string"
        },
        "expires_at": {
          "type": "object"
        },
        "channel": {
          "type": "ref",
          "ref": "InviteChannelResponse"
        },
        "approximate_member_count": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "code",
        "expires_at",
        "channel"
      ]
    },
    "GuildAuditLogResponse": {
      "type": "object",
      "properties": {
        "audit_log_entries": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AuditLogEntryResponse"
          }
        },
        "users": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        },
        "integrations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PartialDiscordIntegrationResponse"
          }
        },
        "webhooks": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApplicationIncomingWebhookResponse"
          }
        },
        "guild_scheduled_events": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ExternalScheduledEventResponse"
          }
        },
        "threads": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ThreadResponse"
          }
        },
        "application_commands": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApplicationCommandResponse"
          }
        },
        "auto_moderation_rules": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DefaultKeywordRuleResponse"
          }
        }
      },
      "required": [
        "audit_log_entries",
        "users",
        "integrations",
        "webhooks",
        "guild_scheduled_events",
        "threads",
        "application_commands",
        "auto_moderation_rules"
      ]
    },
    "GuildBanResponse": {
      "type": "object",
      "properties": {
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "reason": {
          "type": "object"
        }
      },
      "required": [
        "user",
        "reason"
      ]
    },
    "GuildChannelLocation": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "kind": {
          "type": "ref",
          "ref": "EmbeddedActivityLocationKind"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "kind",
        "channel_id",
        "guild_id"
      ]
    },
    "GuildChannelResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "ChannelTypes"
        },
        "last_message_id": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "last_pin_timestamp": {
          "type": "object"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "parent_id": {
          "type": "object"
        },
        "rate_limit_per_user": {
          "type": "number"
        },
        "bitrate": {
          "type": "number"
        },
        "user_limit": {
          "type": "number"
        },
        "rtc_region": {
          "type": "object"
        },
        "video_quality_mode": {
          "type": "ref",
          "ref": "VideoQualityModes"
        },
        "permissions": {
          "type": "string"
        },
        "topic": {
          "type": "object"
        },
        "default_auto_archive_duration": {
          "type": "ref",
          "ref": "ThreadAutoArchiveDuration"
        },
        "default_thread_rate_limit_per_user": {
          "type": "number"
        },
        "position": {
          "type": "number"
        },
        "permission_overwrites": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChannelPermissionOverwriteResponse"
          }
        },
        "nsfw": {
          "type": "boolean"
        },
        "available_tags": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ForumTagResponse"
          }
        },
        "default_reaction_emoji": {
          "type": "object"
        },
        "default_sort_order": {
          "type": "object"
        },
        "default_forum_layout": {
          "type": "ref",
          "ref": "ForumLayout"
        },
        "default_tag_setting": {
          "type": "object"
        },
        "hd_streaming_until": {
          "type": "string"
        },
        "hd_streaming_buyer_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "type",
        "flags",
        "guild_id",
        "name",
        "position"
      ]
    },
    "GuildExplicitContentFilterTypes": {
      "type": "object",
      "properties": {}
    },
    "GuildFeatures": {
      "type": "object",
      "properties": {}
    },
    "GuildHomeSettingsResponse": {
      "type": "object",
      "properties": {
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "enabled": {
          "type": "boolean"
        },
        "welcome_message": {
          "type": "ref",
          "ref": "WelcomeMessageResponse"
        },
        "new_member_actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "NewMemberActionResponse"
          }
        },
        "resource_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ResourceChannelResponse"
          }
        }
      },
      "required": [
        "guild_id",
        "enabled",
        "new_member_actions",
        "resource_channels"
      ]
    },
    "GuildIncidentsDataResponse": {
      "type": "object",
      "properties": {
        "invites_disabled_until": {
          "type": "object"
        },
        "dms_disabled_until": {
          "type": "object"
        }
      },
      "required": [
        "invites_disabled_until",
        "dms_disabled_until"
      ]
    },
    "GuildIncomingWebhookResponse": {
      "type": "object",
      "properties": {
        "application_id": {
          "type": "object"
        },
        "avatar": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        },
        "guild_id": {
          "type": "object"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "WebhookTypes"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "token": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      },
      "required": [
        "application_id",
        "avatar",
        "channel_id",
        "id",
        "name",
        "type"
      ]
    },
    "GuildInviteResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InviteTypes"
        },
        "code": {
          "type": "string"
        },
        "inviter": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "max_age": {
          "type": "number"
        },
        "created_at": {
          "type": "string"
        },
        "expires_at": {
          "type": "object"
        },
        "is_contact": {
          "type": "boolean"
        },
        "flags": {
          "type": "number"
        },
        "guild": {
          "type": "ref",
          "ref": "InviteGuildResponse"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "channel": {
          "type": "ref",
          "ref": "InviteChannelResponse"
        },
        "target_type": {
          "type": "ref",
          "ref": "InviteTargetTypes"
        },
        "target_user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "target_application": {
          "type": "ref",
          "ref": "InviteApplicationResponse"
        },
        "guild_scheduled_event": {
          "type": "ref",
          "ref": "ScheduledEventResponse"
        },
        "uses": {
          "type": "number"
        },
        "max_uses": {
          "type": "number"
        },
        "temporary": {
          "type": "boolean"
        },
        "approximate_member_count": {
          "type": "object"
        },
        "approximate_presence_count": {
          "type": "object"
        },
        "is_nickname_changeable": {
          "type": "boolean"
        },
        "roles": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "code",
        "expires_at",
        "guild",
        "guild_id",
        "channel"
      ]
    },
    "GuildJoinRequestApplicationStatus": {
      "type": "object",
      "properties": {}
    },
    "GuildJoinRequestResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "created_at": {
          "type": "string"
        },
        "reviewed_at": {
          "type": "object"
        },
        "application_status": {
          "type": "object"
        },
        "rejection_reason": {
          "type": "object"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "user_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "user": {
          "type": "object"
        },
        "form_responses": {
          "type": "object"
        },
        "actioned_by_user": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "created_at",
        "reviewed_at",
        "application_status",
        "rejection_reason",
        "guild_id",
        "user_id"
      ]
    },
    "GuildJoinRequestsListResponse": {
      "type": "object",
      "properties": {
        "total": {
          "type": "number"
        },
        "guild_join_requests": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildJoinRequestResponse"
          }
        }
      }
    },
    "GuildMFALevel": {
      "type": "object",
      "properties": {}
    },
    "GuildMemberResponse": {
      "type": "object",
      "properties": {
        "avatar": {
          "type": "object"
        },
        "avatar_decoration_data": {
          "type": "object"
        },
        "banner": {
          "type": "object"
        },
        "communication_disabled_until": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "joined_at": {
          "type": "string"
        },
        "nick": {
          "type": "object"
        },
        "pending": {
          "type": "boolean"
        },
        "premium_since": {
          "type": "object"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "collectibles": {
          "type": "object"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "mute": {
          "type": "boolean"
        },
        "deaf": {
          "type": "boolean"
        }
      },
      "required": [
        "avatar",
        "banner",
        "communication_disabled_until",
        "flags",
        "joined_at",
        "nick",
        "pending",
        "premium_since",
        "roles",
        "user",
        "mute",
        "deaf"
      ]
    },
    "GuildMemberVerificationFormFieldType": {
      "type": "object",
      "properties": {}
    },
    "GuildNSFWContentLevel": {
      "type": "object",
      "properties": {}
    },
    "GuildOnboardingMode": {
      "type": "object",
      "properties": {}
    },
    "GuildOnboardingResponse": {
      "type": "object",
      "properties": {
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "prompts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "OnboardingPromptResponse"
          }
        },
        "default_channel_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "enabled": {
          "type": "boolean"
        },
        "mode": {
          "type": "ref",
          "ref": "GuildOnboardingMode"
        }
      },
      "required": [
        "guild_id",
        "prompts",
        "default_channel_ids",
        "enabled",
        "mode"
      ]
    },
    "GuildPatchRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "region": {
          "type": "object"
        },
        "icon": {
          "type": "object"
        },
        "verification_level": {
          "type": "object"
        },
        "default_message_notifications": {
          "type": "object"
        },
        "explicit_content_filter": {
          "type": "object"
        },
        "preferred_locale": {
          "type": "object"
        },
        "afk_timeout": {
          "type": "object"
        },
        "afk_channel_id": {
          "type": "object"
        },
        "system_channel_id": {
          "type": "object"
        },
        "splash": {
          "type": "object"
        },
        "banner": {
          "type": "object"
        },
        "system_channel_flags": {
          "type": "object"
        },
        "features": {
          "type": "object"
        },
        "discovery_splash": {
          "type": "object"
        },
        "home_header": {
          "type": "object"
        },
        "rules_channel_id": {
          "type": "object"
        },
        "safety_alerts_channel_id": {
          "type": "object"
        },
        "public_updates_channel_id": {
          "type": "object"
        },
        "premium_progress_bar_enabled": {
          "type": "object"
        }
      }
    },
    "GuildPreviewResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "home_header": {
          "type": "object"
        },
        "splash": {
          "type": "object"
        },
        "discovery_splash": {
          "type": "object"
        },
        "features": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildFeatures"
          }
        },
        "approximate_member_count": {
          "type": "number"
        },
        "approximate_presence_count": {
          "type": "number"
        },
        "emojis": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EmojiResponse"
          }
        },
        "stickers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildStickerResponse"
          }
        }
      },
      "required": [
        "id",
        "name",
        "icon",
        "description",
        "home_header",
        "splash",
        "discovery_splash",
        "features",
        "approximate_member_count",
        "approximate_presence_count",
        "emojis",
        "stickers"
      ]
    },
    "GuildProductPurchaseResponse": {
      "type": "object",
      "properties": {
        "listing_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "product_name": {
          "type": "string"
        }
      },
      "required": [
        "listing_id",
        "product_name"
      ]
    },
    "GuildPruneResponse": {
      "type": "object",
      "properties": {
        "pruned": {
          "type": "object"
        }
      },
      "required": [
        "pruned"
      ]
    },
    "GuildResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "home_header": {
          "type": "object"
        },
        "splash": {
          "type": "object"
        },
        "discovery_splash": {
          "type": "object"
        },
        "features": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildFeatures"
          }
        },
        "banner": {
          "type": "object"
        },
        "owner_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "application_id": {
          "type": "object"
        },
        "region": {
          "type": "string"
        },
        "afk_channel_id": {
          "type": "object"
        },
        "afk_timeout": {
          "type": "ref",
          "ref": "AfkTimeouts"
        },
        "system_channel_id": {
          "type": "object"
        },
        "system_channel_flags": {
          "type": "number"
        },
        "widget_enabled": {
          "type": "boolean"
        },
        "widget_channel_id": {
          "type": "object"
        },
        "verification_level": {
          "type": "ref",
          "ref": "VerificationLevels"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildRoleResponse"
          }
        },
        "default_message_notifications": {
          "type": "ref",
          "ref": "UserNotificationSettings"
        },
        "mfa_level": {
          "type": "ref",
          "ref": "GuildMFALevel"
        },
        "explicit_content_filter": {
          "type": "ref",
          "ref": "GuildExplicitContentFilterTypes"
        },
        "max_presences": {
          "type": "object"
        },
        "max_members": {
          "type": "number"
        },
        "max_stage_video_channel_users": {
          "type": "number"
        },
        "max_video_channel_users": {
          "type": "number"
        },
        "vanity_url_code": {
          "type": "object"
        },
        "premium_tier": {
          "type": "ref",
          "ref": "PremiumGuildTiers"
        },
        "premium_subscription_count": {
          "type": "number"
        },
        "preferred_locale": {
          "type": "ref",
          "ref": "AvailableLocalesEnum"
        },
        "rules_channel_id": {
          "type": "object"
        },
        "safety_alerts_channel_id": {
          "type": "object"
        },
        "public_updates_channel_id": {
          "type": "object"
        },
        "premium_progress_bar_enabled": {
          "type": "boolean"
        },
        "premium_progress_bar_enabled_user_updated_at": {
          "type": "object"
        },
        "nsfw": {
          "type": "boolean"
        },
        "nsfw_level": {
          "type": "ref",
          "ref": "GuildNSFWContentLevel"
        },
        "emojis": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EmojiResponse"
          }
        },
        "stickers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildStickerResponse"
          }
        },
        "incidents_data": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "name",
        "icon",
        "description",
        "home_header",
        "splash",
        "discovery_splash",
        "features",
        "banner",
        "owner_id",
        "application_id",
        "region",
        "afk_channel_id",
        "afk_timeout",
        "system_channel_id",
        "system_channel_flags",
        "widget_enabled",
        "widget_channel_id",
        "verification_level",
        "roles",
        "default_message_notifications",
        "mfa_level",
        "explicit_content_filter",
        "max_presences",
        "max_members",
        "max_stage_video_channel_users",
        "max_video_channel_users",
        "vanity_url_code",
        "premium_tier",
        "premium_subscription_count",
        "preferred_locale",
        "rules_channel_id",
        "safety_alerts_channel_id",
        "public_updates_channel_id",
        "premium_progress_bar_enabled",
        "nsfw",
        "nsfw_level",
        "emojis",
        "stickers",
        "incidents_data"
      ]
    },
    "GuildRoleColorsResponse": {
      "type": "object",
      "properties": {
        "primary_color": {
          "type": "number"
        },
        "secondary_color": {
          "type": "object"
        },
        "tertiary_color": {
          "type": "object"
        }
      },
      "required": [
        "primary_color",
        "secondary_color",
        "tertiary_color"
      ]
    },
    "GuildRoleResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "permissions": {
          "type": "string"
        },
        "position": {
          "type": "number"
        },
        "color": {
          "type": "number"
        },
        "colors": {
          "type": "ref",
          "ref": "GuildRoleColorsResponse"
        },
        "hoist": {
          "type": "boolean"
        },
        "managed": {
          "type": "boolean"
        },
        "mentionable": {
          "type": "boolean"
        },
        "icon": {
          "type": "object"
        },
        "unicode_emoji": {
          "type": "object"
        },
        "tags": {
          "type": "ref",
          "ref": "GuildRoleTagsResponse"
        },
        "flags": {
          "type": "number"
        }
      },
      "required": [
        "id",
        "name",
        "description",
        "permissions",
        "position",
        "color",
        "colors",
        "hoist",
        "managed",
        "mentionable",
        "icon",
        "unicode_emoji",
        "flags"
      ]
    },
    "GuildRoleTagsResponse": {
      "type": "object",
      "properties": {
        "premium_subscriber": {
          "type": "object"
        },
        "bot_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "integration_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "subscription_listing_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "available_for_purchase": {
          "type": "object"
        },
        "guild_connections": {
          "type": "object"
        }
      }
    },
    "GuildScheduledEventEntityTypes": {
      "type": "object",
      "properties": {}
    },
    "GuildScheduledEventPrivacyLevels": {
      "type": "object",
      "properties": {}
    },
    "GuildScheduledEventStatuses": {
      "type": "object",
      "properties": {}
    },
    "GuildSearchResponse": {
      "type": "object",
      "properties": {
        "messages": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SearchMessageResponse"
            }
          }
        },
        "doing_deep_historical_index": {
          "type": "boolean"
        },
        "total_results": {
          "type": "number"
        },
        "threads": {
          "type": "object"
        },
        "members": {
          "type": "object"
        },
        "documents_indexed": {
          "type": "object"
        }
      },
      "required": [
        "messages",
        "doing_deep_historical_index",
        "total_results"
      ]
    },
    "GuildStickerResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "tags": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "StickerTypes"
        },
        "format_type": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "available": {
          "type": "boolean"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        }
      },
      "required": [
        "id",
        "name",
        "tags",
        "type",
        "format_type",
        "description",
        "available",
        "guild_id"
      ]
    },
    "GuildSubscriptionIntegrationResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "IntegrationTypes"
        },
        "name": {
          "type": "object"
        },
        "account": {
          "type": "ref",
          "ref": "AccountResponse"
        },
        "enabled": {
          "type": "boolean"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "type",
        "name",
        "account",
        "enabled",
        "id"
      ]
    },
    "GuildTemplateChannelResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "object"
        },
        "type": {
          "type": "ref",
          "ref": "ChannelTypes"
        },
        "name": {
          "type": "object"
        },
        "position": {
          "type": "object"
        },
        "topic": {
          "type": "object"
        },
        "bitrate": {
          "type": "number"
        },
        "user_limit": {
          "type": "number"
        },
        "nsfw": {
          "type": "boolean"
        },
        "rate_limit_per_user": {
          "type": "number"
        },
        "parent_id": {
          "type": "object"
        },
        "default_auto_archive_duration": {
          "type": "object"
        },
        "permission_overwrites": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChannelPermissionOverwriteResponse"
          }
        },
        "available_tags": {
          "type": "object"
        },
        "template": {
          "type": "string"
        },
        "default_reaction_emoji": {
          "type": "object"
        },
        "default_thread_rate_limit_per_user": {
          "type": "object"
        },
        "default_sort_order": {
          "type": "object"
        },
        "default_forum_layout": {
          "type": "object"
        },
        "default_tag_setting": {
          "type": "object"
        },
        "icon_emoji": {
          "type": "object"
        },
        "theme_color": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "type",
        "name",
        "position",
        "topic",
        "bitrate",
        "user_limit",
        "nsfw",
        "rate_limit_per_user",
        "parent_id",
        "default_auto_archive_duration",
        "permission_overwrites",
        "available_tags",
        "template",
        "default_reaction_emoji",
        "default_thread_rate_limit_per_user",
        "default_sort_order",
        "default_forum_layout",
        "default_tag_setting",
        "icon_emoji",
        "theme_color"
      ]
    },
    "GuildTemplateChannelTags": {
      "type": "object",
      "properties": {
        "id": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        },
        "moderated": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "name",
        "emoji_id",
        "emoji_name",
        "moderated"
      ]
    },
    "GuildTemplateResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "usage_count": {
          "type": "number"
        },
        "creator_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "creator": {
          "type": "object"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "source_guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "serialized_source_guild": {
          "type": "ref",
          "ref": "GuildTemplateSnapshotResponse"
        },
        "is_dirty": {
          "type": "object"
        }
      },
      "required": [
        "code",
        "name",
        "description",
        "usage_count",
        "creator_id",
        "creator",
        "created_at",
        "updated_at",
        "source_guild_id",
        "serialized_source_guild",
        "is_dirty"
      ]
    },
    "GuildTemplateRoleColorsResponse": {
      "type": "object",
      "properties": {
        "primary_color": {
          "type": "number"
        },
        "secondary_color": {
          "type": "object"
        },
        "tertiary_color": {
          "type": "object"
        }
      },
      "required": [
        "primary_color",
        "secondary_color",
        "tertiary_color"
      ]
    },
    "GuildTemplateRoleResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "permissions": {
          "type": "string"
        },
        "color": {
          "type": "number"
        },
        "colors": {
          "type": "object"
        },
        "hoist": {
          "type": "boolean"
        },
        "mentionable": {
          "type": "boolean"
        },
        "icon": {
          "type": "object"
        },
        "unicode_emoji": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "name",
        "permissions",
        "color",
        "colors",
        "hoist",
        "mentionable",
        "icon",
        "unicode_emoji"
      ]
    },
    "GuildTemplateSnapshotResponse": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "region": {
          "type": "object"
        },
        "verification_level": {
          "type": "ref",
          "ref": "VerificationLevels"
        },
        "default_message_notifications": {
          "type": "ref",
          "ref": "UserNotificationSettings"
        },
        "explicit_content_filter": {
          "type": "ref",
          "ref": "GuildExplicitContentFilterTypes"
        },
        "preferred_locale": {
          "type": "ref",
          "ref": "AvailableLocalesEnum"
        },
        "afk_channel_id": {
          "type": "object"
        },
        "afk_timeout": {
          "type": "ref",
          "ref": "AfkTimeouts"
        },
        "system_channel_id": {
          "type": "object"
        },
        "system_channel_flags": {
          "type": "number"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildTemplateRoleResponse"
          }
        },
        "channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildTemplateChannelResponse"
          }
        }
      },
      "required": [
        "name",
        "description",
        "region",
        "verification_level",
        "default_message_notifications",
        "explicit_content_filter",
        "preferred_locale",
        "afk_channel_id",
        "afk_timeout",
        "system_channel_id",
        "system_channel_flags",
        "roles",
        "channels"
      ]
    },
    "GuildWelcomeChannel": {
      "type": "object",
      "properties": {
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "description": {
          "type": "string"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        }
      },
      "required": [
        "channel_id",
        "description"
      ]
    },
    "GuildWelcomeScreenChannelResponse": {
      "type": "object",
      "properties": {
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "description": {
          "type": "string"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        }
      },
      "required": [
        "channel_id",
        "description",
        "emoji_id",
        "emoji_name"
      ]
    },
    "GuildWelcomeScreenResponse": {
      "type": "object",
      "properties": {
        "description": {
          "type": "object"
        },
        "welcome_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildWelcomeScreenChannelResponse"
          }
        }
      },
      "required": [
        "description",
        "welcome_channels"
      ]
    },
    "GuildWithCountsResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "home_header": {
          "type": "object"
        },
        "splash": {
          "type": "object"
        },
        "discovery_splash": {
          "type": "object"
        },
        "features": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildFeatures"
          }
        },
        "banner": {
          "type": "object"
        },
        "owner_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "application_id": {
          "type": "object"
        },
        "region": {
          "type": "string"
        },
        "afk_channel_id": {
          "type": "object"
        },
        "afk_timeout": {
          "type": "ref",
          "ref": "AfkTimeouts"
        },
        "system_channel_id": {
          "type": "object"
        },
        "system_channel_flags": {
          "type": "number"
        },
        "widget_enabled": {
          "type": "boolean"
        },
        "widget_channel_id": {
          "type": "object"
        },
        "verification_level": {
          "type": "ref",
          "ref": "VerificationLevels"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildRoleResponse"
          }
        },
        "default_message_notifications": {
          "type": "ref",
          "ref": "UserNotificationSettings"
        },
        "mfa_level": {
          "type": "ref",
          "ref": "GuildMFALevel"
        },
        "explicit_content_filter": {
          "type": "ref",
          "ref": "GuildExplicitContentFilterTypes"
        },
        "max_presences": {
          "type": "object"
        },
        "max_members": {
          "type": "number"
        },
        "max_stage_video_channel_users": {
          "type": "number"
        },
        "max_video_channel_users": {
          "type": "number"
        },
        "vanity_url_code": {
          "type": "object"
        },
        "premium_tier": {
          "type": "ref",
          "ref": "PremiumGuildTiers"
        },
        "premium_subscription_count": {
          "type": "number"
        },
        "preferred_locale": {
          "type": "ref",
          "ref": "AvailableLocalesEnum"
        },
        "rules_channel_id": {
          "type": "object"
        },
        "safety_alerts_channel_id": {
          "type": "object"
        },
        "public_updates_channel_id": {
          "type": "object"
        },
        "premium_progress_bar_enabled": {
          "type": "boolean"
        },
        "premium_progress_bar_enabled_user_updated_at": {
          "type": "object"
        },
        "nsfw": {
          "type": "boolean"
        },
        "nsfw_level": {
          "type": "ref",
          "ref": "GuildNSFWContentLevel"
        },
        "emojis": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EmojiResponse"
          }
        },
        "stickers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildStickerResponse"
          }
        },
        "incidents_data": {
          "type": "object"
        },
        "approximate_member_count": {
          "type": "object"
        },
        "approximate_presence_count": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "name",
        "icon",
        "description",
        "home_header",
        "splash",
        "discovery_splash",
        "features",
        "banner",
        "owner_id",
        "application_id",
        "region",
        "afk_channel_id",
        "afk_timeout",
        "system_channel_id",
        "system_channel_flags",
        "widget_enabled",
        "widget_channel_id",
        "verification_level",
        "roles",
        "default_message_notifications",
        "mfa_level",
        "explicit_content_filter",
        "max_presences",
        "max_members",
        "max_stage_video_channel_users",
        "max_video_channel_users",
        "vanity_url_code",
        "premium_tier",
        "premium_subscription_count",
        "preferred_locale",
        "rules_channel_id",
        "safety_alerts_channel_id",
        "public_updates_channel_id",
        "premium_progress_bar_enabled",
        "nsfw",
        "nsfw_level",
        "emojis",
        "stickers",
        "incidents_data"
      ]
    },
    "HasOption": {
      "type": "object",
      "properties": {}
    },
    "IconEmojiResponse": {
      "type": "object",
      "properties": {}
    },
    "IncomingWebhookInteractionRequest": {
      "type": "object",
      "properties": {
        "content": {
          "type": "object"
        },
        "embeds": {
          "type": "object"
        },
        "allowed_mentions": {
          "type": "object"
        },
        "components": {
          "type": "object"
        },
        "attachments": {
          "type": "object"
        },
        "poll": {
          "type": "object"
        },
        "tts": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        }
      }
    },
    "IncomingWebhookRequestPartial": {
      "type": "object",
      "properties": {
        "content": {
          "type": "object"
        },
        "embeds": {
          "type": "object"
        },
        "allowed_mentions": {
          "type": "object"
        },
        "components": {
          "type": "object"
        },
        "attachments": {
          "type": "object"
        },
        "poll": {
          "type": "object"
        },
        "tts": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        },
        "username": {
          "type": "object"
        },
        "avatar_url": {
          "type": "object"
        },
        "thread_name": {
          "type": "object"
        },
        "applied_tags": {
          "type": "object"
        }
      }
    },
    "IncomingWebhookUpdateForInteractionCallbackRequestPartial": {
      "type": "object",
      "properties": {
        "content": {
          "type": "object"
        },
        "embeds": {
          "type": "object"
        },
        "allowed_mentions": {
          "type": "object"
        },
        "components": {
          "type": "object"
        },
        "attachments": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        }
      }
    },
    "IncomingWebhookUpdateRequestPartial": {
      "type": "object",
      "properties": {
        "content": {
          "type": "object"
        },
        "embeds": {
          "type": "object"
        },
        "allowed_mentions": {
          "type": "object"
        },
        "components": {
          "type": "object"
        },
        "attachments": {
          "type": "object"
        },
        "poll": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        }
      }
    },
    "Int53Type": {
      "type": "number"
    },
    "IntegrationApplicationResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "type": {
          "type": "object"
        },
        "cover_image": {
          "type": "string"
        },
        "primary_sku_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "bot": {
          "type": "ref",
          "ref": "UserResponse"
        }
      },
      "required": [
        "id",
        "name",
        "icon",
        "description",
        "type"
      ]
    },
    "IntegrationExpireBehaviorTypes": {
      "type": "object",
      "properties": {}
    },
    "IntegrationExpireGracePeriodTypes": {
      "type": "object",
      "properties": {}
    },
    "IntegrationTypes": {
      "type": "object",
      "properties": {}
    },
    "InteractionApplicationCommandAutocompleteCallbackIntegerData": {
      "type": "object",
      "properties": {
        "choices": {
          "type": "object"
        }
      }
    },
    "InteractionApplicationCommandAutocompleteCallbackNumberData": {
      "type": "object",
      "properties": {
        "choices": {
          "type": "object"
        }
      }
    },
    "InteractionApplicationCommandAutocompleteCallbackStringData": {
      "type": "object",
      "properties": {
        "choices": {
          "type": "object"
        }
      }
    },
    "InteractionCallbackResponse": {
      "type": "object",
      "properties": {
        "interaction": {
          "type": "ref",
          "ref": "InteractionResponse"
        },
        "resource": {
          "type": "ref",
          "ref": "CreateMessageInteractionCallbackResponse"
        }
      },
      "required": [
        "interaction"
      ]
    },
    "InteractionCallbackTypes": {
      "type": "object",
      "properties": {}
    },
    "InteractionContextType": {
      "type": "object",
      "properties": {}
    },
    "InteractionResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "InteractionTypes"
        },
        "response_message_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "response_message_loading": {
          "type": "boolean"
        },
        "response_message_ephemeral": {
          "type": "boolean"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "type"
      ]
    },
    "InteractionTypes": {
      "type": "object",
      "properties": {}
    },
    "InviteApplicationResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "type": {
          "type": "object"
        },
        "cover_image": {
          "type": "string"
        },
        "primary_sku_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "bot": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "slug": {
          "type": "string"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "rpc_origins": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "bot_public": {
          "type": "boolean"
        },
        "bot_require_code_grant": {
          "type": "boolean"
        },
        "terms_of_service_url": {
          "type": "string"
        },
        "privacy_policy_url": {
          "type": "string"
        },
        "custom_install_url": {
          "type": "string"
        },
        "install_params": {
          "type": "ref",
          "ref": "ApplicationOAuth2InstallParamsResponse"
        },
        "integration_types_config": {
          "type": "object",
          "properties": {}
        },
        "verify_key": {
          "type": "string"
        },
        "flags": {
          "type": "number"
        },
        "flags_new": {
          "type": "string"
        },
        "max_participants": {
          "type": "object"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "id",
        "name",
        "icon",
        "description",
        "type",
        "verify_key",
        "flags",
        "flags_new"
      ]
    },
    "InviteChannelRecipientResponse": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string"
        }
      },
      "required": [
        "username"
      ]
    },
    "InviteChannelResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "ChannelTypes"
        },
        "name": {
          "type": "object"
        },
        "icon": {
          "type": "string"
        },
        "recipients": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "InviteChannelRecipientResponse"
          }
        }
      },
      "required": [
        "id",
        "type",
        "name"
      ]
    },
    "InviteGuildResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "splash": {
          "type": "object"
        },
        "banner": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "icon": {
          "type": "object"
        },
        "features": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildFeatures"
          }
        },
        "verification_level": {
          "type": "object"
        },
        "vanity_url_code": {
          "type": "object"
        },
        "nsfw_level": {
          "type": "object"
        },
        "nsfw": {
          "type": "object"
        },
        "premium_subscription_count": {
          "type": "number"
        }
      },
      "required": [
        "id",
        "name",
        "splash",
        "banner",
        "description",
        "icon",
        "features",
        "verification_level",
        "vanity_url_code",
        "nsfw_level",
        "nsfw",
        "premium_subscription_count"
      ]
    },
    "InviteGuildRoleResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "position": {
          "type": "number"
        },
        "color": {
          "type": "number"
        },
        "colors": {
          "type": "ref",
          "ref": "GuildRoleColorsResponse"
        },
        "icon": {
          "type": "object"
        },
        "unicode_emoji": {
          "type": "object"
        },
        "permissions": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name",
        "position",
        "color",
        "colors",
        "icon",
        "unicode_emoji"
      ]
    },
    "InviteTargetTypes": {
      "type": "object",
      "properties": {}
    },
    "InviteTypes": {
      "type": "object",
      "properties": {}
    },
    "KeywordRuleResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "creator_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BlockMessageActionResponse"
          }
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "enabled": {
          "type": "boolean"
        },
        "exempt_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "exempt_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "trigger_metadata": {
          "type": "ref",
          "ref": "KeywordTriggerMetadataResponse"
        }
      },
      "required": [
        "id",
        "guild_id",
        "creator_id",
        "name",
        "event_type",
        "actions",
        "trigger_type",
        "enabled",
        "exempt_roles",
        "exempt_channels",
        "trigger_metadata"
      ]
    },
    "KeywordTriggerMetadata": {
      "type": "object",
      "properties": {
        "keyword_filter": {
          "type": "object"
        },
        "regex_patterns": {
          "type": "object"
        },
        "allow_list": {
          "type": "object"
        }
      }
    },
    "KeywordTriggerMetadataResponse": {
      "type": "object",
      "properties": {
        "keyword_filter": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "regex_patterns": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "allow_list": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "keyword_filter",
        "regex_patterns",
        "allow_list"
      ]
    },
    "KeywordUpsertRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        },
        "exempt_roles": {
          "type": "object"
        },
        "exempt_channels": {
          "type": "object"
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "trigger_metadata": {
          "type": "object"
        }
      },
      "required": [
        "name",
        "event_type",
        "trigger_type"
      ]
    },
    "KeywordUpsertRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        },
        "exempt_roles": {
          "type": "object"
        },
        "exempt_channels": {
          "type": "object"
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "trigger_metadata": {
          "type": "object"
        }
      }
    },
    "LabelComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "label": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "component": {
          "type": "ref",
          "ref": "ChannelSelectComponentForModalRequest"
        }
      },
      "required": [
        "type",
        "label",
        "component"
      ]
    },
    "LaunchActivityInteractionCallbackRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        }
      },
      "required": [
        "type"
      ]
    },
    "LaunchActivityInteractionCallbackResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        }
      },
      "required": [
        "type"
      ]
    },
    "ListApplicationEmojisResponse": {
      "type": "object",
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EmojiResponse"
          }
        }
      },
      "required": [
        "items"
      ]
    },
    "ListGuildSoundboardSoundsResponse": {
      "type": "object",
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SoundboardSoundResponse"
          }
        }
      },
      "required": [
        "items"
      ]
    },
    "LobbyGuildInviteResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "string"
        }
      },
      "required": [
        "code"
      ]
    },
    "LobbyMemberRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "metadata": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        }
      },
      "required": [
        "id"
      ]
    },
    "LobbyMemberResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "metadata": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        }
      },
      "required": [
        "id",
        "metadata",
        "flags"
      ]
    },
    "LobbyMessageResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "MessageType"
        },
        "content": {
          "type": "string"
        },
        "lobby_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "author": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "metadata": {
          "type": "object",
          "properties": {}
        },
        "moderation_metadata": {
          "type": "object",
          "properties": {}
        },
        "flags": {
          "type": "number"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "type",
        "content",
        "lobby_id",
        "channel_id",
        "author",
        "flags"
      ]
    },
    "LobbyResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "metadata": {
          "type": "object"
        },
        "members": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LobbyMemberResponse"
          }
        },
        "linked_channel": {
          "type": "ref",
          "ref": "GuildChannelResponse"
        },
        "flags": {
          "type": "ref",
          "ref": "UInt32Type"
        },
        "override_event_webhooks_url": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "application_id",
        "metadata",
        "members",
        "flags"
      ]
    },
    "MLSpamRuleResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "creator_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BlockMessageActionResponse"
          }
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "enabled": {
          "type": "boolean"
        },
        "exempt_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "exempt_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "trigger_metadata": {
          "type": "ref",
          "ref": "MLSpamTriggerMetadataResponse"
        }
      },
      "required": [
        "id",
        "guild_id",
        "creator_id",
        "name",
        "event_type",
        "actions",
        "trigger_type",
        "enabled",
        "exempt_roles",
        "exempt_channels",
        "trigger_metadata"
      ]
    },
    "MLSpamTriggerMetadata": {
      "type": "object",
      "properties": {}
    },
    "MLSpamTriggerMetadataResponse": {
      "type": "object",
      "properties": {}
    },
    "MLSpamUpsertRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        },
        "exempt_roles": {
          "type": "object"
        },
        "exempt_channels": {
          "type": "object"
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "trigger_metadata": {
          "type": "object"
        }
      },
      "required": [
        "name",
        "event_type",
        "trigger_type"
      ]
    },
    "MLSpamUpsertRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        },
        "exempt_roles": {
          "type": "object"
        },
        "exempt_channels": {
          "type": "object"
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "trigger_metadata": {
          "type": "object"
        }
      }
    },
    "MediaGalleryComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MediaGalleryItemRequest"
          }
        }
      },
      "required": [
        "type",
        "items"
      ]
    },
    "MediaGalleryComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MediaGalleryItemResponse"
          }
        }
      },
      "required": [
        "type",
        "id",
        "items"
      ]
    },
    "MediaGalleryItemRequest": {
      "type": "object",
      "properties": {
        "description": {
          "type": "object"
        },
        "spoiler": {
          "type": "object"
        },
        "media": {
          "type": "ref",
          "ref": "UnfurledMediaRequest"
        }
      },
      "required": [
        "media"
      ]
    },
    "MediaGalleryItemResponse": {
      "type": "object",
      "properties": {
        "media": {
          "type": "ref",
          "ref": "UnfurledMediaResponse"
        },
        "description": {
          "type": "object"
        },
        "spoiler": {
          "type": "boolean"
        }
      },
      "required": [
        "media",
        "description",
        "spoiler"
      ]
    },
    "MentionSpamRuleResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "creator_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BlockMessageActionResponse"
          }
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "enabled": {
          "type": "boolean"
        },
        "exempt_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "exempt_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "trigger_metadata": {
          "type": "ref",
          "ref": "MentionSpamTriggerMetadataResponse"
        }
      },
      "required": [
        "id",
        "guild_id",
        "creator_id",
        "name",
        "event_type",
        "actions",
        "trigger_type",
        "enabled",
        "exempt_roles",
        "exempt_channels",
        "trigger_metadata"
      ]
    },
    "MentionSpamTriggerMetadata": {
      "type": "object",
      "properties": {
        "mention_total_limit": {
          "type": "object"
        },
        "mention_raid_protection_enabled": {
          "type": "object"
        }
      }
    },
    "MentionSpamTriggerMetadataResponse": {
      "type": "object",
      "properties": {
        "mention_total_limit": {
          "type": "number"
        },
        "mention_raid_protection_enabled": {
          "type": "boolean"
        }
      },
      "required": [
        "mention_total_limit",
        "mention_raid_protection_enabled"
      ]
    },
    "MentionSpamUpsertRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        },
        "exempt_roles": {
          "type": "object"
        },
        "exempt_channels": {
          "type": "object"
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "trigger_metadata": {
          "type": "object"
        }
      },
      "required": [
        "name",
        "event_type",
        "trigger_type"
      ]
    },
    "MentionSpamUpsertRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        },
        "exempt_roles": {
          "type": "object"
        },
        "exempt_channels": {
          "type": "object"
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "trigger_metadata": {
          "type": "object"
        }
      }
    },
    "MentionableSelectComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "default_values": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "MentionableSelectComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "default_values": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "MentionableSelectComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "string"
        },
        "min_values": {
          "type": "number"
        },
        "max_values": {
          "type": "number"
        },
        "disabled": {
          "type": "boolean"
        },
        "default_values": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RoleSelectDefaultValueResponse"
          }
        }
      },
      "required": [
        "type",
        "id",
        "custom_id",
        "min_values",
        "max_values"
      ]
    },
    "MessageActivityResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ActivityActionTypes"
        },
        "party_id": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "MessageAllowedMentionsRequest": {
      "type": "object",
      "properties": {
        "parse": {
          "type": "object"
        },
        "users": {
          "type": "object"
        },
        "roles": {
          "type": "object"
        },
        "replied_user": {
          "type": "object"
        }
      }
    },
    "MessageAttachmentRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "filename": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "duration_secs": {
          "type": "object"
        },
        "waveform": {
          "type": "object"
        },
        "title": {
          "type": "object"
        },
        "is_remix": {
          "type": "object"
        }
      },
      "required": [
        "id"
      ]
    },
    "MessageAttachmentResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "filename": {
          "type": "string"
        },
        "size": {
          "type": "number"
        },
        "url": {
          "type": "string"
        },
        "proxy_url": {
          "type": "string"
        },
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        },
        "duration_secs": {
          "type": "number"
        },
        "waveform": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "content_type": {
          "type": "string"
        },
        "ephemeral": {
          "type": "boolean"
        },
        "flags": {
          "type": "number"
        },
        "placeholder": {
          "type": "string"
        },
        "placeholder_version": {
          "type": "number"
        },
        "title": {
          "type": "object"
        },
        "application": {
          "type": "ref",
          "ref": "ApplicationResponse"
        },
        "clip_created_at": {
          "type": "string"
        },
        "clip_participants": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        }
      },
      "required": [
        "id",
        "filename",
        "size",
        "url",
        "proxy_url"
      ]
    },
    "MessageCallResponse": {
      "type": "object",
      "properties": {
        "ended_timestamp": {
          "type": "object"
        },
        "participants": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        }
      },
      "required": [
        "participants"
      ]
    },
    "MessageComponentInteractionMetadataResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "InteractionTypes"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "authorizing_integration_owners": {
          "type": "object",
          "properties": {}
        },
        "original_response_message_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "interacted_message_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "type",
        "authorizing_integration_owners",
        "interacted_message_id"
      ]
    },
    "MessageComponentSeparatorSpacingSize": {
      "type": "object",
      "properties": {}
    },
    "MessageComponentTypes": {
      "type": "object",
      "properties": {}
    },
    "MessageCreateRequest": {
      "type": "object",
      "properties": {
        "content": {
          "type": "object"
        },
        "embeds": {
          "type": "object"
        },
        "allowed_mentions": {
          "type": "object"
        },
        "sticker_ids": {
          "type": "object"
        },
        "components": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        },
        "attachments": {
          "type": "object"
        },
        "poll": {
          "type": "object"
        },
        "shared_client_theme": {
          "type": "object"
        },
        "message_reference": {
          "type": "object"
        },
        "nonce": {
          "type": "number"
        },
        "enforce_nonce": {
          "type": "object"
        },
        "tts": {
          "type": "object"
        }
      }
    },
    "MessageEditRequestPartial": {
      "type": "object",
      "properties": {
        "content": {
          "type": "object"
        },
        "embeds": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        },
        "allowed_mentions": {
          "type": "object"
        },
        "sticker_ids": {
          "type": "object"
        },
        "components": {
          "type": "object"
        },
        "attachments": {
          "type": "object"
        }
      }
    },
    "MessageEmbedAuthorResponse": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "icon_url": {
          "type": "string"
        },
        "proxy_icon_url": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "MessageEmbedFieldResponse": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "inline": {
          "type": "boolean"
        }
      },
      "required": [
        "name",
        "value",
        "inline"
      ]
    },
    "MessageEmbedFooterResponse": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string"
        },
        "icon_url": {
          "type": "string"
        },
        "proxy_icon_url": {
          "type": "string"
        }
      },
      "required": [
        "text"
      ]
    },
    "MessageEmbedImageResponse": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "proxy_url": {
          "type": "string"
        },
        "width": {
          "type": "ref",
          "ref": "UInt32Type"
        },
        "height": {
          "type": "ref",
          "ref": "UInt32Type"
        },
        "content_type": {
          "type": "string"
        },
        "placeholder": {
          "type": "string"
        },
        "placeholder_version": {
          "type": "ref",
          "ref": "UInt32Type"
        },
        "description": {
          "type": "string"
        },
        "flags": {
          "type": "ref",
          "ref": "UInt32Type"
        }
      }
    },
    "MessageEmbedProviderResponse": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "MessageEmbedResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "color": {
          "type": "number"
        },
        "timestamp": {
          "type": "string"
        },
        "fields": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageEmbedFieldResponse"
          }
        },
        "author": {
          "type": "ref",
          "ref": "MessageEmbedAuthorResponse"
        },
        "provider": {
          "type": "ref",
          "ref": "MessageEmbedProviderResponse"
        },
        "image": {
          "type": "ref",
          "ref": "MessageEmbedImageResponse"
        },
        "thumbnail": {
          "type": "ref",
          "ref": "MessageEmbedImageResponse"
        },
        "video": {
          "type": "ref",
          "ref": "MessageEmbedVideoResponse"
        },
        "footer": {
          "type": "ref",
          "ref": "MessageEmbedFooterResponse"
        },
        "flags": {
          "type": "object"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ContainerComponentResponse"
          }
        }
      },
      "required": [
        "type"
      ]
    },
    "MessageEmbedVideoResponse": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "proxy_url": {
          "type": "string"
        },
        "width": {
          "type": "ref",
          "ref": "UInt32Type"
        },
        "height": {
          "type": "ref",
          "ref": "UInt32Type"
        },
        "content_type": {
          "type": "string"
        },
        "placeholder": {
          "type": "string"
        },
        "placeholder_version": {
          "type": "ref",
          "ref": "UInt32Type"
        },
        "description": {
          "type": "string"
        },
        "flags": {
          "type": "ref",
          "ref": "UInt32Type"
        }
      }
    },
    "MessageInteractionResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "InteractionTypes"
        },
        "name": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "name_localized": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "type",
        "name"
      ]
    },
    "MessageMentionChannelResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "ChannelTypes"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "name",
        "type",
        "guild_id"
      ]
    },
    "MessageReactionCountDetailsResponse": {
      "type": "object",
      "properties": {
        "burst": {
          "type": "number"
        },
        "normal": {
          "type": "number"
        }
      },
      "required": [
        "burst",
        "normal"
      ]
    },
    "MessageReactionEmojiResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "object"
        },
        "name": {
          "type": "object"
        },
        "animated": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "MessageReactionResponse": {
      "type": "object",
      "properties": {
        "emoji": {
          "type": "ref",
          "ref": "MessageReactionEmojiResponse"
        },
        "count": {
          "type": "number"
        },
        "count_details": {
          "type": "ref",
          "ref": "MessageReactionCountDetailsResponse"
        },
        "burst_colors": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "me_burst": {
          "type": "boolean"
        },
        "me": {
          "type": "boolean"
        }
      },
      "required": [
        "emoji",
        "count",
        "count_details",
        "burst_colors",
        "me_burst",
        "me"
      ]
    },
    "MessageReferenceRequest": {
      "type": "object",
      "properties": {
        "guild_id": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        },
        "message_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "fail_if_not_exists": {
          "type": "object"
        },
        "type": {
          "type": "object"
        }
      },
      "required": [
        "message_id"
      ]
    },
    "MessageReferenceResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageReferenceType"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "message_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "type",
        "channel_id"
      ]
    },
    "MessageReferenceType": {
      "type": "object",
      "properties": {}
    },
    "MessageResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageType"
        },
        "content": {
          "type": "string"
        },
        "mentions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        },
        "mention_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "attachments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageAttachmentResponse"
          }
        },
        "embeds": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageEmbedResponse"
          }
        },
        "timestamp": {
          "type": "string"
        },
        "edited_timestamp": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ActionRowComponentResponse"
          }
        },
        "stickers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildStickerResponse"
          }
        },
        "sticker_items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageStickerItemResponse"
          }
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "author": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "pinned": {
          "type": "boolean"
        },
        "mention_everyone": {
          "type": "boolean"
        },
        "tts": {
          "type": "boolean"
        },
        "call": {
          "type": "ref",
          "ref": "MessageCallResponse"
        },
        "activity": {
          "type": "ref",
          "ref": "MessageActivityResponse"
        },
        "application": {
          "type": "ref",
          "ref": "BasicApplicationResponse"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "interaction": {
          "type": "ref",
          "ref": "MessageInteractionResponse"
        },
        "nonce": {
          "type": "number"
        },
        "webhook_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "message_reference": {
          "type": "ref",
          "ref": "MessageReferenceResponse"
        },
        "thread": {
          "type": "ref",
          "ref": "ThreadResponse"
        },
        "mention_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageMentionChannelResponse"
          }
        },
        "role_subscription_data": {
          "type": "ref",
          "ref": "MessageRoleSubscriptionDataResponse"
        },
        "purchase_notification": {
          "type": "ref",
          "ref": "PurchaseNotificationResponse"
        },
        "position": {
          "type": "number"
        },
        "resolved": {
          "type": "ref",
          "ref": "ResolvedObjectsResponse"
        },
        "poll": {
          "type": "ref",
          "ref": "PollResponse"
        },
        "shared_client_theme": {
          "type": "ref",
          "ref": "CustomClientThemeResponse"
        },
        "interaction_metadata": {
          "type": "ref",
          "ref": "ApplicationCommandInteractionMetadataResponse"
        },
        "message_snapshots": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageSnapshotResponse"
          }
        },
        "reactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageReactionResponse"
          }
        },
        "referenced_message": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "content",
        "mentions",
        "mention_roles",
        "attachments",
        "embeds",
        "timestamp",
        "edited_timestamp",
        "flags",
        "components",
        "id",
        "channel_id",
        "author",
        "pinned",
        "mention_everyone",
        "tts"
      ]
    },
    "MessageRoleSubscriptionDataResponse": {
      "type": "object",
      "properties": {
        "role_subscription_listing_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "tier_name": {
          "type": "string"
        },
        "total_months_subscribed": {
          "type": "number"
        },
        "is_renewal": {
          "type": "boolean"
        }
      },
      "required": [
        "role_subscription_listing_id",
        "tier_name",
        "total_months_subscribed",
        "is_renewal"
      ]
    },
    "MessageShareCustomUserThemeBaseTheme": {
      "type": "object",
      "properties": {}
    },
    "MessageSnapshotResponse": {
      "type": "object",
      "properties": {
        "message": {
          "type": "ref",
          "ref": "MinimalContentMessageResponse"
        }
      },
      "required": [
        "message"
      ]
    },
    "MessageStickerItemResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "format_type": {
          "type": "ref",
          "ref": "StickerFormatTypes"
        }
      },
      "required": [
        "id",
        "name",
        "format_type"
      ]
    },
    "MessageType": {
      "type": "object",
      "properties": {}
    },
    "MetadataItemTypes": {
      "type": "object",
      "properties": {}
    },
    "MinimalContentMessageResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageType"
        },
        "content": {
          "type": "string"
        },
        "mentions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        },
        "mention_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "attachments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageAttachmentResponse"
          }
        },
        "embeds": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageEmbedResponse"
          }
        },
        "timestamp": {
          "type": "string"
        },
        "edited_timestamp": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ActionRowComponentResponse"
          }
        },
        "stickers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildStickerResponse"
          }
        },
        "sticker_items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageStickerItemResponse"
          }
        }
      },
      "required": [
        "type",
        "content",
        "mentions",
        "mention_roles",
        "attachments",
        "embeds",
        "timestamp",
        "edited_timestamp",
        "flags",
        "components"
      ]
    },
    "ModalInteractionCallbackRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        },
        "data": {
          "type": "ref",
          "ref": "ModalInteractionCallbackRequestData"
        }
      },
      "required": [
        "type",
        "data"
      ]
    },
    "ModalInteractionCallbackRequestData": {
      "type": "object",
      "properties": {
        "custom_id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ActionRowComponentForModalRequest"
          }
        }
      },
      "required": [
        "custom_id",
        "title",
        "components"
      ]
    },
    "ModalSubmitInteractionMetadataResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "InteractionTypes"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "authorizing_integration_owners": {
          "type": "object",
          "properties": {}
        },
        "original_response_message_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "triggering_interaction_metadata": {
          "type": "ref",
          "ref": "ApplicationCommandInteractionMetadataResponse"
        }
      },
      "required": [
        "id",
        "type",
        "authorizing_integration_owners",
        "triggering_interaction_metadata"
      ]
    },
    "MultipleChoiceFormFieldResponse": {
      "type": "object",
      "properties": {
        "field_type": {
          "type": "ref",
          "ref": "GuildMemberVerificationFormFieldType"
        },
        "label": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "required": {
          "type": "boolean"
        },
        "choices": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "response": {
          "type": "number"
        }
      },
      "required": [
        "field_type",
        "choices"
      ]
    },
    "MyGuildResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        },
        "banner": {
          "type": "object"
        },
        "owner": {
          "type": "boolean"
        },
        "permissions": {
          "type": "string"
        },
        "features": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildFeatures"
          }
        },
        "approximate_member_count": {
          "type": "object"
        },
        "approximate_presence_count": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "name",
        "icon",
        "banner",
        "owner",
        "permissions",
        "features"
      ]
    },
    "NameplatePalette": {
      "type": "object"
    },
    "NewMemberActionResponse": {
      "type": "object",
      "properties": {
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "action_type": {
          "type": "ref",
          "ref": "NewMemberActionType"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "emoji": {
          "type": "ref",
          "ref": "SettingsEmojiResponse"
        },
        "icon": {
          "type": "string"
        }
      },
      "required": [
        "channel_id",
        "action_type",
        "title",
        "description"
      ]
    },
    "NewMemberActionType": {
      "type": "object",
      "properties": {}
    },
    "OAuth2GetAuthorizationResponse": {
      "type": "object",
      "properties": {
        "application": {
          "type": "ref",
          "ref": "ApplicationResponse"
        },
        "expires": {
          "type": "string"
        },
        "scopes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "OAuth2Scopes"
          }
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        }
      },
      "required": [
        "application",
        "expires",
        "scopes"
      ]
    },
    "OAuth2GetKeys": {
      "type": "object",
      "properties": {
        "keys": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "OAuth2Key"
          }
        }
      },
      "required": [
        "keys"
      ]
    },
    "OAuth2GetOpenIDConnectUserInfoResponse": {
      "type": "object",
      "properties": {
        "sub": {
          "type": "string"
        },
        "email": {
          "type": "object"
        },
        "email_verified": {
          "type": "boolean"
        },
        "preferred_username": {
          "type": "string"
        },
        "nickname": {
          "type": "object"
        },
        "picture": {
          "type": "string"
        },
        "locale": {
          "type": "string"
        }
      },
      "required": [
        "sub"
      ]
    },
    "OAuth2Key": {
      "type": "object",
      "properties": {
        "kty": {
          "type": "string"
        },
        "use": {
          "type": "string"
        },
        "kid": {
          "type": "string"
        },
        "n": {
          "type": "string"
        },
        "e": {
          "type": "string"
        },
        "alg": {
          "type": "string"
        }
      },
      "required": [
        "kty",
        "use",
        "kid",
        "n",
        "e",
        "alg"
      ]
    },
    "OAuth2Scopes": {
      "type": "object",
      "properties": {}
    },
    "OnboardingPromptOptionRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "object"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        },
        "emoji_animated": {
          "type": "object"
        },
        "role_ids": {
          "type": "object"
        },
        "channel_ids": {
          "type": "object"
        }
      },
      "required": [
        "title"
      ]
    },
    "OnboardingPromptOptionResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "emoji": {
          "type": "ref",
          "ref": "SettingsEmojiResponse"
        },
        "role_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "channel_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        }
      },
      "required": [
        "id",
        "title",
        "description",
        "emoji",
        "role_ids",
        "channel_ids"
      ]
    },
    "OnboardingPromptResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "title": {
          "type": "string"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "OnboardingPromptOptionResponse"
          }
        },
        "single_select": {
          "type": "boolean"
        },
        "required": {
          "type": "boolean"
        },
        "in_onboarding": {
          "type": "boolean"
        },
        "type": {
          "type": "ref",
          "ref": "OnboardingPromptType"
        }
      },
      "required": [
        "id",
        "title",
        "options",
        "single_select",
        "required",
        "in_onboarding",
        "type"
      ]
    },
    "OnboardingPromptType": {
      "type": "object",
      "properties": {}
    },
    "ParagraphFormFieldResponse": {
      "type": "object",
      "properties": {
        "field_type": {
          "type": "ref",
          "ref": "GuildMemberVerificationFormFieldType"
        },
        "label": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "required": {
          "type": "boolean"
        },
        "placeholder": {
          "type": "string"
        },
        "response": {
          "type": "string"
        }
      },
      "required": [
        "field_type"
      ]
    },
    "PartialDiscordIntegrationResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "IntegrationTypes"
        },
        "name": {
          "type": "object"
        },
        "account": {
          "type": "ref",
          "ref": "AccountResponse"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "type",
        "name",
        "account",
        "application_id"
      ]
    },
    "PartialExternalConnectionIntegrationResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "IntegrationTypes"
        },
        "name": {
          "type": "object"
        },
        "account": {
          "type": "ref",
          "ref": "AccountResponse"
        }
      },
      "required": [
        "id",
        "type",
        "name",
        "account"
      ]
    },
    "PartialGuildSubscriptionIntegrationResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "IntegrationTypes"
        },
        "name": {
          "type": "object"
        },
        "account": {
          "type": "ref",
          "ref": "AccountResponse"
        }
      },
      "required": [
        "id",
        "type",
        "name",
        "account"
      ]
    },
    "PinnedMessageResponse": {
      "type": "object",
      "properties": {
        "pinned_at": {
          "type": "string"
        },
        "message": {
          "type": "ref",
          "ref": "MessageResponse"
        }
      },
      "required": [
        "pinned_at",
        "message"
      ]
    },
    "PinnedMessagesResponse": {
      "type": "object",
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PinnedMessageResponse"
          }
        },
        "has_more": {
          "type": "boolean"
        }
      },
      "required": [
        "items",
        "has_more"
      ]
    },
    "PollAnswerCreateRequest": {
      "type": "object",
      "properties": {
        "poll_media": {
          "type": "ref",
          "ref": "PollMediaCreateRequest"
        }
      },
      "required": [
        "poll_media"
      ]
    },
    "PollAnswerDetailsResponse": {
      "type": "object",
      "properties": {
        "users": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        }
      },
      "required": [
        "users"
      ]
    },
    "PollAnswerResponse": {
      "type": "object",
      "properties": {
        "answer_id": {
          "type": "number"
        },
        "poll_media": {
          "type": "ref",
          "ref": "PollMediaResponse"
        }
      },
      "required": [
        "answer_id",
        "poll_media"
      ]
    },
    "PollCreateRequest": {
      "type": "object",
      "properties": {
        "question": {
          "type": "ref",
          "ref": "PollMedia"
        },
        "answers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PollAnswerCreateRequest"
          }
        },
        "allow_multiselect": {
          "type": "object"
        },
        "layout_type": {
          "type": "object"
        },
        "duration": {
          "type": "object"
        }
      },
      "required": [
        "question",
        "answers"
      ]
    },
    "PollEmoji": {
      "type": "object",
      "properties": {
        "id": {
          "type": "object"
        },
        "name": {
          "type": "object"
        },
        "animated": {
          "type": "object"
        }
      }
    },
    "PollEmojiCreateRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "object"
        },
        "name": {
          "type": "object"
        },
        "animated": {
          "type": "object"
        }
      }
    },
    "PollLayoutTypes": {
      "type": "object"
    },
    "PollMedia": {
      "type": "object",
      "properties": {
        "text": {
          "type": "object"
        },
        "emoji": {
          "type": "object"
        }
      }
    },
    "PollMediaCreateRequest": {
      "type": "object",
      "properties": {
        "text": {
          "type": "object"
        },
        "emoji": {
          "type": "object"
        }
      }
    },
    "PollMediaResponse": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string"
        },
        "emoji": {
          "type": "ref",
          "ref": "MessageReactionEmojiResponse"
        }
      }
    },
    "PollResponse": {
      "type": "object",
      "properties": {
        "question": {
          "type": "ref",
          "ref": "PollMediaResponse"
        },
        "answers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PollAnswerResponse"
          }
        },
        "expiry": {
          "type": "string"
        },
        "allow_multiselect": {
          "type": "boolean"
        },
        "layout_type": {
          "type": "ref",
          "ref": "PollLayoutTypes"
        },
        "results": {
          "type": "ref",
          "ref": "PollResultsResponse"
        }
      },
      "required": [
        "question",
        "answers",
        "expiry",
        "allow_multiselect",
        "layout_type",
        "results"
      ]
    },
    "PollResultsEntryResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "count": {
          "type": "number"
        },
        "me_voted": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "count",
        "me_voted"
      ]
    },
    "PollResultsResponse": {
      "type": "object",
      "properties": {
        "answer_counts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PollResultsEntryResponse"
          }
        },
        "is_finalized": {
          "type": "boolean"
        }
      },
      "required": [
        "answer_counts",
        "is_finalized"
      ]
    },
    "PongInteractionCallbackRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        }
      },
      "required": [
        "type"
      ]
    },
    "PremiumGuildTiers": {
      "type": "object",
      "properties": {}
    },
    "PremiumTypes": {
      "type": "object",
      "properties": {}
    },
    "PrivateApplicationResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "object"
        },
        "description": {
          "type": "string"
        },
        "type": {
          "type": "object"
        },
        "cover_image": {
          "type": "string"
        },
        "primary_sku_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "bot": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "slug": {
          "type": "string"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "rpc_origins": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "bot_public": {
          "type": "boolean"
        },
        "bot_require_code_grant": {
          "type": "boolean"
        },
        "terms_of_service_url": {
          "type": "string"
        },
        "privacy_policy_url": {
          "type": "string"
        },
        "custom_install_url": {
          "type": "string"
        },
        "install_params": {
          "type": "ref",
          "ref": "ApplicationOAuth2InstallParamsResponse"
        },
        "integration_types_config": {
          "type": "object",
          "properties": {}
        },
        "verify_key": {
          "type": "string"
        },
        "flags": {
          "type": "number"
        },
        "flags_new": {
          "type": "string"
        },
        "max_participants": {
          "type": "object"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "redirect_uris": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "interactions_endpoint_url": {
          "type": "object"
        },
        "role_connections_verification_url": {
          "type": "object"
        },
        "owner": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "approximate_guild_count": {
          "type": "number"
        },
        "approximate_user_install_count": {
          "type": "number"
        },
        "approximate_user_authorization_count": {
          "type": "number"
        },
        "event_webhooks_url": {
          "type": "object"
        },
        "event_webhooks_status": {
          "type": "ref",
          "ref": "ApplicationEventWebhooksStatus"
        },
        "event_webhooks_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ActionTypes"
          }
        },
        "explicit_content_filter": {
          "type": "ref",
          "ref": "ApplicationExplicitContentFilterTypes"
        },
        "team": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "name",
        "icon",
        "description",
        "type",
        "verify_key",
        "flags",
        "flags_new",
        "redirect_uris",
        "interactions_endpoint_url",
        "role_connections_verification_url",
        "owner",
        "approximate_guild_count",
        "approximate_user_install_count",
        "approximate_user_authorization_count",
        "explicit_content_filter",
        "team"
      ]
    },
    "PrivateChannelLocation": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "kind": {
          "type": "ref",
          "ref": "EmbeddedActivityLocationKind"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "kind",
        "channel_id"
      ]
    },
    "PrivateChannelResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "ChannelTypes"
        },
        "last_message_id": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "last_pin_timestamp": {
          "type": "object"
        },
        "recipients": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        }
      },
      "required": [
        "id",
        "type",
        "flags",
        "recipients"
      ]
    },
    "PrivateGroupChannelResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "ChannelTypes"
        },
        "last_message_id": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "last_pin_timestamp": {
          "type": "object"
        },
        "recipients": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        },
        "name": {
          "type": "object"
        },
        "icon": {
          "type": "object"
        },
        "owner_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "managed": {
          "type": "boolean"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "type",
        "flags",
        "recipients",
        "name",
        "icon",
        "owner_id"
      ]
    },
    "PrivateGuildMemberResponse": {
      "type": "object",
      "properties": {
        "avatar": {
          "type": "object"
        },
        "avatar_decoration_data": {
          "type": "object"
        },
        "banner": {
          "type": "object"
        },
        "communication_disabled_until": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "joined_at": {
          "type": "string"
        },
        "nick": {
          "type": "object"
        },
        "pending": {
          "type": "boolean"
        },
        "premium_since": {
          "type": "object"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "collectibles": {
          "type": "object"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "mute": {
          "type": "boolean"
        },
        "deaf": {
          "type": "boolean"
        },
        "permissions": {
          "type": "string"
        }
      },
      "required": [
        "avatar",
        "banner",
        "communication_disabled_until",
        "flags",
        "joined_at",
        "nick",
        "pending",
        "premium_since",
        "roles",
        "user",
        "mute",
        "deaf"
      ]
    },
    "ProvisionalTokenResponse": {
      "type": "object",
      "properties": {
        "token_type": {
          "type": "string"
        },
        "access_token": {
          "type": "string"
        },
        "expires_in": {
          "type": "number"
        },
        "scope": {
          "type": "string"
        },
        "id_token": {
          "type": "string"
        },
        "refresh_token": {
          "type": "object"
        },
        "scopes": {
          "type": "object"
        },
        "expires_at_s": {
          "type": "object"
        }
      },
      "required": [
        "token_type",
        "access_token",
        "expires_in",
        "scope",
        "id_token"
      ]
    },
    "PruneGuildRequest": {
      "type": "object",
      "properties": {
        "days": {
          "type": "object"
        },
        "compute_prune_count": {
          "type": "object"
        },
        "include_roles": {
          "type": "string"
        }
      }
    },
    "PurchaseNotificationResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "PurchaseType"
        },
        "guild_product_purchase": {
          "type": "ref",
          "ref": "GuildProductPurchaseResponse"
        }
      },
      "required": [
        "type"
      ]
    },
    "PurchaseType": {
      "type": "object",
      "properties": {}
    },
    "QuarantineUserAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "AutomodActionType"
        },
        "metadata": {
          "type": "object"
        }
      },
      "required": [
        "type"
      ]
    },
    "QuarantineUserActionMetadata": {
      "type": "object",
      "properties": {}
    },
    "QuarantineUserActionMetadataResponse": {
      "type": "object",
      "properties": {}
    },
    "QuarantineUserActionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "AutomodActionType"
        },
        "metadata": {
          "type": "ref",
          "ref": "QuarantineUserActionMetadataResponse"
        }
      },
      "required": [
        "type",
        "metadata"
      ]
    },
    "RadioGroupComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "required": {
          "type": "object"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RadioGroupOptionForRequest"
          }
        }
      },
      "required": [
        "type",
        "custom_id",
        "options"
      ]
    },
    "RadioGroupOptionForRequest": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "default": {
          "type": "object"
        }
      },
      "required": [
        "label",
        "value"
      ]
    },
    "ReactionTypes": {
      "type": "object",
      "properties": {}
    },
    "ResolvedObjectsResponse": {
      "type": "object",
      "properties": {
        "users": {
          "type": "object"
        },
        "members": {
          "type": "object"
        },
        "channels": {
          "type": "object"
        },
        "roles": {
          "type": "object"
        }
      }
    },
    "ResourceChannelResponse": {
      "type": "object",
      "properties": {
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "title": {
          "type": "string"
        },
        "emoji": {
          "type": "ref",
          "ref": "SettingsEmojiResponse"
        },
        "icon": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "channel_id",
        "title",
        "description"
      ]
    },
    "RichEmbed": {
      "type": "object",
      "properties": {
        "type": {
          "type": "object"
        },
        "url": {
          "type": "object"
        },
        "title": {
          "type": "object"
        },
        "color": {
          "type": "object"
        },
        "timestamp": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "author": {
          "type": "object"
        },
        "image": {
          "type": "object"
        },
        "thumbnail": {
          "type": "object"
        },
        "footer": {
          "type": "object"
        },
        "fields": {
          "type": "object"
        },
        "provider": {
          "type": "object"
        },
        "video": {
          "type": "object"
        }
      }
    },
    "RichEmbedAuthor": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object"
        },
        "url": {
          "type": "object"
        },
        "icon_url": {
          "type": "object"
        }
      }
    },
    "RichEmbedField": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "inline": {
          "type": "object"
        }
      },
      "required": [
        "name",
        "value"
      ]
    },
    "RichEmbedFooter": {
      "type": "object",
      "properties": {
        "text": {
          "type": "object"
        },
        "icon_url": {
          "type": "object"
        }
      }
    },
    "RichEmbedImage": {
      "type": "object",
      "properties": {
        "url": {
          "type": "object"
        },
        "width": {
          "type": "object"
        },
        "height": {
          "type": "object"
        },
        "placeholder": {
          "type": "object"
        },
        "placeholder_version": {
          "type": "object"
        },
        "is_animated": {
          "type": "object"
        },
        "description": {
          "type": "object"
        }
      }
    },
    "RichEmbedProvider": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object"
        },
        "url": {
          "type": "object"
        }
      }
    },
    "RichEmbedThumbnail": {
      "type": "object",
      "properties": {
        "url": {
          "type": "object"
        },
        "width": {
          "type": "object"
        },
        "height": {
          "type": "object"
        },
        "placeholder": {
          "type": "object"
        },
        "placeholder_version": {
          "type": "object"
        },
        "is_animated": {
          "type": "object"
        },
        "description": {
          "type": "object"
        }
      }
    },
    "RichEmbedVideo": {
      "type": "object",
      "properties": {
        "url": {
          "type": "object"
        },
        "width": {
          "type": "object"
        },
        "height": {
          "type": "object"
        },
        "placeholder": {
          "type": "object"
        },
        "placeholder_version": {
          "type": "object"
        },
        "is_animated": {
          "type": "object"
        },
        "description": {
          "type": "object"
        }
      }
    },
    "RoleColors": {
      "type": "object",
      "properties": {
        "primary_color": {
          "type": "object"
        },
        "secondary_color": {
          "type": "object"
        },
        "tertiary_color": {
          "type": "object"
        }
      }
    },
    "RoleSelectComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "default_values": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "RoleSelectComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "default_values": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "RoleSelectComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "string"
        },
        "min_values": {
          "type": "number"
        },
        "max_values": {
          "type": "number"
        },
        "disabled": {
          "type": "boolean"
        },
        "default_values": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RoleSelectDefaultValueResponse"
          }
        }
      },
      "required": [
        "type",
        "id",
        "custom_id",
        "min_values",
        "max_values"
      ]
    },
    "RoleSelectDefaultValue": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "SnowflakeSelectDefaultValueTypes"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "type",
        "id"
      ]
    },
    "RoleSelectDefaultValueResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "SnowflakeSelectDefaultValueTypes"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "type",
        "id"
      ]
    },
    "SDKMessageRequest": {
      "type": "object",
      "properties": {
        "content": {
          "type": "object"
        },
        "embeds": {
          "type": "object"
        },
        "allowed_mentions": {
          "type": "object"
        },
        "sticker_ids": {
          "type": "object"
        },
        "components": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        },
        "attachments": {
          "type": "object"
        },
        "poll": {
          "type": "object"
        },
        "shared_client_theme": {
          "type": "object"
        },
        "message_reference": {
          "type": "object"
        },
        "nonce": {
          "type": "number"
        },
        "enforce_nonce": {
          "type": "object"
        },
        "tts": {
          "type": "object"
        }
      }
    },
    "SKUIneligibilityReason": {
      "type": "object",
      "properties": {}
    },
    "ScheduledEventResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        },
        "creator_id": {
          "type": "object"
        },
        "creator": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "status": {
          "type": "ref",
          "ref": "GuildScheduledEventStatuses"
        },
        "entity_type": {
          "type": "ref",
          "ref": "GuildScheduledEventEntityTypes"
        },
        "entity_id": {
          "type": "object"
        },
        "user_count": {
          "type": "number"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "user_rsvp": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "guild_id",
        "name",
        "description",
        "channel_id",
        "creator_id",
        "image",
        "scheduled_start_time",
        "scheduled_end_time",
        "status",
        "entity_type",
        "entity_id",
        "privacy_level"
      ]
    },
    "ScheduledEventUserResponse": {
      "type": "object",
      "properties": {
        "guild_scheduled_event_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "user_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "member": {
          "type": "ref",
          "ref": "GuildMemberResponse"
        }
      },
      "required": [
        "guild_scheduled_event_id",
        "user_id"
      ]
    },
    "SearchIndexNotReadyResponse": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        },
        "code": {
          "type": "number"
        },
        "documents_indexed": {
          "type": "number"
        },
        "retry_after": {
          "type": "number"
        }
      },
      "required": [
        "message",
        "code",
        "documents_indexed",
        "retry_after"
      ]
    },
    "SearchMessageResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageType"
        },
        "content": {
          "type": "string"
        },
        "mentions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserResponse"
          }
        },
        "mention_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "attachments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageAttachmentResponse"
          }
        },
        "embeds": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageEmbedResponse"
          }
        },
        "timestamp": {
          "type": "string"
        },
        "edited_timestamp": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ActionRowComponentResponse"
          }
        },
        "stickers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GuildStickerResponse"
          }
        },
        "sticker_items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageStickerItemResponse"
          }
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "author": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "pinned": {
          "type": "boolean"
        },
        "mention_everyone": {
          "type": "boolean"
        },
        "tts": {
          "type": "boolean"
        },
        "call": {
          "type": "ref",
          "ref": "MessageCallResponse"
        },
        "activity": {
          "type": "ref",
          "ref": "MessageActivityResponse"
        },
        "application": {
          "type": "ref",
          "ref": "BasicApplicationResponse"
        },
        "application_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "interaction": {
          "type": "ref",
          "ref": "MessageInteractionResponse"
        },
        "nonce": {
          "type": "number"
        },
        "webhook_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "message_reference": {
          "type": "ref",
          "ref": "MessageReferenceResponse"
        },
        "thread": {
          "type": "ref",
          "ref": "ThreadResponse"
        },
        "mention_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageMentionChannelResponse"
          }
        },
        "role_subscription_data": {
          "type": "ref",
          "ref": "MessageRoleSubscriptionDataResponse"
        },
        "purchase_notification": {
          "type": "ref",
          "ref": "PurchaseNotificationResponse"
        },
        "position": {
          "type": "number"
        },
        "resolved": {
          "type": "ref",
          "ref": "ResolvedObjectsResponse"
        },
        "poll": {
          "type": "ref",
          "ref": "PollResponse"
        },
        "shared_client_theme": {
          "type": "ref",
          "ref": "CustomClientThemeResponse"
        },
        "interaction_metadata": {
          "type": "ref",
          "ref": "ApplicationCommandInteractionMetadataResponse"
        },
        "message_snapshots": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageSnapshotResponse"
          }
        },
        "reactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageReactionResponse"
          }
        },
        "referenced_message": {
          "type": "object"
        },
        "hit": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "content",
        "mentions",
        "mention_roles",
        "attachments",
        "embeds",
        "timestamp",
        "edited_timestamp",
        "flags",
        "components",
        "id",
        "channel_id",
        "author",
        "pinned",
        "mention_everyone",
        "tts",
        "hit"
      ]
    },
    "SearchableEmbedType": {
      "type": "object",
      "properties": {}
    },
    "SectionComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TextDisplayComponentForMessageRequest"
          }
        },
        "accessory": {
          "type": "ref",
          "ref": "ButtonComponentForMessageRequest"
        }
      },
      "required": [
        "type",
        "components",
        "accessory"
      ]
    },
    "SectionComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "components": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TextDisplayComponentResponse"
          }
        },
        "accessory": {
          "type": "ref",
          "ref": "ButtonComponentResponse"
        }
      },
      "required": [
        "type",
        "id",
        "components",
        "accessory"
      ]
    },
    "SeparatorComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "spacing": {
          "type": "object"
        },
        "divider": {
          "type": "object"
        }
      },
      "required": [
        "type"
      ]
    },
    "SeparatorComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "spacing": {
          "type": "ref",
          "ref": "MessageComponentSeparatorSpacingSize"
        },
        "divider": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "id",
        "spacing",
        "divider"
      ]
    },
    "SettingsEmojiResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "object"
        },
        "name": {
          "type": "object"
        },
        "animated": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "name",
        "animated"
      ]
    },
    "SlackWebhook": {
      "type": "object",
      "properties": {
        "text": {
          "type": "object"
        },
        "username": {
          "type": "object"
        },
        "icon_url": {
          "type": "object"
        },
        "attachments": {
          "type": "object"
        }
      }
    },
    "SnowflakeSelectDefaultValueTypes": {
      "type": "object",
      "properties": {}
    },
    "SnowflakeType": {
      "type": "string"
    },
    "SocialLayerSKUPurchaseEligibilityCallbackData": {
      "type": "object",
      "properties": {
        "eligible": {
          "type": "boolean"
        },
        "ineligible_reason": {
          "type": "object"
        },
        "ineligible_reason_description": {
          "type": "object"
        }
      },
      "required": [
        "eligible"
      ]
    },
    "SocialLayerSKUPurchaseEligibilityInteractionCallbackRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        },
        "data": {
          "type": "ref",
          "ref": "SocialLayerSKUPurchaseEligibilityCallbackData"
        }
      },
      "required": [
        "type",
        "data"
      ]
    },
    "SortingMode": {
      "type": "object",
      "properties": {}
    },
    "SortingOrder": {
      "type": "object",
      "properties": {}
    },
    "SoundboardCreateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "volume": {
          "type": "object"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        },
        "sound": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "sound"
      ]
    },
    "SoundboardPatchRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "volume": {
          "type": "object"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        }
      }
    },
    "SoundboardSoundResponse": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "sound_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "volume": {
          "type": "number"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "available": {
          "type": "boolean"
        },
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        }
      },
      "required": [
        "name",
        "sound_id",
        "volume",
        "emoji_id",
        "emoji_name",
        "available"
      ]
    },
    "SoundboardSoundSendRequest": {
      "type": "object",
      "properties": {
        "sound_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "source_guild_id": {
          "type": "object"
        }
      },
      "required": [
        "sound_id"
      ]
    },
    "SpamLinkRuleResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "creator_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "AutomodEventType"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BlockMessageActionResponse"
          }
        },
        "trigger_type": {
          "type": "ref",
          "ref": "AutomodTriggerType"
        },
        "enabled": {
          "type": "boolean"
        },
        "exempt_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "exempt_channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "trigger_metadata": {
          "type": "ref",
          "ref": "SpamLinkTriggerMetadataResponse"
        }
      },
      "required": [
        "id",
        "guild_id",
        "creator_id",
        "name",
        "event_type",
        "actions",
        "trigger_type",
        "enabled",
        "exempt_roles",
        "exempt_channels",
        "trigger_metadata"
      ]
    },
    "SpamLinkTriggerMetadataResponse": {
      "type": "object",
      "properties": {}
    },
    "StageInstanceResponse": {
      "type": "object",
      "properties": {
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "topic": {
          "type": "string"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "StageInstancesPrivacyLevels"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "discoverable_disabled": {
          "type": "boolean"
        },
        "guild_scheduled_event_id": {
          "type": "object"
        }
      },
      "required": [
        "guild_id",
        "channel_id",
        "topic",
        "privacy_level",
        "id",
        "discoverable_disabled",
        "guild_scheduled_event_id"
      ]
    },
    "StageInstancesPrivacyLevels": {
      "type": "object",
      "properties": {}
    },
    "StageScheduledEventCreateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "entity_type": {
          "type": "ref",
          "ref": "GuildScheduledEventEntityTypes"
        },
        "channel_id": {
          "type": "object"
        },
        "entity_metadata": {
          "type": "object"
        }
      },
      "required": [
        "name",
        "scheduled_start_time",
        "privacy_level",
        "entity_type"
      ]
    },
    "StageScheduledEventPatchRequestPartial": {
      "type": "object",
      "properties": {
        "status": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "entity_type": {
          "type": "object"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "channel_id": {
          "type": "object"
        },
        "entity_metadata": {
          "type": "object"
        }
      }
    },
    "StageScheduledEventResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        },
        "creator_id": {
          "type": "object"
        },
        "creator": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "status": {
          "type": "ref",
          "ref": "GuildScheduledEventStatuses"
        },
        "entity_type": {
          "type": "ref",
          "ref": "GuildScheduledEventEntityTypes"
        },
        "entity_id": {
          "type": "object"
        },
        "user_count": {
          "type": "number"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "user_rsvp": {
          "type": "object"
        },
        "entity_metadata": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "guild_id",
        "name",
        "description",
        "channel_id",
        "creator_id",
        "image",
        "scheduled_start_time",
        "scheduled_end_time",
        "status",
        "entity_type",
        "entity_id",
        "privacy_level",
        "entity_metadata"
      ]
    },
    "StandardStickerResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "tags": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "StickerTypes"
        },
        "format_type": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "pack_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "sort_value": {
          "type": "number"
        }
      },
      "required": [
        "id",
        "name",
        "tags",
        "type",
        "format_type",
        "description",
        "pack_id",
        "sort_value"
      ]
    },
    "StickerFormatTypes": {
      "type": "object",
      "properties": {}
    },
    "StickerPackCollectionResponse": {
      "type": "object",
      "properties": {
        "sticker_packs": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "StickerPackResponse"
          }
        }
      },
      "required": [
        "sticker_packs"
      ]
    },
    "StickerPackResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "sku_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "stickers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "StandardStickerResponse"
          }
        },
        "cover_sticker_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "banner_asset_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "sku_id",
        "name",
        "description",
        "stickers"
      ]
    },
    "StickerTypes": {
      "type": "object",
      "properties": {}
    },
    "StringSelectComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "StringSelectOptionForRequest"
          }
        }
      },
      "required": [
        "type",
        "custom_id",
        "options"
      ]
    },
    "StringSelectComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "StringSelectOptionForRequest"
          }
        }
      },
      "required": [
        "type",
        "custom_id",
        "options"
      ]
    },
    "StringSelectComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "string"
        },
        "min_values": {
          "type": "number"
        },
        "max_values": {
          "type": "number"
        },
        "disabled": {
          "type": "boolean"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "StringSelectOptionResponse"
          }
        }
      },
      "required": [
        "type",
        "id",
        "custom_id",
        "min_values",
        "max_values",
        "options"
      ]
    },
    "StringSelectOptionForRequest": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "default": {
          "type": "object"
        },
        "emoji": {
          "type": "object"
        }
      },
      "required": [
        "label",
        "value"
      ]
    },
    "StringSelectOptionResponse": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "emoji": {
          "type": "ref",
          "ref": "ComponentEmojiResponse"
        },
        "default": {
          "type": "boolean"
        }
      },
      "required": [
        "label",
        "value"
      ]
    },
    "TargetUsersJobStatusResponse": {
      "type": "object",
      "properties": {
        "status": {
          "type": "ref",
          "ref": "TargetUsersJobStatusTypes"
        },
        "total_users": {
          "type": "ref",
          "ref": "UInt32Type"
        },
        "processed_users": {
          "type": "ref",
          "ref": "UInt32Type"
        },
        "created_at": {
          "type": "object"
        },
        "completed_at": {
          "type": "object"
        },
        "error_message": {
          "type": "object"
        }
      },
      "required": [
        "status",
        "total_users",
        "processed_users",
        "created_at",
        "completed_at",
        "error_message"
      ]
    },
    "TargetUsersJobStatusTypes": {
      "type": "object",
      "properties": {}
    },
    "TeamMemberResponse": {
      "type": "object",
      "properties": {
        "user": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "team_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "membership_state": {
          "type": "ref",
          "ref": "TeamMembershipStates"
        },
        "role": {
          "type": "ref",
          "ref": "TeamMemberRoles"
        },
        "permissions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "user",
        "team_id",
        "membership_state",
        "role",
        "permissions"
      ]
    },
    "TeamMemberRoles": {
      "type": "object",
      "properties": {}
    },
    "TeamMembershipStates": {
      "type": "object",
      "properties": {}
    },
    "TeamResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "icon": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "owner_user_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "members": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TeamMemberResponse"
          }
        }
      },
      "required": [
        "id",
        "icon",
        "name",
        "owner_user_id",
        "members"
      ]
    },
    "TermsFormFieldResponse": {
      "type": "object",
      "properties": {
        "field_type": {
          "type": "ref",
          "ref": "GuildMemberVerificationFormFieldType"
        },
        "label": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "required": {
          "type": "boolean"
        },
        "values": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "response": {
          "type": "boolean"
        }
      },
      "required": [
        "field_type",
        "values"
      ]
    },
    "TextDisplayComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "content": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "content"
      ]
    },
    "TextDisplayComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "content": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "content"
      ]
    },
    "TextDisplayComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "content": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id",
        "content"
      ]
    },
    "TextInputComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "style": {
          "type": "ref",
          "ref": "TextInputStyleTypes"
        },
        "label": {
          "type": "object"
        },
        "value": {
          "type": "object"
        },
        "placeholder": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "min_length": {
          "type": "object"
        },
        "max_length": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id",
        "style"
      ]
    },
    "TextInputComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "custom_id": {
          "type": "string"
        },
        "style": {
          "type": "ref",
          "ref": "TextInputStyleTypes"
        },
        "label": {
          "type": "object"
        },
        "value": {
          "type": "string"
        },
        "placeholder": {
          "type": "string"
        },
        "required": {
          "type": "boolean"
        },
        "min_length": {
          "type": "object"
        },
        "max_length": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "id",
        "custom_id",
        "style",
        "label",
        "min_length",
        "max_length"
      ]
    },
    "TextInputFormFieldResponse": {
      "type": "object",
      "properties": {
        "field_type": {
          "type": "ref",
          "ref": "GuildMemberVerificationFormFieldType"
        },
        "label": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "required": {
          "type": "boolean"
        },
        "placeholder": {
          "type": "string"
        },
        "response": {
          "type": "string"
        }
      },
      "required": [
        "field_type"
      ]
    },
    "TextInputStyleTypes": {
      "type": "object",
      "properties": {}
    },
    "ThreadAutoArchiveDuration": {
      "type": "object",
      "properties": {}
    },
    "ThreadMemberResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "user_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "join_timestamp": {
          "type": "string"
        },
        "flags": {
          "type": "number"
        },
        "member": {
          "type": "ref",
          "ref": "GuildMemberResponse"
        }
      },
      "required": [
        "id",
        "user_id",
        "join_timestamp",
        "flags"
      ]
    },
    "ThreadMetadataResponse": {
      "type": "object",
      "properties": {
        "archived": {
          "type": "boolean"
        },
        "archive_timestamp": {
          "type": "object"
        },
        "auto_archive_duration": {
          "type": "ref",
          "ref": "ThreadAutoArchiveDuration"
        },
        "locked": {
          "type": "boolean"
        },
        "create_timestamp": {
          "type": "string"
        },
        "invitable": {
          "type": "boolean"
        }
      },
      "required": [
        "archived",
        "archive_timestamp",
        "auto_archive_duration",
        "locked"
      ]
    },
    "ThreadResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "type": {
          "type": "ref",
          "ref": "ChannelTypes"
        },
        "last_message_id": {
          "type": "object"
        },
        "flags": {
          "type": "number"
        },
        "last_pin_timestamp": {
          "type": "object"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "parent_id": {
          "type": "object"
        },
        "rate_limit_per_user": {
          "type": "number"
        },
        "bitrate": {
          "type": "number"
        },
        "user_limit": {
          "type": "number"
        },
        "rtc_region": {
          "type": "object"
        },
        "video_quality_mode": {
          "type": "ref",
          "ref": "VideoQualityModes"
        },
        "permissions": {
          "type": "string"
        },
        "owner_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "thread_metadata": {
          "type": "ref",
          "ref": "ThreadMetadataResponse"
        },
        "message_count": {
          "type": "number"
        },
        "member_count": {
          "type": "number"
        },
        "total_message_sent": {
          "type": "number"
        },
        "applied_tags": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "member": {
          "type": "ref",
          "ref": "ThreadMemberResponse"
        }
      },
      "required": [
        "id",
        "type",
        "flags",
        "guild_id",
        "name",
        "owner_id",
        "thread_metadata",
        "message_count",
        "member_count",
        "total_message_sent"
      ]
    },
    "ThreadSearchResponse": {
      "type": "object",
      "properties": {
        "threads": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ThreadResponse"
          }
        },
        "members": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ThreadMemberResponse"
          }
        },
        "has_more": {
          "type": "boolean"
        },
        "first_messages": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageResponse"
          }
        },
        "total_results": {
          "type": "number"
        }
      },
      "required": [
        "threads",
        "members",
        "has_more",
        "total_results"
      ]
    },
    "ThreadSearchTagSetting": {
      "type": "object",
      "properties": {}
    },
    "ThreadSortOrder": {
      "type": "object",
      "properties": {}
    },
    "ThreadSortingMode": {
      "type": "object",
      "properties": {}
    },
    "ThreadsResponse": {
      "type": "object",
      "properties": {
        "threads": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ThreadResponse"
          }
        },
        "members": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ThreadMemberResponse"
          }
        },
        "has_more": {
          "type": "boolean"
        },
        "first_messages": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessageResponse"
          }
        }
      },
      "required": [
        "threads",
        "members",
        "has_more"
      ]
    },
    "ThumbnailComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "spoiler": {
          "type": "object"
        },
        "media": {
          "type": "ref",
          "ref": "UnfurledMediaRequest"
        }
      },
      "required": [
        "type",
        "media"
      ]
    },
    "ThumbnailComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "media": {
          "type": "ref",
          "ref": "UnfurledMediaResponse"
        },
        "description": {
          "type": "object"
        },
        "spoiler": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "id",
        "media",
        "description",
        "spoiler"
      ]
    },
    "TypingIndicatorResponse": {
      "type": "object",
      "properties": {}
    },
    "UInt32Type": {
      "type": "number"
    },
    "UnbanUserFromGuildRequest": {
      "type": "object",
      "properties": {}
    },
    "UnfurledMediaRequest": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        }
      },
      "required": [
        "url"
      ]
    },
    "UnfurledMediaRequestWithAttachmentReferenceRequired": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        }
      },
      "required": [
        "url"
      ]
    },
    "UnfurledMediaResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "url": {
          "type": "string"
        },
        "proxy_url": {
          "type": "string"
        },
        "width": {
          "type": "object"
        },
        "height": {
          "type": "object"
        },
        "content_type": {
          "type": "object"
        },
        "attachment_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "url",
        "proxy_url"
      ]
    },
    "UpdateApplicationUserRoleConnectionRequest": {
      "type": "object",
      "properties": {
        "platform_name": {
          "type": "object"
        },
        "platform_username": {
          "type": "object"
        },
        "metadata": {
          "type": "object"
        }
      }
    },
    "UpdateDMRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object"
        }
      }
    },
    "UpdateDefaultReactionEmojiRequest": {
      "type": "object",
      "properties": {
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        }
      }
    },
    "UpdateGroupDMRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object"
        },
        "icon": {
          "type": "object"
        }
      }
    },
    "UpdateGuildChannelRequestPartial": {
      "type": "object",
      "properties": {
        "type": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "position": {
          "type": "object"
        },
        "topic": {
          "type": "object"
        },
        "bitrate": {
          "type": "object"
        },
        "user_limit": {
          "type": "object"
        },
        "nsfw": {
          "type": "object"
        },
        "rate_limit_per_user": {
          "type": "object"
        },
        "parent_id": {
          "type": "object"
        },
        "permission_overwrites": {
          "type": "object"
        },
        "rtc_region": {
          "type": "object"
        },
        "video_quality_mode": {
          "type": "object"
        },
        "default_auto_archive_duration": {
          "type": "object"
        },
        "default_reaction_emoji": {
          "type": "object"
        },
        "default_thread_rate_limit_per_user": {
          "type": "object"
        },
        "default_sort_order": {
          "type": "object"
        },
        "default_forum_layout": {
          "type": "object"
        },
        "default_tag_setting": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        },
        "available_tags": {
          "type": "object"
        }
      }
    },
    "UpdateGuildOnboardingRequest": {
      "type": "object",
      "properties": {
        "prompts": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        },
        "default_channel_ids": {
          "type": "object"
        },
        "mode": {
          "type": "object"
        }
      }
    },
    "UpdateMessageInteractionCallbackRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        },
        "data": {
          "type": "object"
        }
      },
      "required": [
        "type"
      ]
    },
    "UpdateMessageInteractionCallbackResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "InteractionCallbackTypes"
        },
        "message": {
          "type": "ref",
          "ref": "MessageResponse"
        }
      },
      "required": [
        "type",
        "message"
      ]
    },
    "UpdateOnboardingPromptRequest": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "OnboardingPromptOptionRequest"
          }
        },
        "single_select": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "in_onboarding": {
          "type": "object"
        },
        "type": {
          "type": "object"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "title",
        "options",
        "id"
      ]
    },
    "UpdateRolePositionsRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "object"
        },
        "position": {
          "type": "object"
        }
      }
    },
    "UpdateRoleRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object"
        },
        "permissions": {
          "type": "object"
        },
        "color": {
          "type": "object"
        },
        "colors": {
          "type": "object"
        },
        "hoist": {
          "type": "object"
        },
        "mentionable": {
          "type": "object"
        },
        "icon": {
          "type": "object"
        },
        "unicode_emoji": {
          "type": "object"
        }
      }
    },
    "UpdateSelfVoiceStateRequestPartial": {
      "type": "object",
      "properties": {
        "request_to_speak_timestamp": {
          "type": "object"
        },
        "suppress": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        }
      }
    },
    "UpdateThreadRequestPartial": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object"
        },
        "archived": {
          "type": "object"
        },
        "locked": {
          "type": "object"
        },
        "invitable": {
          "type": "object"
        },
        "auto_archive_duration": {
          "type": "object"
        },
        "rate_limit_per_user": {
          "type": "object"
        },
        "flags": {
          "type": "object"
        },
        "applied_tags": {
          "type": "object"
        },
        "bitrate": {
          "type": "object"
        },
        "user_limit": {
          "type": "object"
        },
        "rtc_region": {
          "type": "object"
        },
        "video_quality_mode": {
          "type": "object"
        }
      }
    },
    "UpdateThreadTagRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "emoji_id": {
          "type": "object"
        },
        "emoji_name": {
          "type": "object"
        },
        "moderated": {
          "type": "object"
        },
        "id": {
          "type": "object"
        }
      },
      "required": [
        "name"
      ]
    },
    "UpdateVoiceStateRequestPartial": {
      "type": "object",
      "properties": {
        "suppress": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        }
      }
    },
    "UserAvatarDecorationResponse": {
      "type": "object",
      "properties": {
        "asset": {
          "type": "string"
        },
        "sku_id": {
          "type": "object"
        }
      },
      "required": [
        "asset",
        "sku_id"
      ]
    },
    "UserCollectiblesResponse": {
      "type": "object",
      "properties": {
        "nameplate": {
          "type": "object"
        }
      },
      "required": [
        "nameplate"
      ]
    },
    "UserCommunicationDisabledAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "AutomodActionType"
        },
        "metadata": {
          "type": "ref",
          "ref": "UserCommunicationDisabledActionMetadata"
        }
      },
      "required": [
        "type",
        "metadata"
      ]
    },
    "UserCommunicationDisabledActionMetadata": {
      "type": "object",
      "properties": {
        "duration_seconds": {
          "type": "object"
        }
      }
    },
    "UserCommunicationDisabledActionMetadataResponse": {
      "type": "object",
      "properties": {
        "duration_seconds": {
          "type": "number"
        }
      },
      "required": [
        "duration_seconds"
      ]
    },
    "UserCommunicationDisabledActionResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "AutomodActionType"
        },
        "metadata": {
          "type": "ref",
          "ref": "UserCommunicationDisabledActionMetadataResponse"
        }
      },
      "required": [
        "type",
        "metadata"
      ]
    },
    "UserGuildOnboardingResponse": {
      "type": "object",
      "properties": {
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "prompts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "OnboardingPromptResponse"
          }
        },
        "default_channel_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "enabled": {
          "type": "boolean"
        },
        "mode": {
          "type": "ref",
          "ref": "GuildOnboardingMode"
        }
      },
      "required": [
        "guild_id",
        "prompts",
        "default_channel_ids",
        "enabled",
        "mode"
      ]
    },
    "UserNameplateResponse": {
      "type": "object",
      "properties": {
        "sku_id": {
          "type": "object"
        },
        "asset": {
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "palette": {
          "type": "ref",
          "ref": "NameplatePalette"
        }
      },
      "required": [
        "sku_id",
        "asset",
        "label",
        "palette"
      ]
    },
    "UserNotificationSettings": {
      "type": "object",
      "properties": {}
    },
    "UserPIIResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "username": {
          "type": "string"
        },
        "avatar": {
          "type": "object"
        },
        "discriminator": {
          "type": "string"
        },
        "public_flags": {
          "type": "number"
        },
        "flags": {
          "type": "ref",
          "ref": "Int53Type"
        },
        "bot": {
          "type": "boolean"
        },
        "system": {
          "type": "boolean"
        },
        "banner": {
          "type": "object"
        },
        "accent_color": {
          "type": "object"
        },
        "global_name": {
          "type": "object"
        },
        "avatar_decoration_data": {
          "type": "object"
        },
        "collectibles": {
          "type": "object"
        },
        "primary_guild": {
          "type": "object"
        },
        "mfa_enabled": {
          "type": "boolean"
        },
        "locale": {
          "type": "ref",
          "ref": "AvailableLocalesEnum"
        },
        "premium_type": {
          "type": "ref",
          "ref": "PremiumTypes"
        },
        "email": {
          "type": "object"
        },
        "verified": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "username",
        "avatar",
        "discriminator",
        "public_flags",
        "flags",
        "global_name",
        "mfa_enabled",
        "locale"
      ]
    },
    "UserPrimaryGuildResponse": {
      "type": "object",
      "properties": {
        "identity_guild_id": {
          "type": "object"
        },
        "identity_enabled": {
          "type": "object"
        },
        "tag": {
          "type": "object"
        },
        "badge": {
          "type": "object"
        }
      },
      "required": [
        "identity_guild_id",
        "identity_enabled",
        "tag",
        "badge"
      ]
    },
    "UserResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "username": {
          "type": "string"
        },
        "avatar": {
          "type": "object"
        },
        "discriminator": {
          "type": "string"
        },
        "public_flags": {
          "type": "number"
        },
        "flags": {
          "type": "ref",
          "ref": "Int53Type"
        },
        "bot": {
          "type": "boolean"
        },
        "system": {
          "type": "boolean"
        },
        "banner": {
          "type": "object"
        },
        "accent_color": {
          "type": "object"
        },
        "global_name": {
          "type": "object"
        },
        "avatar_decoration_data": {
          "type": "object"
        },
        "collectibles": {
          "type": "object"
        },
        "primary_guild": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "username",
        "avatar",
        "discriminator",
        "public_flags",
        "flags",
        "global_name",
        "primary_guild"
      ]
    },
    "UserSelectComponentForMessageRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "default_values": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "UserSelectComponentForModalRequest": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "object"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "object"
        },
        "min_values": {
          "type": "object"
        },
        "max_values": {
          "type": "object"
        },
        "disabled": {
          "type": "object"
        },
        "required": {
          "type": "object"
        },
        "default_values": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "custom_id"
      ]
    },
    "UserSelectComponentResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "MessageComponentTypes"
        },
        "id": {
          "type": "number"
        },
        "custom_id": {
          "type": "string"
        },
        "placeholder": {
          "type": "string"
        },
        "min_values": {
          "type": "number"
        },
        "max_values": {
          "type": "number"
        },
        "disabled": {
          "type": "boolean"
        },
        "default_values": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserSelectDefaultValueResponse"
          }
        }
      },
      "required": [
        "type",
        "id",
        "custom_id",
        "min_values",
        "max_values"
      ]
    },
    "UserSelectDefaultValue": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "SnowflakeSelectDefaultValueTypes"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "type",
        "id"
      ]
    },
    "UserSelectDefaultValueResponse": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "SnowflakeSelectDefaultValueTypes"
        },
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "type",
        "id"
      ]
    },
    "VanityURLErrorResponse": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        },
        "code": {
          "type": "number"
        }
      },
      "required": [
        "message",
        "code"
      ]
    },
    "VanityURLResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "object"
        },
        "uses": {
          "type": "number"
        },
        "error": {
          "type": "object"
        }
      },
      "required": [
        "code",
        "uses"
      ]
    },
    "VerificationLevels": {
      "type": "object",
      "properties": {}
    },
    "VideoQualityModes": {
      "type": "object",
      "properties": {}
    },
    "VoiceRegionResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "custom": {
          "type": "boolean"
        },
        "deprecated": {
          "type": "boolean"
        },
        "optimal": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "name",
        "custom",
        "deprecated",
        "optimal"
      ]
    },
    "VoiceScheduledEventCreateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "entity_type": {
          "type": "ref",
          "ref": "GuildScheduledEventEntityTypes"
        },
        "channel_id": {
          "type": "object"
        },
        "entity_metadata": {
          "type": "object"
        }
      },
      "required": [
        "name",
        "scheduled_start_time",
        "privacy_level",
        "entity_type"
      ]
    },
    "VoiceScheduledEventPatchRequestPartial": {
      "type": "object",
      "properties": {
        "status": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "entity_type": {
          "type": "object"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "channel_id": {
          "type": "object"
        },
        "entity_metadata": {
          "type": "object"
        }
      }
    },
    "VoiceScheduledEventResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "guild_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "channel_id": {
          "type": "object"
        },
        "creator_id": {
          "type": "object"
        },
        "creator": {
          "type": "ref",
          "ref": "UserResponse"
        },
        "image": {
          "type": "object"
        },
        "scheduled_start_time": {
          "type": "string"
        },
        "scheduled_end_time": {
          "type": "object"
        },
        "status": {
          "type": "ref",
          "ref": "GuildScheduledEventStatuses"
        },
        "entity_type": {
          "type": "ref",
          "ref": "GuildScheduledEventEntityTypes"
        },
        "entity_id": {
          "type": "object"
        },
        "user_count": {
          "type": "number"
        },
        "privacy_level": {
          "type": "ref",
          "ref": "GuildScheduledEventPrivacyLevels"
        },
        "user_rsvp": {
          "type": "object"
        },
        "entity_metadata": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "guild_id",
        "name",
        "description",
        "channel_id",
        "creator_id",
        "image",
        "scheduled_start_time",
        "scheduled_end_time",
        "status",
        "entity_type",
        "entity_id",
        "privacy_level",
        "entity_metadata"
      ]
    },
    "VoiceStateResponse": {
      "type": "object",
      "properties": {
        "channel_id": {
          "type": "object"
        },
        "deaf": {
          "type": "boolean"
        },
        "guild_id": {
          "type": "object"
        },
        "member": {
          "type": "ref",
          "ref": "GuildMemberResponse"
        },
        "mute": {
          "type": "boolean"
        },
        "request_to_speak_timestamp": {
          "type": "object"
        },
        "suppress": {
          "type": "boolean"
        },
        "self_stream": {
          "type": "object"
        },
        "self_deaf": {
          "type": "boolean"
        },
        "self_mute": {
          "type": "boolean"
        },
        "self_video": {
          "type": "boolean"
        },
        "session_id": {
          "type": "string"
        },
        "user_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "channel_id",
        "deaf",
        "guild_id",
        "mute",
        "request_to_speak_timestamp",
        "suppress",
        "self_stream",
        "self_deaf",
        "self_mute",
        "self_video",
        "session_id",
        "user_id"
      ]
    },
    "WebhookSlackEmbed": {
      "type": "object",
      "properties": {
        "title": {
          "type": "object"
        },
        "title_link": {
          "type": "object"
        },
        "text": {
          "type": "object"
        },
        "color": {
          "type": "object"
        },
        "ts": {
          "type": "object"
        },
        "pretext": {
          "type": "object"
        },
        "footer": {
          "type": "object"
        },
        "footer_icon": {
          "type": "object"
        },
        "author_name": {
          "type": "object"
        },
        "author_link": {
          "type": "object"
        },
        "author_icon": {
          "type": "object"
        },
        "image_url": {
          "type": "object"
        },
        "thumb_url": {
          "type": "object"
        },
        "fields": {
          "type": "object"
        }
      }
    },
    "WebhookSlackEmbedField": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object"
        },
        "value": {
          "type": "object"
        },
        "inline": {
          "type": "object"
        }
      }
    },
    "WebhookSourceChannelResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "WebhookSourceGuildResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "icon": {
          "type": "object"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "icon",
        "name"
      ]
    },
    "WebhookTypes": {
      "type": "object",
      "properties": {}
    },
    "WelcomeMessageResponse": {
      "type": "object",
      "properties": {
        "author_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SnowflakeType"
          }
        },
        "message": {
          "type": "string"
        }
      },
      "required": [
        "author_ids",
        "message"
      ]
    },
    "WelcomeScreenPatchRequestPartial": {
      "type": "object",
      "properties": {
        "description": {
          "type": "object"
        },
        "welcome_channels": {
          "type": "object"
        },
        "enabled": {
          "type": "object"
        }
      }
    },
    "WidgetActivity": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "WidgetChannel": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "position": {
          "type": "number"
        }
      },
      "required": [
        "id",
        "name",
        "position"
      ]
    },
    "WidgetImageStyles": {
      "type": "object",
      "properties": {}
    },
    "WidgetMember": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "discriminator": {
          "type": "ref",
          "ref": "WidgetUserDiscriminator"
        },
        "avatar": {
          "type": "object"
        },
        "status": {
          "type": "string"
        },
        "avatar_url": {
          "type": "string"
        },
        "activity": {
          "type": "ref",
          "ref": "WidgetActivity"
        },
        "deaf": {
          "type": "boolean"
        },
        "mute": {
          "type": "boolean"
        },
        "self_deaf": {
          "type": "boolean"
        },
        "self_mute": {
          "type": "boolean"
        },
        "suppress": {
          "type": "boolean"
        },
        "channel_id": {
          "type": "ref",
          "ref": "SnowflakeType"
        }
      },
      "required": [
        "id",
        "username",
        "discriminator",
        "avatar",
        "status",
        "avatar_url"
      ]
    },
    "WidgetResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "SnowflakeType"
        },
        "name": {
          "type": "string"
        },
        "instant_invite": {
          "type": "object"
        },
        "channels": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WidgetChannel"
          }
        },
        "members": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WidgetMember"
          }
        },
        "presence_count": {
          "type": "number"
        }
      },
      "required": [
        "id",
        "name",
        "instant_invite",
        "channels",
        "members",
        "presence_count"
      ]
    },
    "WidgetSettingsResponse": {
      "type": "object",
      "properties": {
        "enabled": {
          "type": "boolean"
        },
        "channel_id": {
          "type": "object"
        }
      },
      "required": [
        "enabled",
        "channel_id"
      ]
    },
    "WidgetUserDiscriminator": {
      "type": "object",
      "properties": {}
    },
    "Error": {
      "type": "object",
      "properties": {
        "code": {
          "type": "number"
        },
        "message": {
          "type": "string"
        }
      },
      "required": [
        "code",
        "message"
      ]
    },
    "InnerErrors": {
      "type": "object",
      "properties": {
        "_errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Error"
          }
        }
      },
      "required": [
        "_errors"
      ]
    },
    "ErrorDetails": {
      "type": "object",
      "properties": {}
    },
    "ErrorResponse": {
      "type": "ref",
      "ref": "Error"
    },
    "RatelimitedResponse": {
      "type": "ref",
      "ref": "Error"
    }
  },
  "entities": {},
  "queries": {
    "get_my_application": {
      "name": "get_my_application",
      "schema": {
        "type": "ref",
        "ref": "PrivateApplicationResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/@me"
        }
      }
    },
    "get_application": {
      "name": "get_application",
      "schema": {
        "type": "ref",
        "ref": "PrivateApplicationResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          }
        }
      }
    },
    "applications_get_activity_instance": {
      "name": "applications_get_activity_instance",
      "schema": {
        "type": "ref",
        "ref": "EmbeddedActivityInstance"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "instance_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/activity-instances/{instance_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "instance_id": {
              "$resolve": "args.instance_id"
            }
          }
        }
      }
    },
    "list_application_commands": {
      "name": "list_application_commands",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "with_localizations": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/commands",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "query": {
            "with_localizations": {
              "$resolve": "args.with_localizations"
            }
          }
        }
      }
    },
    "get_application_command": {
      "name": "get_application_command",
      "schema": {
        "type": "ref",
        "ref": "ApplicationCommandResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "command_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/commands/{command_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "command_id": {
              "$resolve": "args.command_id"
            }
          }
        }
      }
    },
    "list_application_emojis": {
      "name": "list_application_emojis",
      "schema": {
        "type": "ref",
        "ref": "ListApplicationEmojisResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/emojis",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          }
        }
      }
    },
    "get_application_emoji": {
      "name": "get_application_emoji",
      "schema": {
        "type": "ref",
        "ref": "EmojiResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/emojis/{emoji_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "emoji_id": {
              "$resolve": "args.emoji_id"
            }
          }
        }
      }
    },
    "get_entitlements": {
      "name": "get_entitlements",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "EntitlementResponse"
        }
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "sku_ids": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "exclude_ended": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "exclude_deleted": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "only_active": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/entitlements",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "query": {
            "user_id": {
              "$resolve": "args.user_id"
            },
            "sku_ids": {
              "$resolve": "args.sku_ids"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "before": {
              "$resolve": "args.before"
            },
            "after": {
              "$resolve": "args.after"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "exclude_ended": {
              "$resolve": "args.exclude_ended"
            },
            "exclude_deleted": {
              "$resolve": "args.exclude_deleted"
            },
            "only_active": {
              "$resolve": "args.only_active"
            }
          }
        }
      }
    },
    "get_entitlement": {
      "name": "get_entitlement",
      "schema": {
        "type": "ref",
        "ref": "EntitlementResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "entitlement_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/entitlements/{entitlement_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "entitlement_id": {
              "$resolve": "args.entitlement_id"
            }
          }
        }
      }
    },
    "list_guild_application_commands": {
      "name": "list_guild_application_commands",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "with_localizations": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/guilds/{guild_id}/commands",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "with_localizations": {
              "$resolve": "args.with_localizations"
            }
          }
        }
      }
    },
    "list_guild_application_command_permissions": {
      "name": "list_guild_application_command_permissions",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "CommandPermissionsResponse"
        }
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/guilds/{guild_id}/commands/permissions",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_application_command": {
      "name": "get_guild_application_command",
      "schema": {
        "type": "ref",
        "ref": "ApplicationCommandResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "command_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "command_id": {
              "$resolve": "args.command_id"
            }
          }
        }
      }
    },
    "get_guild_application_command_permissions": {
      "name": "get_guild_application_command_permissions",
      "schema": {
        "type": "ref",
        "ref": "CommandPermissionsResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "command_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "command_id": {
              "$resolve": "args.command_id"
            }
          }
        }
      }
    },
    "get_application_role_connections_metadata": {
      "name": "get_application_role_connections_metadata",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/applications/{application_id}/role-connections/metadata",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          }
        }
      }
    },
    "get_channel": {
      "name": "get_channel",
      "schema": {
        "type": "ref",
        "ref": "GuildChannelResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "list_channel_invites": {
      "name": "list_channel_invites",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/invites",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "list_messages": {
      "name": "list_messages",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "around": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/messages",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "query": {
            "around": {
              "$resolve": "args.around"
            },
            "before": {
              "$resolve": "args.before"
            },
            "after": {
              "$resolve": "args.after"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "list_pins": {
      "name": "list_pins",
      "schema": {
        "type": "ref",
        "ref": "PinnedMessagesResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/messages/pins",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "query": {
            "before": {
              "$resolve": "args.before"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "get_message": {
      "name": "get_message",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/messages/{message_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          }
        }
      }
    },
    "list_message_reactions_by_emoji": {
      "name": "list_message_reactions_by_emoji",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "UserResponse"
        }
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "type": {
          "schema": {
            "type": "ref",
            "ref": "ReactionTypes"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            },
            "emoji_name": {
              "$resolve": "args.emoji_name"
            }
          },
          "query": {
            "after": {
              "$resolve": "args.after"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "type": {
              "$resolve": "args.type"
            }
          }
        }
      }
    },
    "deprecated_list_pins": {
      "name": "deprecated_list_pins",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/pins",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "get_answer_voters": {
      "name": "get_answer_voters",
      "schema": {
        "type": "ref",
        "ref": "PollAnswerDetailsResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "answer_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/polls/{message_id}/answers/{answer_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            },
            "answer_id": {
              "$resolve": "args.answer_id"
            }
          },
          "query": {
            "after": {
              "$resolve": "args.after"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "list_thread_members": {
      "name": "list_thread_members",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "ThreadMemberResponse"
        }
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "with_member": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/thread-members",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "query": {
            "with_member": {
              "$resolve": "args.with_member"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "after": {
              "$resolve": "args.after"
            }
          }
        }
      }
    },
    "get_thread_member": {
      "name": "get_thread_member",
      "schema": {
        "type": "ref",
        "ref": "ThreadMemberResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "with_member": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/thread-members/{user_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          },
          "query": {
            "with_member": {
              "$resolve": "args.with_member"
            }
          }
        }
      }
    },
    "list_private_archived_threads": {
      "name": "list_private_archived_threads",
      "schema": {
        "type": "ref",
        "ref": "ThreadsResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/threads/archived/private",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "query": {
            "before": {
              "$resolve": "args.before"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "list_public_archived_threads": {
      "name": "list_public_archived_threads",
      "schema": {
        "type": "ref",
        "ref": "ThreadsResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/threads/archived/public",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "query": {
            "before": {
              "$resolve": "args.before"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "thread_search": {
      "name": "thread_search",
      "schema": {
        "type": "ref",
        "ref": "ThreadSearchResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "slop": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "max_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "tag": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "tag_setting": {
          "schema": {
            "type": "ref",
            "ref": "ThreadSearchTagSetting"
          },
          "required": false
        },
        "archived": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "sort_by": {
          "schema": {
            "type": "ref",
            "ref": "ThreadSortingMode"
          },
          "required": false
        },
        "sort_order": {
          "schema": {
            "type": "ref",
            "ref": "SortingOrder"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "offset": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/threads/search",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "query": {
            "name": {
              "$resolve": "args.name"
            },
            "slop": {
              "$resolve": "args.slop"
            },
            "min_id": {
              "$resolve": "args.min_id"
            },
            "max_id": {
              "$resolve": "args.max_id"
            },
            "tag": {
              "$resolve": "args.tag"
            },
            "tag_setting": {
              "$resolve": "args.tag_setting"
            },
            "archived": {
              "$resolve": "args.archived"
            },
            "sort_by": {
              "$resolve": "args.sort_by"
            },
            "sort_order": {
              "$resolve": "args.sort_order"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "offset": {
              "$resolve": "args.offset"
            }
          }
        }
      }
    },
    "list_my_private_archived_threads": {
      "name": "list_my_private_archived_threads",
      "schema": {
        "type": "ref",
        "ref": "ThreadsResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "before": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/users/@me/threads/archived/private",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "query": {
            "before": {
              "$resolve": "args.before"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "list_channel_webhooks": {
      "name": "list_channel_webhooks",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/channels/{channel_id}/webhooks",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "get_gateway": {
      "name": "get_gateway",
      "schema": {
        "type": "ref",
        "ref": "GatewayResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/gateway"
        }
      }
    },
    "get_bot_gateway": {
      "name": "get_bot_gateway",
      "schema": {
        "type": "ref",
        "ref": "GatewayBotResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/gateway/bot"
        }
      }
    },
    "get_guild_template": {
      "name": "get_guild_template",
      "schema": {
        "type": "ref",
        "ref": "GuildTemplateResponse"
      },
      "args": {
        "code": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/templates/{code}",
          "params": {
            "code": {
              "$resolve": "args.code"
            }
          }
        }
      }
    },
    "get_guild": {
      "name": "get_guild",
      "schema": {
        "type": "ref",
        "ref": "GuildWithCountsResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "with_counts": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "with_counts": {
              "$resolve": "args.with_counts"
            }
          }
        }
      }
    },
    "list_guild_audit_log_entries": {
      "name": "list_guild_audit_log_entries",
      "schema": {
        "type": "ref",
        "ref": "GuildAuditLogResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "target_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "action_type": {
          "schema": {
            "type": "ref",
            "ref": "AuditLogActionTypes"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/audit-logs",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "user_id": {
              "$resolve": "args.user_id"
            },
            "target_id": {
              "$resolve": "args.target_id"
            },
            "action_type": {
              "$resolve": "args.action_type"
            },
            "before": {
              "$resolve": "args.before"
            },
            "after": {
              "$resolve": "args.after"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "list_auto_moderation_rules": {
      "name": "list_auto_moderation_rules",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/auto-moderation/rules",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_auto_moderation_rule": {
      "name": "get_auto_moderation_rule",
      "schema": {
        "type": "ref",
        "ref": "DefaultKeywordRuleResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "rule_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "rule_id": {
              "$resolve": "args.rule_id"
            }
          }
        }
      }
    },
    "list_guild_bans": {
      "name": "list_guild_bans",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/bans",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "before": {
              "$resolve": "args.before"
            },
            "after": {
              "$resolve": "args.after"
            }
          }
        }
      }
    },
    "get_guild_ban": {
      "name": "get_guild_ban",
      "schema": {
        "type": "ref",
        "ref": "GuildBanResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/bans/{user_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "list_guild_channels": {
      "name": "list_guild_channels",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/channels",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "list_guild_emojis": {
      "name": "list_guild_emojis",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/emojis",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_emoji": {
      "name": "get_guild_emoji",
      "schema": {
        "type": "ref",
        "ref": "EmojiResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/emojis/{emoji_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "emoji_id": {
              "$resolve": "args.emoji_id"
            }
          }
        }
      }
    },
    "list_guild_integrations": {
      "name": "list_guild_integrations",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/integrations",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "list_guild_invites": {
      "name": "list_guild_invites",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/invites",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "list_guild_members": {
      "name": "list_guild_members",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "GuildMemberResponse"
        }
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/members",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "after": {
              "$resolve": "args.after"
            }
          }
        }
      }
    },
    "search_guild_members": {
      "name": "search_guild_members",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "GuildMemberResponse"
        }
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "query": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/members/search",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "query": {
              "$resolve": "args.query"
            }
          }
        }
      }
    },
    "get_guild_member": {
      "name": "get_guild_member",
      "schema": {
        "type": "ref",
        "ref": "GuildMemberResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/members/{user_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "guild_search": {
      "name": "guild_search",
      "schema": {
        "type": "ref",
        "ref": "GuildSearchResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "sort_by": {
          "schema": {
            "type": "ref",
            "ref": "SortingMode"
          },
          "required": false
        },
        "sort_order": {
          "schema": {
            "type": "ref",
            "ref": "SortingOrder"
          },
          "required": false
        },
        "content": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "slop": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "author_id": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SnowflakeType"
            }
          },
          "required": false
        },
        "author_type": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "AuthorType"
            }
          },
          "required": false
        },
        "mentions": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SnowflakeType"
            }
          },
          "required": false
        },
        "mentions_role_id": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SnowflakeType"
            }
          },
          "required": false
        },
        "replied_to_user_id": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SnowflakeType"
            }
          },
          "required": false
        },
        "replied_to_message_id": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SnowflakeType"
            }
          },
          "required": false
        },
        "mention_everyone": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "min_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "max_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "offset": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "has": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "HasOption"
            }
          },
          "required": false
        },
        "link_hostname": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
        "embed_provider": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
        "embed_type": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SearchableEmbedType"
            }
          },
          "required": false
        },
        "attachment_extension": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
        "attachment_filename": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
        "pinned": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "include_nsfw": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "channel_id": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SnowflakeType"
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/messages/search",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "sort_by": {
              "$resolve": "args.sort_by"
            },
            "sort_order": {
              "$resolve": "args.sort_order"
            },
            "content": {
              "$resolve": "args.content"
            },
            "slop": {
              "$resolve": "args.slop"
            },
            "author_id": {
              "$resolve": "args.author_id"
            },
            "author_type": {
              "$resolve": "args.author_type"
            },
            "mentions": {
              "$resolve": "args.mentions"
            },
            "mentions_role_id": {
              "$resolve": "args.mentions_role_id"
            },
            "replied_to_user_id": {
              "$resolve": "args.replied_to_user_id"
            },
            "replied_to_message_id": {
              "$resolve": "args.replied_to_message_id"
            },
            "mention_everyone": {
              "$resolve": "args.mention_everyone"
            },
            "min_id": {
              "$resolve": "args.min_id"
            },
            "max_id": {
              "$resolve": "args.max_id"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "offset": {
              "$resolve": "args.offset"
            },
            "has": {
              "$resolve": "args.has"
            },
            "link_hostname": {
              "$resolve": "args.link_hostname"
            },
            "embed_provider": {
              "$resolve": "args.embed_provider"
            },
            "embed_type": {
              "$resolve": "args.embed_type"
            },
            "attachment_extension": {
              "$resolve": "args.attachment_extension"
            },
            "attachment_filename": {
              "$resolve": "args.attachment_filename"
            },
            "pinned": {
              "$resolve": "args.pinned"
            },
            "include_nsfw": {
              "$resolve": "args.include_nsfw"
            },
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "get_guild_new_member_welcome": {
      "name": "get_guild_new_member_welcome",
      "schema": {
        "type": "ref",
        "ref": "GuildHomeSettingsResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/new-member-welcome",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guilds_onboarding": {
      "name": "get_guilds_onboarding",
      "schema": {
        "type": "ref",
        "ref": "UserGuildOnboardingResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/onboarding",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_preview": {
      "name": "get_guild_preview",
      "schema": {
        "type": "ref",
        "ref": "GuildPreviewResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/preview",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "preview_prune_guild": {
      "name": "preview_prune_guild",
      "schema": {
        "type": "ref",
        "ref": "GuildPruneResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "days": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "include_roles": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/prune",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "days": {
              "$resolve": "args.days"
            },
            "include_roles": {
              "$resolve": "args.include_roles"
            }
          }
        }
      }
    },
    "list_guild_voice_regions": {
      "name": "list_guild_voice_regions",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/regions",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_join_requests": {
      "name": "get_guild_join_requests",
      "schema": {
        "type": "ref",
        "ref": "GuildJoinRequestsListResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "status": {
          "schema": {
            "type": "ref",
            "ref": "GuildJoinRequestApplicationStatus"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/requests",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "status": {
              "$resolve": "args.status"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "before": {
              "$resolve": "args.before"
            },
            "after": {
              "$resolve": "args.after"
            }
          }
        }
      }
    },
    "list_guild_roles": {
      "name": "list_guild_roles",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "GuildRoleResponse"
        }
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/roles",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "guild_role_member_counts": {
      "name": "guild_role_member_counts",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/roles/member-counts",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_role": {
      "name": "get_guild_role",
      "schema": {
        "type": "ref",
        "ref": "GuildRoleResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "role_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/roles/{role_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "role_id": {
              "$resolve": "args.role_id"
            }
          }
        }
      }
    },
    "list_guild_scheduled_events": {
      "name": "list_guild_scheduled_events",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "with_user_count": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/scheduled-events",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "with_user_count": {
              "$resolve": "args.with_user_count"
            }
          }
        }
      }
    },
    "get_guild_scheduled_event": {
      "name": "get_guild_scheduled_event",
      "schema": {
        "type": "ref",
        "ref": "ExternalScheduledEventResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_scheduled_event_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "with_user_count": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "guild_scheduled_event_id": {
              "$resolve": "args.guild_scheduled_event_id"
            }
          },
          "query": {
            "with_user_count": {
              "$resolve": "args.with_user_count"
            }
          }
        }
      }
    },
    "list_guild_scheduled_event_users": {
      "name": "list_guild_scheduled_event_users",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_scheduled_event_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "with_member": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "guild_scheduled_event_id": {
              "$resolve": "args.guild_scheduled_event_id"
            }
          },
          "query": {
            "with_member": {
              "$resolve": "args.with_member"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "before": {
              "$resolve": "args.before"
            },
            "after": {
              "$resolve": "args.after"
            }
          }
        }
      }
    },
    "list_guild_soundboard_sounds": {
      "name": "list_guild_soundboard_sounds",
      "schema": {
        "type": "ref",
        "ref": "ListGuildSoundboardSoundsResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/soundboard-sounds",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_soundboard_sound": {
      "name": "get_guild_soundboard_sound",
      "schema": {
        "type": "ref",
        "ref": "SoundboardSoundResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "sound_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/soundboard-sounds/{sound_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "sound_id": {
              "$resolve": "args.sound_id"
            }
          }
        }
      }
    },
    "list_guild_stickers": {
      "name": "list_guild_stickers",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "GuildStickerResponse"
        }
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/stickers",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_sticker": {
      "name": "get_guild_sticker",
      "schema": {
        "type": "ref",
        "ref": "GuildStickerResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "sticker_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/stickers/{sticker_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "sticker_id": {
              "$resolve": "args.sticker_id"
            }
          }
        }
      }
    },
    "list_guild_templates": {
      "name": "list_guild_templates",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/templates",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_active_guild_threads": {
      "name": "get_active_guild_threads",
      "schema": {
        "type": "ref",
        "ref": "ThreadsResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/threads/active",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_vanity_url": {
      "name": "get_guild_vanity_url",
      "schema": {
        "type": "ref",
        "ref": "VanityURLResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/vanity-url",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_self_voice_state": {
      "name": "get_self_voice_state",
      "schema": {
        "type": "ref",
        "ref": "VoiceStateResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/voice-states/@me",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_voice_state": {
      "name": "get_voice_state",
      "schema": {
        "type": "ref",
        "ref": "VoiceStateResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/voice-states/{user_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "get_guild_webhooks": {
      "name": "get_guild_webhooks",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/webhooks",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_welcome_screen": {
      "name": "get_guild_welcome_screen",
      "schema": {
        "type": "ref",
        "ref": "GuildWelcomeScreenResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/welcome-screen",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_widget_settings": {
      "name": "get_guild_widget_settings",
      "schema": {
        "type": "ref",
        "ref": "WidgetSettingsResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/widget",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_widget": {
      "name": "get_guild_widget",
      "schema": {
        "type": "ref",
        "ref": "WidgetResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/widget.json",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_guild_widget_png": {
      "name": "get_guild_widget_png",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "style": {
          "schema": {
            "type": "ref",
            "ref": "WidgetImageStyles"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/guilds/{guild_id}/widget.png",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "query": {
            "style": {
              "$resolve": "args.style"
            }
          }
        }
      }
    },
    "invite_resolve": {
      "name": "invite_resolve",
      "schema": {
        "type": "ref",
        "ref": "FriendInviteResponse"
      },
      "args": {
        "code": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "with_counts": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "guild_scheduled_event_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/invites/{code}",
          "params": {
            "code": {
              "$resolve": "args.code"
            }
          },
          "query": {
            "with_counts": {
              "$resolve": "args.with_counts"
            },
            "guild_scheduled_event_id": {
              "$resolve": "args.guild_scheduled_event_id"
            }
          }
        }
      }
    },
    "get_invite_target_users": {
      "name": "get_invite_target_users",
      "schema": {
        "type": "object"
      },
      "args": {
        "code": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/invites/{code}/target-users",
          "params": {
            "code": {
              "$resolve": "args.code"
            }
          }
        }
      }
    },
    "get_invite_target_users_job_status": {
      "name": "get_invite_target_users_job_status",
      "schema": {
        "type": "ref",
        "ref": "TargetUsersJobStatusResponse"
      },
      "args": {
        "code": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/invites/{code}/target-users/job-status",
          "params": {
            "code": {
              "$resolve": "args.code"
            }
          }
        }
      }
    },
    "get_lobby": {
      "name": "get_lobby",
      "schema": {
        "type": "ref",
        "ref": "LobbyResponse"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/lobbies/{lobby_id}",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            }
          }
        }
      }
    },
    "get_lobby_messages": {
      "name": "get_lobby_messages",
      "schema": {
        "type": "object"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/lobbies/{lobby_id}/messages",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            }
          },
          "query": {
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "get_my_oauth2_authorization": {
      "name": "get_my_oauth2_authorization",
      "schema": {
        "type": "ref",
        "ref": "OAuth2GetAuthorizationResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/oauth2/@me"
        }
      }
    },
    "get_my_oauth2_application": {
      "name": "get_my_oauth2_application",
      "schema": {
        "type": "ref",
        "ref": "PrivateApplicationResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/oauth2/applications/@me"
        }
      }
    },
    "get_public_keys": {
      "name": "get_public_keys",
      "schema": {
        "type": "ref",
        "ref": "OAuth2GetKeys"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/oauth2/keys"
        }
      }
    },
    "get_openid_connect_userinfo": {
      "name": "get_openid_connect_userinfo",
      "schema": {
        "type": "ref",
        "ref": "OAuth2GetOpenIDConnectUserInfoResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/oauth2/userinfo"
        }
      }
    },
    "get_soundboard_default_sounds": {
      "name": "get_soundboard_default_sounds",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "SoundboardSoundResponse"
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/soundboard-default-sounds"
        }
      }
    },
    "get_stage_instance": {
      "name": "get_stage_instance",
      "schema": {
        "type": "ref",
        "ref": "StageInstanceResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/stage-instances/{channel_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "list_sticker_packs": {
      "name": "list_sticker_packs",
      "schema": {
        "type": "ref",
        "ref": "StickerPackCollectionResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/sticker-packs"
        }
      }
    },
    "get_sticker_pack": {
      "name": "get_sticker_pack",
      "schema": {
        "type": "ref",
        "ref": "StickerPackResponse"
      },
      "args": {
        "pack_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/sticker-packs/{pack_id}",
          "params": {
            "pack_id": {
              "$resolve": "args.pack_id"
            }
          }
        }
      }
    },
    "get_sticker": {
      "name": "get_sticker",
      "schema": {
        "type": "ref",
        "ref": "GuildStickerResponse"
      },
      "args": {
        "sticker_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/stickers/{sticker_id}",
          "params": {
            "sticker_id": {
              "$resolve": "args.sticker_id"
            }
          }
        }
      }
    },
    "get_my_user": {
      "name": "get_my_user",
      "schema": {
        "type": "ref",
        "ref": "UserPIIResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/@me"
        }
      }
    },
    "get_current_user_application_entitlements": {
      "name": "get_current_user_application_entitlements",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "EntitlementResponse"
        }
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "sku_ids": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "exclude_consumed": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/@me/applications/{application_id}/entitlements",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "query": {
            "sku_ids": {
              "$resolve": "args.sku_ids"
            },
            "exclude_consumed": {
              "$resolve": "args.exclude_consumed"
            }
          }
        }
      }
    },
    "get_application_user_role_connection": {
      "name": "get_application_user_role_connection",
      "schema": {
        "type": "ref",
        "ref": "ApplicationUserRoleConnectionResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/@me/applications/{application_id}/role-connection",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          }
        }
      }
    },
    "list_my_connections": {
      "name": "list_my_connections",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/@me/connections"
        }
      }
    },
    "list_my_guilds": {
      "name": "list_my_guilds",
      "schema": {
        "type": "object"
      },
      "args": {
        "before": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "with_counts": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/@me/guilds",
          "query": {
            "before": {
              "$resolve": "args.before"
            },
            "after": {
              "$resolve": "args.after"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "with_counts": {
              "$resolve": "args.with_counts"
            }
          }
        }
      }
    },
    "get_my_guild_member": {
      "name": "get_my_guild_member",
      "schema": {
        "type": "ref",
        "ref": "PrivateGuildMemberResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/@me/guilds/{guild_id}/member",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "get_user": {
      "name": "get_user",
      "schema": {
        "type": "ref",
        "ref": "UserResponse"
      },
      "args": {
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/{user_id}",
          "params": {
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "list_voice_regions": {
      "name": "list_voice_regions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/voice/regions"
        }
      }
    },
    "get_webhook": {
      "name": "get_webhook",
      "schema": {
        "type": "ref",
        "ref": "ApplicationIncomingWebhookResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "get_webhook_by_token": {
      "name": "get_webhook_by_token",
      "schema": {
        "type": "ref",
        "ref": "ApplicationIncomingWebhookResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/webhooks/{webhook_id}/{webhook_token}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            }
          }
        }
      }
    },
    "get_original_webhook_message": {
      "name": "get_original_webhook_message",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "thread_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/webhooks/{webhook_id}/{webhook_token}/messages/@original",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            }
          },
          "query": {
            "thread_id": {
              "$resolve": "args.thread_id"
            }
          }
        }
      }
    },
    "get_webhook_message": {
      "name": "get_webhook_message",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "thread_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          },
          "query": {
            "thread_id": {
              "$resolve": "args.thread_id"
            }
          }
        }
      }
    }
  },
  "actions": {
    "update_my_application": {
      "name": "update_my_application",
      "schema": {
        "type": "ref",
        "ref": "PrivateApplicationResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ApplicationFormPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/applications/@me",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_application": {
      "name": "update_application",
      "schema": {
        "type": "ref",
        "ref": "PrivateApplicationResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ApplicationFormPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/applications/{application_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "upload_application_attachment": {
      "name": "upload_application_attachment",
      "schema": {
        "type": "ref",
        "ref": "ActivitiesAttachmentResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/applications/{application_id}/attachment",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          }
        }
      }
    },
    "bulk_set_application_commands": {
      "name": "bulk_set_application_commands",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/applications/{application_id}/commands",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_application_command": {
      "name": "create_application_command",
      "schema": {
        "type": "ref",
        "ref": "ApplicationCommandResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ApplicationCommandCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/applications/{application_id}/commands",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_application_command": {
      "name": "delete_application_command",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "command_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/applications/{application_id}/commands/{command_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "command_id": {
              "$resolve": "args.command_id"
            }
          }
        }
      }
    },
    "update_application_command": {
      "name": "update_application_command",
      "schema": {
        "type": "ref",
        "ref": "ApplicationCommandResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "command_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ApplicationCommandPatchRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/applications/{application_id}/commands/{command_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "command_id": {
              "$resolve": "args.command_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_application_emoji": {
      "name": "create_application_emoji",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "image": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "image"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/applications/{application_id}/emojis",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_application_emoji": {
      "name": "delete_application_emoji",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/applications/{application_id}/emojis/{emoji_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "emoji_id": {
              "$resolve": "args.emoji_id"
            }
          }
        }
      }
    },
    "update_application_emoji": {
      "name": "update_application_emoji",
      "schema": {
        "type": "ref",
        "ref": "EmojiResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/applications/{application_id}/emojis/{emoji_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "emoji_id": {
              "$resolve": "args.emoji_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_entitlement": {
      "name": "create_entitlement",
      "schema": {
        "type": "ref",
        "ref": "EntitlementResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateEntitlementRequestData"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/applications/{application_id}/entitlements",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_entitlement": {
      "name": "delete_entitlement",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "entitlement_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/applications/{application_id}/entitlements/{entitlement_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "entitlement_id": {
              "$resolve": "args.entitlement_id"
            }
          }
        }
      }
    },
    "consume_entitlement": {
      "name": "consume_entitlement",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "entitlement_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/applications/{application_id}/entitlements/{entitlement_id}/consume",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "entitlement_id": {
              "$resolve": "args.entitlement_id"
            }
          }
        }
      }
    },
    "bulk_set_guild_application_commands": {
      "name": "bulk_set_guild_application_commands",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/applications/{application_id}/guilds/{guild_id}/commands",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_guild_application_command": {
      "name": "create_guild_application_command",
      "schema": {
        "type": "ref",
        "ref": "ApplicationCommandResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ApplicationCommandCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/applications/{application_id}/guilds/{guild_id}/commands",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_guild_application_command": {
      "name": "delete_guild_application_command",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "command_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "command_id": {
              "$resolve": "args.command_id"
            }
          }
        }
      }
    },
    "update_guild_application_command": {
      "name": "update_guild_application_command",
      "schema": {
        "type": "ref",
        "ref": "ApplicationCommandResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "command_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ApplicationCommandPatchRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "command_id": {
              "$resolve": "args.command_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "set_guild_application_command_permissions": {
      "name": "set_guild_application_command_permissions",
      "schema": {
        "type": "ref",
        "ref": "CommandPermissionsResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "command_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "permissions": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            },
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "command_id": {
              "$resolve": "args.command_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_application_role_connections_metadata": {
      "name": "update_application_role_connections_metadata",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/applications/{application_id}/role-connections/metadata",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_channel": {
      "name": "delete_channel",
      "schema": {
        "type": "ref",
        "ref": "GuildChannelResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "update_channel": {
      "name": "update_channel",
      "schema": {
        "type": "ref",
        "ref": "GuildChannelResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateDMRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/channels/{channel_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "follow_channel": {
      "name": "follow_channel",
      "schema": {
        "type": "ref",
        "ref": "ChannelFollowerResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "webhook_channel_id": {
                "type": "ref",
                "ref": "SnowflakeType"
              }
            },
            "required": [
              "webhook_channel_id"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/followers",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_channel_invite": {
      "name": "create_channel_invite",
      "schema": {
        "type": "ref",
        "ref": "FriendInviteResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateGroupDMInviteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/invites",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_message": {
      "name": "create_message",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessageCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/messages",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bulk_delete_messages": {
      "name": "bulk_delete_messages",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "messages": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "SnowflakeType"
                }
              }
            },
            "required": [
              "messages"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/messages/bulk-delete",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_pin": {
      "name": "create_pin",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/channels/{channel_id}/messages/pins/{message_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          }
        }
      }
    },
    "delete_pin": {
      "name": "delete_pin",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/messages/pins/{message_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          }
        }
      }
    },
    "delete_message": {
      "name": "delete_message",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/messages/{message_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          }
        }
      }
    },
    "update_message": {
      "name": "update_message",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessageEditRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/channels/{channel_id}/messages/{message_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "crosspost_message": {
      "name": "crosspost_message",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/messages/{message_id}/crosspost",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          }
        }
      }
    },
    "delete_all_message_reactions": {
      "name": "delete_all_message_reactions",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/messages/{message_id}/reactions",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          }
        }
      }
    },
    "delete_all_message_reactions_by_emoji": {
      "name": "delete_all_message_reactions_by_emoji",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_name": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            },
            "emoji_name": {
              "$resolve": "args.emoji_name"
            }
          }
        }
      }
    },
    "add_my_message_reaction": {
      "name": "add_my_message_reaction",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_name": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            },
            "emoji_name": {
              "$resolve": "args.emoji_name"
            }
          }
        }
      }
    },
    "delete_my_message_reaction": {
      "name": "delete_my_message_reaction",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_name": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            },
            "emoji_name": {
              "$resolve": "args.emoji_name"
            }
          }
        }
      }
    },
    "delete_user_message_reaction": {
      "name": "delete_user_message_reaction",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            },
            "emoji_name": {
              "$resolve": "args.emoji_name"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "create_thread_from_message": {
      "name": "create_thread_from_message",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateTextThreadWithMessageRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/messages/{message_id}/threads",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "set_channel_permission_overwrite": {
      "name": "set_channel_permission_overwrite",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "overwrite_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "type": {
                "type": "object"
              },
              "allow": {
                "type": "object"
              },
              "deny": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/channels/{channel_id}/permissions/{overwrite_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "overwrite_id": {
              "$resolve": "args.overwrite_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_channel_permission_overwrite": {
      "name": "delete_channel_permission_overwrite",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "overwrite_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/permissions/{overwrite_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "overwrite_id": {
              "$resolve": "args.overwrite_id"
            }
          }
        }
      }
    },
    "deprecated_create_pin": {
      "name": "deprecated_create_pin",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/channels/{channel_id}/pins/{message_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          }
        }
      }
    },
    "deprecated_delete_pin": {
      "name": "deprecated_delete_pin",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/pins/{message_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          }
        }
      }
    },
    "poll_expire": {
      "name": "poll_expire",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/polls/{message_id}/expire",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          }
        }
      }
    },
    "add_group_dm_user": {
      "name": "add_group_dm_user",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "access_token": {
                "type": "object"
              },
              "nick": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/channels/{channel_id}/recipients/{user_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_group_dm_user": {
      "name": "delete_group_dm_user",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/recipients/{user_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "send_soundboard_sound": {
      "name": "send_soundboard_sound",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SoundboardSoundSendRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/send-soundboard-sound",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "join_thread": {
      "name": "join_thread",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/channels/{channel_id}/thread-members/@me",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "leave_thread": {
      "name": "leave_thread",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/thread-members/@me",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "add_thread_member": {
      "name": "add_thread_member",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/channels/{channel_id}/thread-members/{user_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "delete_thread_member": {
      "name": "delete_thread_member",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel_id}/thread-members/{user_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "create_thread": {
      "name": "create_thread",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateForumThreadRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/threads",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "trigger_typing_indicator": {
      "name": "trigger_typing_indicator",
      "schema": {
        "type": "ref",
        "ref": "TypingIndicatorResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/typing",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "update_voice_channel_status": {
      "name": "update_voice_channel_status",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "status": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/channels/{channel_id}/voice-status",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_webhook": {
      "name": "create_webhook",
      "schema": {
        "type": "ref",
        "ref": "GuildIncomingWebhookResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "avatar": {
                "type": "object"
              }
            },
            "required": [
              "name"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/{channel_id}/webhooks",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_guild": {
      "name": "update_guild",
      "schema": {
        "type": "ref",
        "ref": "GuildResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "GuildPatchRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_auto_moderation_rule": {
      "name": "create_auto_moderation_rule",
      "schema": {
        "type": "ref",
        "ref": "DefaultKeywordRuleResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "DefaultKeywordListUpsertRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/auto-moderation/rules",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_auto_moderation_rule": {
      "name": "delete_auto_moderation_rule",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "rule_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "rule_id": {
              "$resolve": "args.rule_id"
            }
          }
        }
      }
    },
    "update_auto_moderation_rule": {
      "name": "update_auto_moderation_rule",
      "schema": {
        "type": "ref",
        "ref": "DefaultKeywordRuleResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "rule_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "DefaultKeywordListUpsertRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "rule_id": {
              "$resolve": "args.rule_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ban_user_from_guild": {
      "name": "ban_user_from_guild",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BanUserFromGuildRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/guilds/{guild_id}/bans/{user_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "unban_user_from_guild": {
      "name": "unban_user_from_guild",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UnbanUserFromGuildRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/bans/{user_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bulk_ban_users_from_guild": {
      "name": "bulk_ban_users_from_guild",
      "schema": {
        "type": "ref",
        "ref": "BulkBanUsersResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BulkBanUsersRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/bulk-ban",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_guild_channel": {
      "name": "create_guild_channel",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateGuildChannelRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/channels",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bulk_update_guild_channels": {
      "name": "bulk_update_guild_channels",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "object"
                },
                "position": {
                  "type": "object"
                },
                "parent_id": {
                  "type": "object"
                },
                "lock_permissions": {
                  "type": "object"
                }
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/channels",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_guild_emoji": {
      "name": "create_guild_emoji",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "image": {
                "type": "string"
              },
              "roles": {
                "type": "object"
              }
            },
            "required": [
              "name",
              "image"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/emojis",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_guild_emoji": {
      "name": "delete_guild_emoji",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/emojis/{emoji_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "emoji_id": {
              "$resolve": "args.emoji_id"
            }
          }
        }
      }
    },
    "update_guild_emoji": {
      "name": "update_guild_emoji",
      "schema": {
        "type": "ref",
        "ref": "EmojiResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "emoji_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "roles": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/emojis/{emoji_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "emoji_id": {
              "$resolve": "args.emoji_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_guild_integration": {
      "name": "delete_guild_integration",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "integration_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/integrations/{integration_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "integration_id": {
              "$resolve": "args.integration_id"
            }
          }
        }
      }
    },
    "update_my_guild_member": {
      "name": "update_my_guild_member",
      "schema": {
        "type": "ref",
        "ref": "PrivateGuildMemberResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "nick": {
                "type": "object"
              },
              "avatar": {
                "type": "object"
              },
              "bio": {
                "type": "object"
              },
              "banner": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/members/@me",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "add_guild_member": {
      "name": "add_guild_member",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BotAddGuildMemberRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/guilds/{guild_id}/members/{user_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_guild_member": {
      "name": "delete_guild_member",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/members/{user_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "update_guild_member": {
      "name": "update_guild_member",
      "schema": {
        "type": "ref",
        "ref": "GuildMemberResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "nick": {
                "type": "object"
              },
              "roles": {
                "type": "object"
              },
              "mute": {
                "type": "object"
              },
              "deaf": {
                "type": "object"
              },
              "channel_id": {
                "type": "object"
              },
              "communication_disabled_until": {
                "type": "object"
              },
              "flags": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/members/{user_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "add_guild_member_role": {
      "name": "add_guild_member_role",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "role_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/guilds/{guild_id}/members/{user_id}/roles/{role_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            },
            "role_id": {
              "$resolve": "args.role_id"
            }
          }
        }
      }
    },
    "delete_guild_member_role": {
      "name": "delete_guild_member_role",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "role_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/members/{user_id}/roles/{role_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            },
            "role_id": {
              "$resolve": "args.role_id"
            }
          }
        }
      }
    },
    "put_guilds_onboarding": {
      "name": "put_guilds_onboarding",
      "schema": {
        "type": "ref",
        "ref": "GuildOnboardingResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateGuildOnboardingRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/guilds/{guild_id}/onboarding",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "prune_guild": {
      "name": "prune_guild",
      "schema": {
        "type": "ref",
        "ref": "GuildPruneResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PruneGuildRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/prune",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "action_guild_join_request": {
      "name": "action_guild_join_request",
      "schema": {
        "type": "ref",
        "ref": "GuildJoinRequestResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "request_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "action": {
                "type": "ref",
                "ref": "GuildJoinRequestApplicationStatus"
              },
              "rejection_reason": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/requests/{request_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "request_id": {
              "$resolve": "args.request_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_guild_role": {
      "name": "create_guild_role",
      "schema": {
        "type": "ref",
        "ref": "GuildRoleResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateRoleRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/roles",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bulk_update_guild_roles": {
      "name": "bulk_update_guild_roles",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "GuildRoleResponse"
        }
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "UpdateRolePositionsRequest"
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/roles",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_guild_role": {
      "name": "delete_guild_role",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "role_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/roles/{role_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "role_id": {
              "$resolve": "args.role_id"
            }
          }
        }
      }
    },
    "update_guild_role": {
      "name": "update_guild_role",
      "schema": {
        "type": "ref",
        "ref": "GuildRoleResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "role_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateRoleRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/roles/{role_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "role_id": {
              "$resolve": "args.role_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_guild_scheduled_event": {
      "name": "create_guild_scheduled_event",
      "schema": {
        "type": "ref",
        "ref": "ExternalScheduledEventResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ExternalScheduledEventCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/scheduled-events",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_guild_scheduled_event": {
      "name": "delete_guild_scheduled_event",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_scheduled_event_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "guild_scheduled_event_id": {
              "$resolve": "args.guild_scheduled_event_id"
            }
          }
        }
      }
    },
    "update_guild_scheduled_event": {
      "name": "update_guild_scheduled_event",
      "schema": {
        "type": "ref",
        "ref": "ExternalScheduledEventResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "guild_scheduled_event_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ExternalScheduledEventPatchRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "guild_scheduled_event_id": {
              "$resolve": "args.guild_scheduled_event_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_guild_soundboard_sound": {
      "name": "create_guild_soundboard_sound",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SoundboardCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/soundboard-sounds",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_guild_soundboard_sound": {
      "name": "delete_guild_soundboard_sound",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "sound_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/soundboard-sounds/{sound_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "sound_id": {
              "$resolve": "args.sound_id"
            }
          }
        }
      }
    },
    "update_guild_soundboard_sound": {
      "name": "update_guild_soundboard_sound",
      "schema": {
        "type": "ref",
        "ref": "SoundboardSoundResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "sound_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SoundboardPatchRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/soundboard-sounds/{sound_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "sound_id": {
              "$resolve": "args.sound_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_guild_sticker": {
      "name": "create_guild_sticker",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/stickers",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "delete_guild_sticker": {
      "name": "delete_guild_sticker",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "sticker_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/stickers/{sticker_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "sticker_id": {
              "$resolve": "args.sticker_id"
            }
          }
        }
      }
    },
    "update_guild_sticker": {
      "name": "update_guild_sticker",
      "schema": {
        "type": "ref",
        "ref": "GuildStickerResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "sticker_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "tags": {
                "type": "string"
              },
              "description": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/stickers/{sticker_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "sticker_id": {
              "$resolve": "args.sticker_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_guild_template": {
      "name": "create_guild_template",
      "schema": {
        "type": "ref",
        "ref": "GuildTemplateResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "object"
              }
            },
            "required": [
              "name"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/guilds/{guild_id}/templates",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sync_guild_template": {
      "name": "sync_guild_template",
      "schema": {
        "type": "ref",
        "ref": "GuildTemplateResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "code": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/guilds/{guild_id}/templates/{code}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "code": {
              "$resolve": "args.code"
            }
          }
        }
      }
    },
    "delete_guild_template": {
      "name": "delete_guild_template",
      "schema": {
        "type": "ref",
        "ref": "GuildTemplateResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "code": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/guilds/{guild_id}/templates/{code}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "code": {
              "$resolve": "args.code"
            }
          }
        }
      }
    },
    "update_guild_template": {
      "name": "update_guild_template",
      "schema": {
        "type": "ref",
        "ref": "GuildTemplateResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "code": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/templates/{code}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "code": {
              "$resolve": "args.code"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_self_voice_state": {
      "name": "update_self_voice_state",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateSelfVoiceStateRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/voice-states/@me",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_voice_state": {
      "name": "update_voice_state",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateVoiceStateRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/voice-states/{user_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_guild_welcome_screen": {
      "name": "update_guild_welcome_screen",
      "schema": {
        "type": "ref",
        "ref": "GuildWelcomeScreenResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WelcomeScreenPatchRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/welcome-screen",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_guild_widget_settings": {
      "name": "update_guild_widget_settings",
      "schema": {
        "type": "ref",
        "ref": "WidgetSettingsResponse"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "channel_id": {
                "type": "object"
              },
              "enabled": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/guilds/{guild_id}/widget",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_interaction_response": {
      "name": "create_interaction_response",
      "schema": {
        "type": "ref",
        "ref": "InteractionCallbackResponse"
      },
      "args": {
        "interaction_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "interaction_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "with_response": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ApplicationCommandAutocompleteCallbackRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/interactions/{interaction_id}/{interaction_token}/callback",
          "params": {
            "interaction_id": {
              "$resolve": "args.interaction_id"
            },
            "interaction_token": {
              "$resolve": "args.interaction_token"
            }
          },
          "query": {
            "with_response": {
              "$resolve": "args.with_response"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "invite_revoke": {
      "name": "invite_revoke",
      "schema": {
        "type": "ref",
        "ref": "FriendInviteResponse"
      },
      "args": {
        "code": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/invites/{code}",
          "params": {
            "code": {
              "$resolve": "args.code"
            }
          }
        }
      }
    },
    "update_invite_target_users": {
      "name": "update_invite_target_users",
      "schema": {
        "type": "object"
      },
      "args": {
        "code": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/invites/{code}/target-users",
          "params": {
            "code": {
              "$resolve": "args.code"
            }
          }
        }
      }
    },
    "create_or_join_lobby": {
      "name": "create_or_join_lobby",
      "schema": {
        "type": "ref",
        "ref": "LobbyResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "idle_timeout_seconds": {
                "type": "object"
              },
              "lobby_metadata": {
                "type": "object"
              },
              "member_metadata": {
                "type": "object"
              },
              "secret": {
                "type": "string"
              },
              "flags": {
                "type": "object"
              }
            },
            "required": [
              "secret"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/lobbies",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_lobby": {
      "name": "create_lobby",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "idle_timeout_seconds": {
                "type": "object"
              },
              "members": {
                "type": "object"
              },
              "metadata": {
                "type": "object"
              },
              "flags": {
                "type": "object"
              },
              "override_event_webhooks_url": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/lobbies",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "edit_lobby": {
      "name": "edit_lobby",
      "schema": {
        "type": "ref",
        "ref": "LobbyResponse"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "idle_timeout_seconds": {
                "type": "object"
              },
              "metadata": {
                "type": "object"
              },
              "members": {
                "type": "object"
              },
              "flags": {
                "type": "object"
              },
              "override_event_webhooks_url": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/lobbies/{lobby_id}",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "edit_lobby_channel_link": {
      "name": "edit_lobby_channel_link",
      "schema": {
        "type": "ref",
        "ref": "LobbyResponse"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "channel_id": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/lobbies/{lobby_id}/channel-linking",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "leave_lobby": {
      "name": "leave_lobby",
      "schema": {
        "type": "object"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/lobbies/{lobby_id}/members/@me",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            }
          }
        }
      }
    },
    "create_linked_lobby_guild_invite_for_self": {
      "name": "create_linked_lobby_guild_invite_for_self",
      "schema": {
        "type": "ref",
        "ref": "LobbyGuildInviteResponse"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/lobbies/{lobby_id}/members/@me/invites",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            }
          }
        }
      }
    },
    "bulk_update_lobby_members": {
      "name": "bulk_update_lobby_members",
      "schema": {
        "type": "object"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/lobbies/{lobby_id}/members/bulk",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "add_lobby_member": {
      "name": "add_lobby_member",
      "schema": {
        "type": "ref",
        "ref": "LobbyMemberResponse"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "metadata": {
                "type": "object"
              },
              "flags": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/lobbies/{lobby_id}/members/{user_id}",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_lobby_member": {
      "name": "delete_lobby_member",
      "schema": {
        "type": "object"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/lobbies/{lobby_id}/members/{user_id}",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "create_linked_lobby_guild_invite_for_user": {
      "name": "create_linked_lobby_guild_invite_for_user",
      "schema": {
        "type": "ref",
        "ref": "LobbyGuildInviteResponse"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/lobbies/{lobby_id}/members/{user_id}/invites",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "create_lobby_message": {
      "name": "create_lobby_message",
      "schema": {
        "type": "object"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SDKMessageRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/lobbies/{lobby_id}/messages",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_lobby_message_external_moderation_metadata": {
      "name": "update_lobby_message_external_moderation_metadata",
      "schema": {
        "type": "object"
      },
      "args": {
        "lobby_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {}
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/lobbies/{lobby_id}/messages/{message_id}/moderation-metadata",
          "params": {
            "lobby_id": {
              "$resolve": "args.lobby_id"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_user_message_external_moderation_metadata": {
      "name": "update_user_message_external_moderation_metadata",
      "schema": {
        "type": "object"
      },
      "args": {
        "user_id_1": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "user_id_2": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {}
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/partner-sdk/dms/{user_id_1}/{user_id_2}/messages/{message_id}/moderation-metadata",
          "params": {
            "user_id_1": {
              "$resolve": "args.user_id_1"
            },
            "user_id_2": {
              "$resolve": "args.user_id_2"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "partner_sdk_unmerge_provisional_account": {
      "name": "partner_sdk_unmerge_provisional_account",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "client_id": {
                "type": "ref",
                "ref": "SnowflakeType"
              },
              "client_secret": {
                "type": "object"
              },
              "external_auth_token": {
                "type": "string"
              },
              "external_auth_type": {
                "type": "ref",
                "ref": "ApplicationIdentityProviderAuthType"
              }
            },
            "required": [
              "client_id",
              "external_auth_token",
              "external_auth_type"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/partner-sdk/provisional-accounts/unmerge",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bot_partner_sdk_unmerge_provisional_account": {
      "name": "bot_partner_sdk_unmerge_provisional_account",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "external_user_id": {
                "type": "string"
              }
            },
            "required": [
              "external_user_id"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/partner-sdk/provisional-accounts/unmerge/bot",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "partner_sdk_token": {
      "name": "partner_sdk_token",
      "schema": {
        "type": "ref",
        "ref": "ProvisionalTokenResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "client_id": {
                "type": "ref",
                "ref": "SnowflakeType"
              },
              "client_secret": {
                "type": "object"
              },
              "external_auth_token": {
                "type": "string"
              },
              "external_auth_type": {
                "type": "ref",
                "ref": "ApplicationIdentityProviderAuthType"
              }
            },
            "required": [
              "client_id",
              "external_auth_token",
              "external_auth_type"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/partner-sdk/token",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bot_partner_sdk_token": {
      "name": "bot_partner_sdk_token",
      "schema": {
        "type": "ref",
        "ref": "ProvisionalTokenResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "external_user_id": {
                "type": "string"
              },
              "preferred_global_name": {
                "type": "object"
              }
            },
            "required": [
              "external_user_id"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/partner-sdk/token/bot",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "create_stage_instance": {
      "name": "create_stage_instance",
      "schema": {
        "type": "ref",
        "ref": "StageInstanceResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "topic": {
                "type": "string"
              },
              "channel_id": {
                "type": "ref",
                "ref": "SnowflakeType"
              },
              "privacy_level": {
                "type": "object"
              },
              "guild_scheduled_event_id": {
                "type": "object"
              },
              "send_start_notification": {
                "type": "object"
              }
            },
            "required": [
              "topic",
              "channel_id"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/stage-instances",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_stage_instance": {
      "name": "delete_stage_instance",
      "schema": {
        "type": "object"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/stage-instances/{channel_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          }
        }
      }
    },
    "update_stage_instance": {
      "name": "update_stage_instance",
      "schema": {
        "type": "ref",
        "ref": "StageInstanceResponse"
      },
      "args": {
        "channel_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "topic": {
                "type": "string"
              },
              "privacy_level": {
                "type": "ref",
                "ref": "StageInstancesPrivacyLevels"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/stage-instances/{channel_id}",
          "params": {
            "channel_id": {
              "$resolve": "args.channel_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_my_user": {
      "name": "update_my_user",
      "schema": {
        "type": "ref",
        "ref": "UserPIIResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BotAccountPatchRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/users/@me",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "update_application_user_role_connection": {
      "name": "update_application_user_role_connection",
      "schema": {
        "type": "ref",
        "ref": "ApplicationUserRoleConnectionResponse"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateApplicationUserRoleConnectionRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/users/@me/applications/{application_id}/role-connection",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_application_user_role_connection": {
      "name": "delete_application_user_role_connection",
      "schema": {
        "type": "object"
      },
      "args": {
        "application_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/users/@me/applications/{application_id}/role-connection",
          "params": {
            "application_id": {
              "$resolve": "args.application_id"
            }
          }
        }
      }
    },
    "create_dm": {
      "name": "create_dm",
      "schema": {
        "type": "ref",
        "ref": "PrivateChannelResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreatePrivateChannelRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/users/@me/channels",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "leave_guild": {
      "name": "leave_guild",
      "schema": {
        "type": "object"
      },
      "args": {
        "guild_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/users/@me/guilds/{guild_id}",
          "params": {
            "guild_id": {
              "$resolve": "args.guild_id"
            }
          }
        }
      }
    },
    "delete_webhook": {
      "name": "delete_webhook",
      "schema": {
        "type": "object"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "update_webhook": {
      "name": "update_webhook",
      "schema": {
        "type": "ref",
        "ref": "ApplicationIncomingWebhookResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "avatar": {
                "type": "object"
              },
              "channel_id": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "execute_webhook": {
      "name": "execute_webhook",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "wait": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "thread_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "with_components": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IncomingWebhookRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks/{webhook_id}/{webhook_token}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            }
          },
          "query": {
            "wait": {
              "$resolve": "args.wait"
            },
            "thread_id": {
              "$resolve": "args.thread_id"
            },
            "with_components": {
              "$resolve": "args.with_components"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_webhook_by_token": {
      "name": "delete_webhook_by_token",
      "schema": {
        "type": "object"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/webhooks/{webhook_id}/{webhook_token}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            }
          }
        }
      }
    },
    "update_webhook_by_token": {
      "name": "update_webhook_by_token",
      "schema": {
        "type": "ref",
        "ref": "ApplicationIncomingWebhookResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "avatar": {
                "type": "object"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/webhooks/{webhook_id}/{webhook_token}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "execute_github_compatible_webhook": {
      "name": "execute_github_compatible_webhook",
      "schema": {
        "type": "object"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "wait": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "thread_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "GithubWebhook"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks/{webhook_id}/{webhook_token}/github",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            }
          },
          "query": {
            "wait": {
              "$resolve": "args.wait"
            },
            "thread_id": {
              "$resolve": "args.thread_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_original_webhook_message": {
      "name": "delete_original_webhook_message",
      "schema": {
        "type": "object"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "thread_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/webhooks/{webhook_id}/{webhook_token}/messages/@original",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            }
          },
          "query": {
            "thread_id": {
              "$resolve": "args.thread_id"
            }
          }
        }
      }
    },
    "update_original_webhook_message": {
      "name": "update_original_webhook_message",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "thread_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "with_components": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IncomingWebhookUpdateRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/webhooks/{webhook_id}/{webhook_token}/messages/@original",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            }
          },
          "query": {
            "thread_id": {
              "$resolve": "args.thread_id"
            },
            "with_components": {
              "$resolve": "args.with_components"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_webhook_message": {
      "name": "delete_webhook_message",
      "schema": {
        "type": "object"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "thread_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          },
          "query": {
            "thread_id": {
              "$resolve": "args.thread_id"
            }
          }
        }
      }
    },
    "update_webhook_message": {
      "name": "update_webhook_message",
      "schema": {
        "type": "ref",
        "ref": "MessageResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "message_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "thread_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "with_components": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IncomingWebhookUpdateRequestPartial"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            },
            "message_id": {
              "$resolve": "args.message_id"
            }
          },
          "query": {
            "thread_id": {
              "$resolve": "args.thread_id"
            },
            "with_components": {
              "$resolve": "args.with_components"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "execute_slack_compatible_webhook": {
      "name": "execute_slack_compatible_webhook",
      "schema": {
        "type": "object"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": true
        },
        "webhook_token": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "wait": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "thread_id": {
          "schema": {
            "type": "ref",
            "ref": "SnowflakeType"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SlackWebhook"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks/{webhook_id}/{webhook_token}/slack",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "webhook_token": {
              "$resolve": "args.webhook_token"
            }
          },
          "query": {
            "wait": {
              "$resolve": "args.wait"
            },
            "thread_id": {
              "$resolve": "args.thread_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    }
  }
};

export default spec;

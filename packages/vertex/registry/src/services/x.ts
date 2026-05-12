import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "x",
  "type": "http",
  "connection": {
    "provider": "x",
    "baseUrl": "https://api.x.com"
  },
  "schemas": {
    "ActivityEventId": {
      "type": "string"
    },
    "ActivityStreamingResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "event_type": {
              "type": "string"
            },
            "event_uuid": {
              "type": "ref",
              "ref": "ActivityEventId"
            },
            "filter": {
              "type": "ref",
              "ref": "ActivitySubscriptionFilter"
            },
            "payload": {
              "type": "ref",
              "ref": "ActivityStreamingResponsePayload"
            },
            "tag": {
              "type": "string"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ActivityStreamingResponsePayload": {
      "type": "ref",
      "ref": "ProfileUpdateActivityResponsePayload"
    },
    "ActivitySubscription": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "event_type": {
          "type": "string"
        },
        "filter": {
          "type": "ref",
          "ref": "ActivitySubscriptionFilter"
        },
        "subscription_id": {
          "type": "ref",
          "ref": "ActivitySubscriptionId"
        },
        "tag": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "webhook_id": {
          "type": "ref",
          "ref": "WebhookConfigId"
        }
      },
      "required": [
        "subscription_id",
        "event_type",
        "filter",
        "created_at",
        "updated_at"
      ]
    },
    "ActivitySubscriptionCreateRequest": {
      "type": "object",
      "properties": {
        "event_type": {
          "type": "string"
        },
        "filter": {
          "type": "ref",
          "ref": "ActivitySubscriptionFilter"
        },
        "tag": {
          "type": "string"
        },
        "webhook_id": {
          "type": "ref",
          "ref": "WebhookConfigId"
        }
      },
      "required": [
        "event_type",
        "filter"
      ]
    },
    "ActivitySubscriptionCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "subscription": {
              "type": "ref",
              "ref": "ActivitySubscription"
            },
            "total_subscriptions_for_instance_id": {
              "type": "number"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "total_subscriptions": {
              "type": "number"
            }
          }
        }
      }
    },
    "ActivitySubscriptionDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "deleted": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "total_subscriptions": {
              "type": "number"
            }
          }
        }
      }
    },
    "ActivitySubscriptionFilter": {
      "type": "object",
      "properties": {
        "direction": {
          "type": "string"
        },
        "keyword": {
          "type": "ref",
          "ref": "Keyword"
        },
        "user_id": {
          "type": "ref",
          "ref": "UserId"
        }
      }
    },
    "ActivitySubscriptionGetResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ActivitySubscription"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "string"
            },
            "result_count": {
              "type": "number"
            }
          }
        }
      }
    },
    "ActivitySubscriptionId": {
      "type": "string"
    },
    "ActivitySubscriptionUpdateRequest": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "string"
        },
        "webhook_id": {
          "type": "ref",
          "ref": "WebhookConfigId"
        }
      }
    },
    "ActivitySubscriptionUpdateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "subscription": {
              "type": "ref",
              "ref": "ActivitySubscription"
            },
            "total_subscriptions": {
              "type": "number"
            }
          }
        }
      }
    },
    "AddOrDeleteRulesRequest": {
      "type": "ref",
      "ref": "AddRulesRequest"
    },
    "AddOrDeleteRulesResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Rule"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "ref",
          "ref": "RulesResponseMetadata"
        }
      },
      "required": [
        "meta"
      ]
    },
    "AddRulesRequest": {
      "type": "object",
      "properties": {
        "add": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RuleNoId"
          }
        }
      },
      "required": [
        "add"
      ]
    },
    "Aggregate": {
      "type": "number"
    },
    "AllProjectClientApps": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "AppRulesCount"
      }
    },
    "AllowDownloadStatus": {
      "type": "object",
      "properties": {
        "allow_download": {
          "type": "boolean"
        }
      }
    },
    "AltText": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string"
        }
      },
      "required": [
        "text"
      ]
    },
    "Analytics": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "ref",
                "ref": "TweetId"
              },
              "timestamped_metrics": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "TimestampedMetrics"
                }
              }
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "AnimatedGif": {
      "type": "ref",
      "ref": "Media"
    },
    "AppRulesCount": {
      "type": "object",
      "properties": {
        "client_app_id": {
          "type": "ref",
          "ref": "ClientAppId"
        },
        "rule_count": {
          "type": "number"
        }
      }
    },
    "AudiencePolicy": {
      "type": "object",
      "properties": {
        "creator_subscriptions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "x_subscriptions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "BinaryPayload": {
      "type": "string"
    },
    "BookmarkAddRequest": {
      "type": "object",
      "properties": {
        "tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        }
      },
      "required": [
        "tweet_id"
      ]
    },
    "BookmarkFolderId": {
      "type": "string"
    },
    "BookmarkFolderPostsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "ref",
                "ref": "TweetId"
              }
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            }
          }
        }
      }
    },
    "BookmarkFoldersResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "ref",
                "ref": "BookmarkFolderId"
              },
              "name": {
                "type": "string"
              }
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            }
          }
        }
      }
    },
    "BookmarkMutationResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "bookmarked": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "CashtagEntity": {
      "type": "ref",
      "ref": "EntityIndicesInclusiveExclusive"
    },
    "CashtagFields": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "string"
        }
      },
      "required": [
        "tag"
      ]
    },
    "ChatActionSignature": {
      "type": "object",
      "properties": {
        "encoded_message_event_detail": {
          "type": "string"
        },
        "message_event_signature": {
          "type": "ref",
          "ref": "ChatMessageEventSignature"
        },
        "message_id": {
          "type": "string"
        },
        "signature_payload": {
          "type": "string"
        }
      }
    },
    "ChatAddGroupMembersRequest": {
      "type": "object",
      "properties": {
        "action_signatures": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatActionSignature"
          }
        },
        "conversation_key_version": {
          "type": "string"
        },
        "conversation_participant_keys": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatConversationParticipantKey"
          }
        },
        "encrypted_avatar_url": {
          "type": "string"
        },
        "encrypted_title": {
          "type": "string"
        },
        "user_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "user_ids"
      ]
    },
    "ChatAddGroupMembersResponse": {
      "type": "object",
      "properties": {
        "conversation_key_change_sequence_id": {
          "type": "string"
        },
        "current_member_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "ChatAddPublicKeyRequest": {
      "type": "object",
      "properties": {
        "generate_version": {
          "type": "boolean"
        },
        "public_key": {
          "type": "object",
          "properties": {
            "identity_public_key_signature": {
              "type": "string"
            },
            "public_key": {
              "type": "string"
            },
            "public_key_fingerprint": {
              "type": "string"
            },
            "registration_method": {
              "type": "string"
            },
            "signing_public_key": {
              "type": "string"
            },
            "signing_public_key_signature": {
              "type": "string"
            }
          }
        },
        "version": {
          "type": "string"
        }
      },
      "required": [
        "public_key",
        "version"
      ]
    },
    "ChatAddPublicKeyResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "ChatPublicKey"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ChatConversation": {
      "type": "object",
      "properties": {
        "admin_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "created_at": {
          "type": "string"
        },
        "group_avatar_url": {
          "type": "string"
        },
        "group_name": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "is_muted": {
          "type": "boolean"
        },
        "member_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "message_ttl_msec": {
          "type": "string"
        },
        "participant_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "screen_capture_blocking_enabled": {
          "type": "boolean"
        },
        "screen_capture_detection_enabled": {
          "type": "boolean"
        },
        "type": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    },
    "ChatConversationOrRecipientId": {
      "type": "string"
    },
    "ChatConversationParticipantKey": {
      "type": "object",
      "properties": {
        "encrypted_conversation_key": {
          "type": "string"
        },
        "public_key_version": {
          "type": "string"
        },
        "user_id": {
          "type": "string"
        }
      }
    },
    "ChatCreateConversationRequest": {
      "type": "object",
      "properties": {
        "action_signatures": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatActionSignature"
          }
        },
        "base64_encoded_key_rotation": {
          "type": "string"
        },
        "conversation_id": {
          "type": "string"
        },
        "conversation_key_version": {
          "type": "string"
        },
        "conversation_participant_keys": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatConversationParticipantKey"
          }
        },
        "group_admins": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "group_avatar_url": {
          "type": "string"
        },
        "group_description": {
          "type": "string"
        },
        "group_members": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "group_name": {
          "type": "string"
        },
        "ttl_msec": {
          "type": "string"
        }
      },
      "required": [
        "conversation_id",
        "conversation_key_version",
        "conversation_participant_keys",
        "group_members"
      ]
    },
    "ChatCreateConversationResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "conversation_id": {
              "type": "string"
            },
            "conversation_key_change_sequence_id": {
              "type": "string"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ChatGetConversationResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatMessageEvent"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "conversation_key_events": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "has_more": {
              "type": "boolean"
            },
            "next_token": {
              "type": "string"
            },
            "result_count": {
              "type": "number"
            }
          }
        }
      }
    },
    "ChatGetConversationsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatConversation"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "has_message_requests": {
              "type": "boolean"
            },
            "has_more": {
              "type": "boolean"
            },
            "next_token": {
              "type": "string"
            },
            "result_count": {
              "type": "number"
            }
          }
        }
      }
    },
    "ChatInitializeConversationKeysRequest": {
      "type": "object",
      "properties": {
        "action_signatures": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatActionSignature"
          }
        },
        "base64_encoded_key_rotation": {
          "type": "string"
        },
        "conversation_key_version": {
          "type": "string"
        },
        "conversation_participant_keys": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatConversationParticipantKey"
          }
        }
      },
      "required": [
        "conversation_key_version",
        "conversation_participant_keys"
      ]
    },
    "ChatInitializeConversationKeysResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "sequence_id": {
              "type": "string"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ChatInitializeGroupResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "conversation_id": {
              "type": "string"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ChatJuiceboxConfig": {
      "type": "object",
      "properties": {
        "key_store_token_map_json": {
          "type": "string"
        },
        "max_guess_count": {
          "type": "number"
        },
        "realm_state_string": {
          "type": "string"
        },
        "recover_threshold": {
          "type": "number"
        },
        "register_threshold": {
          "type": "number"
        },
        "token_map": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {
                "type": "object",
                "properties": {
                  "address": {
                    "type": "string"
                  },
                  "public_key": {
                    "type": "string"
                  },
                  "token": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "ChatMarkConversationReadRequest": {
      "type": "object",
      "properties": {
        "seen_until_sequence_id": {
          "type": "string"
        }
      },
      "required": [
        "seen_until_sequence_id"
      ]
    },
    "ChatMarkConversationReadResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ChatMediaUploadAppendRequest": {
      "type": "object",
      "properties": {
        "conversation_id": {
          "type": "string"
        },
        "media": {
          "type": "ref",
          "ref": "MediaPayloadBinary"
        },
        "media_hash_key": {
          "type": "string"
        },
        "segment_index": {
          "type": "ref",
          "ref": "MediaSegments"
        }
      },
      "required": [
        "media",
        "segment_index",
        "conversation_id",
        "media_hash_key"
      ]
    },
    "ChatMediaUploadFinalizeRequest": {
      "type": "object",
      "properties": {
        "conversation_id": {
          "type": "string"
        },
        "media_hash_key": {
          "type": "string"
        },
        "message_id": {
          "type": "string"
        },
        "num_parts": {
          "type": "string"
        },
        "ttl_msec": {
          "type": "string"
        }
      }
    },
    "ChatMediaUploadFinalizeResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean"
            }
          },
          "required": [
            "success"
          ]
        }
      }
    },
    "ChatMediaUploadInitializeRequest": {
      "type": "object",
      "properties": {
        "conversation_id": {
          "type": "string"
        },
        "total_bytes": {
          "type": "number"
        }
      }
    },
    "ChatMediaUploadInitializeResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "conversation_id": {
              "type": "string"
            },
            "media_hash_key": {
              "type": "string"
            },
            "session_id": {
              "type": "string"
            }
          },
          "required": [
            "session_id",
            "media_hash_key",
            "conversation_id"
          ]
        }
      }
    },
    "ChatMessageEvent": {
      "type": "object",
      "properties": {
        "conversation_id": {
          "type": "string"
        },
        "conversation_token": {
          "type": "string"
        },
        "created_at_msec": {
          "type": "string"
        },
        "encoded_event": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "is_trusted": {
          "type": "boolean"
        },
        "message_event_signature": {
          "type": "ref",
          "ref": "ChatMessageEventSignature"
        },
        "previous_sequence_id": {
          "type": "string"
        },
        "sender_id": {
          "type": "string"
        },
        "sequence_id": {
          "type": "string"
        }
      },
      "required": [
        "encoded_event"
      ]
    },
    "ChatMessageEventSignature": {
      "type": "object",
      "properties": {
        "message_signing_key_info_list": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatMessageSigningKeyInfo"
          }
        },
        "public_key_version": {
          "type": "string"
        },
        "signature": {
          "type": "string"
        },
        "signature_version": {
          "type": "string"
        },
        "signing_public_key": {
          "type": "string"
        }
      }
    },
    "ChatMessageSigningKeyInfo": {
      "type": "object",
      "properties": {
        "member_id": {
          "type": "string"
        },
        "public_key_version": {
          "type": "string"
        },
        "signing_public_key": {
          "type": "string"
        }
      }
    },
    "ChatPublicKey": {
      "type": "object",
      "properties": {
        "juicebox_config": {
          "type": "ref",
          "ref": "ChatJuiceboxConfig"
        },
        "public_key": {
          "type": "string"
        },
        "signing_public_key": {
          "type": "string"
        },
        "version": {
          "type": "string"
        }
      }
    },
    "ChatSendMessageRequest": {
      "type": "object",
      "properties": {
        "conversation_token": {
          "type": "string"
        },
        "encoded_message_create_event": {
          "type": "string"
        },
        "encoded_message_event_signature": {
          "type": "string"
        },
        "message_id": {
          "type": "string"
        }
      },
      "required": [
        "message_id",
        "encoded_message_create_event"
      ]
    },
    "ChatSendMessageResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "encoded_message_event": {
              "type": "string"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ChatSendTypingIndicatorResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ClientAppId": {
      "type": "string"
    },
    "ClientAppUsage": {
      "type": "object",
      "properties": {
        "client_app_id": {
          "type": "string"
        },
        "usage": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UsageFields"
          }
        },
        "usage_result_count": {
          "type": "number"
        }
      }
    },
    "ClientDisconnectedProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "ClientForbiddenProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "Community": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "id": {
          "type": "ref",
          "ref": "CommunityId"
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
    "CommunityId": {
      "type": "string"
    },
    "ComplianceJob": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "ref",
          "ref": "CreatedAt"
        },
        "download_expires_at": {
          "type": "ref",
          "ref": "DownloadExpiration"
        },
        "download_url": {
          "type": "ref",
          "ref": "DownloadUrl"
        },
        "id": {
          "type": "ref",
          "ref": "JobId"
        },
        "name": {
          "type": "ref",
          "ref": "ComplianceJobName"
        },
        "status": {
          "type": "ref",
          "ref": "ComplianceJobStatus"
        },
        "type": {
          "type": "ref",
          "ref": "ComplianceJobType"
        },
        "upload_expires_at": {
          "type": "ref",
          "ref": "UploadExpiration"
        },
        "upload_url": {
          "type": "ref",
          "ref": "UploadUrl"
        }
      },
      "required": [
        "id",
        "type",
        "created_at",
        "upload_url",
        "download_url",
        "upload_expires_at",
        "download_expires_at",
        "status"
      ]
    },
    "ComplianceJobName": {
      "type": "string"
    },
    "ComplianceJobStatus": {
      "type": "string"
    },
    "ComplianceJobType": {
      "type": "string"
    },
    "ConflictProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "Connection": {
      "type": "object",
      "properties": {
        "client_ip": {
          "type": "string"
        },
        "connected_at": {
          "type": "string"
        },
        "disconnect_reason": {
          "type": "string"
        },
        "disconnected_at": {
          "type": "string"
        },
        "endpoint_name": {
          "type": "string"
        }
      },
      "required": [
        "connected_at",
        "endpoint_name"
      ]
    },
    "ConnectionExceptionProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "ContentExpiration": {
      "type": "object",
      "properties": {
        "timestamp_sec": {
          "type": "number"
        }
      },
      "required": [
        "timestamp_sec"
      ]
    },
    "ContextAnnotation": {
      "type": "object",
      "properties": {
        "domain": {
          "type": "ref",
          "ref": "ContextAnnotationDomainFields"
        },
        "entity": {
          "type": "ref",
          "ref": "ContextAnnotationEntityFields"
        }
      },
      "required": [
        "domain",
        "entity"
      ]
    },
    "ContextAnnotationDomainFields": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    },
    "ContextAnnotationEntityFields": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    },
    "CountryCode": {
      "type": "string"
    },
    "CreateAttachmentsMessageRequest": {
      "type": "object",
      "properties": {
        "attachments": {
          "type": "ref",
          "ref": "DmAttachments"
        },
        "text": {
          "type": "string"
        }
      },
      "required": [
        "attachments"
      ]
    },
    "CreateComplianceJobRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "ref",
          "ref": "ComplianceJobName"
        },
        "resumable": {
          "type": "boolean"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "CreateComplianceJobResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "ComplianceJob"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "CreateDmConversationRequest": {
      "type": "object",
      "properties": {
        "conversation_type": {
          "type": "string"
        },
        "message": {
          "type": "ref",
          "ref": "CreateMessageRequest"
        },
        "participant_ids": {
          "type": "ref",
          "ref": "DmParticipants"
        }
      },
      "required": [
        "conversation_type",
        "participant_ids",
        "message"
      ]
    },
    "CreateDmEventResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "dm_conversation_id": {
              "type": "ref",
              "ref": "DmConversationId"
            },
            "dm_event_id": {
              "type": "ref",
              "ref": "DmEventId"
            }
          },
          "required": [
            "dm_conversation_id",
            "dm_event_id"
          ]
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "CreateMessageRequest": {
      "type": "ref",
      "ref": "CreateTextMessageRequest"
    },
    "CreateNoteRequest": {
      "type": "object",
      "properties": {
        "info": {
          "type": "ref",
          "ref": "NoteInfo"
        },
        "post_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "test_mode": {
          "type": "boolean"
        }
      },
      "required": [
        "test_mode",
        "post_id",
        "info"
      ]
    },
    "CreateNoteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "NoteId"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "CreateTextMessageRequest": {
      "type": "object",
      "properties": {
        "attachments": {
          "type": "ref",
          "ref": "DmAttachments"
        },
        "text": {
          "type": "string"
        }
      },
      "required": [
        "text"
      ]
    },
    "CreatedAt": {
      "type": "string"
    },
    "DeleteDmResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "deleted": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "DeleteNoteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "deleted": {
              "type": "boolean"
            }
          },
          "required": [
            "deleted"
          ]
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "DeleteRulesRequest": {
      "type": "object",
      "properties": {
        "delete": {
          "type": "object",
          "properties": {
            "ids": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "RuleId"
              }
            },
            "values": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "RuleValue"
              }
            }
          }
        }
      },
      "required": [
        "delete"
      ]
    },
    "DisallowedResourceProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "DisplayTextRange": {
      "type": "array",
      "items": {
        "type": "number"
      }
    },
    "DmAttachments": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "DmMediaAttachment"
      }
    },
    "DmConversationId": {
      "type": "string"
    },
    "DmEvent": {
      "type": "object",
      "properties": {
        "attachments": {
          "type": "object",
          "properties": {
            "card_ids": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "media_keys": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "MediaKey"
              }
            }
          }
        },
        "cashtags": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CashtagEntity"
          }
        },
        "created_at": {
          "type": "string"
        },
        "dm_conversation_id": {
          "type": "ref",
          "ref": "DmConversationId"
        },
        "event_type": {
          "type": "string"
        },
        "hashtags": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "HashtagEntity"
          }
        },
        "id": {
          "type": "ref",
          "ref": "DmEventId"
        },
        "mentions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MentionEntity"
          }
        },
        "participant_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserId"
          }
        },
        "referenced_tweets": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "ref",
                "ref": "TweetId"
              }
            },
            "required": [
              "id"
            ]
          }
        },
        "sender_id": {
          "type": "ref",
          "ref": "UserId"
        },
        "text": {
          "type": "string"
        },
        "urls": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UrlEntityDm"
          }
        }
      },
      "required": [
        "id",
        "event_type"
      ]
    },
    "DmEventId": {
      "type": "string"
    },
    "DmMediaAttachment": {
      "type": "object",
      "properties": {
        "media_id": {
          "type": "ref",
          "ref": "MediaId"
        }
      },
      "required": [
        "media_id"
      ]
    },
    "DmParticipants": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "UserId"
      }
    },
    "DmResourceId": {
      "type": "string"
    },
    "DomainRestrictions": {
      "type": "object",
      "properties": {
        "whitelist": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "whitelist"
      ]
    },
    "DownloadExpiration": {
      "type": "string"
    },
    "DownloadUrl": {
      "type": "string"
    },
    "DuplicateRuleProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "End": {
      "type": "string"
    },
    "Engagement": {
      "type": "object",
      "properties": {
        "errors": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "error": {
                "type": "string"
              },
              "tweets": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          }
        },
        "measurement": {
          "type": "object",
          "properties": {
            "metrics_time_series": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "tweet_id": {
                    "type": "ref",
                    "ref": "TweetId"
                  },
                  "value": {
                    "type": "object",
                    "properties": {
                      "metric_values": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "metric_type": {
                              "type": "string"
                            },
                            "metric_value": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "timestamp": {
                        "type": "object",
                        "properties": {
                          "iso8601_time": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "metrics_total": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "tweet_id": {
                    "type": "ref",
                    "ref": "TweetId"
                  },
                  "value": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "metric_type": {
                          "type": "string"
                        },
                        "metric_value": {
                          "type": "number"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "EntityIndicesInclusiveExclusive": {
      "type": "object",
      "properties": {
        "end": {
          "type": "number"
        },
        "start": {
          "type": "number"
        }
      },
      "required": [
        "start",
        "end"
      ]
    },
    "EntityIndicesInclusiveInclusive": {
      "type": "object",
      "properties": {
        "end": {
          "type": "number"
        },
        "start": {
          "type": "number"
        }
      },
      "required": [
        "start",
        "end"
      ]
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
    "EvaluateNoteRequest": {
      "type": "object",
      "properties": {
        "note_text": {
          "type": "string"
        },
        "post_id": {
          "type": "ref",
          "ref": "TweetId"
        }
      },
      "required": [
        "post_id",
        "note_text"
      ]
    },
    "EvaluateNoteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "claim_opinion_score": {
              "type": "number"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Expansions": {
      "type": "object",
      "properties": {
        "media": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Media"
          }
        },
        "places": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Place"
          }
        },
        "polls": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Poll"
          }
        },
        "topics": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Topic"
          }
        },
        "tweets": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "users": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        }
      }
    },
    "FieldUnauthorizedProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "FilteredStreamingTweetResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "matching_rules": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "ref",
                "ref": "RuleId"
              },
              "tag": {
                "type": "ref",
                "ref": "RuleTag"
              }
            },
            "required": [
              "id"
            ]
          }
        }
      }
    },
    "FollowActivityResponsePayload": {
      "type": "object",
      "properties": {
        "source": {
          "type": "ref",
          "ref": "User"
        },
        "target": {
          "type": "ref",
          "ref": "User"
        }
      }
    },
    "FoundMediaOrigin": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "provider": {
          "type": "string"
        }
      },
      "required": [
        "provider",
        "id"
      ]
    },
    "FullTextEntities": {
      "type": "object",
      "properties": {
        "annotations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityIndicesInclusiveInclusive"
          }
        },
        "cashtags": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CashtagEntity"
          }
        },
        "hashtags": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "HashtagEntity"
          }
        },
        "mentions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MentionEntity"
          }
        },
        "urls": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UrlEntity"
          }
        }
      }
    },
    "GenericProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "Geo": {
      "type": "object",
      "properties": {
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "geometry": {
          "type": "ref",
          "ref": "Point"
        },
        "properties": {
          "type": "object",
          "properties": {}
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "bbox",
        "properties"
      ]
    },
    "GeoRestrictions": {
      "type": "object",
      "properties": {
        "blacklisted_country_codes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "whitelisted_country_codes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "whitelisted_country_codes",
        "blacklisted_country_codes"
      ]
    },
    "Get2ChatConversationsIdResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatMessageEvent"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2ChatConversationsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ChatConversation"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2CommunitiesIdResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Community"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2CommunitiesSearchResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Community"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            }
          }
        }
      }
    },
    "Get2ComplianceJobsIdResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "ComplianceJob"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2ComplianceJobsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ComplianceJob"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2ConnectionsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Connection"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2DmConversationsIdDmEventsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DmEvent"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2DmConversationsWithParticipantIdDmEventsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DmEvent"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2DmEventsEventIdResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "DmEvent"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2DmEventsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DmEvent"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2FdxAccountsAccountidContactResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "PlaidAccountContact"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2FdxAccountsAccountidPayment-networksResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PlaidAccountPaymentNetwork"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2FdxAccountsAccountidResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "PlaidAccount"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2FdxAccountsAccountidTransactionsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PlaidAccountTransaction"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2FdxCustomersCurrentResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "PlaidCustomer"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2Insights28hrResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Engagement"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2InsightsHistoricalResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Engagement"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2LikesFirehoseStreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "LikeWithTweetAuthor"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2LikesSample10StreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "LikeWithTweetAuthor"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2ListsIdFollowersResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2ListsIdMembersResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2ListsIdResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "List"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2ListsIdTweetsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2MarketplaceHandlesHandleAvailabilityResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "MarketplaceHandleAvailability"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2MediaAnalyticsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "MediaAnalytics"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2MediaMediaKeyResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Media"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2MediaResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Media"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2NewsIdResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "News"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2NewsSearchResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "News"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2NotesSearchNotesWrittenResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Note"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2NotesSearchPostsEligibleForNotesResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2SpacesByCreatorIdsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Space"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2SpacesIdBuyersResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2SpacesIdResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Space"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2SpacesIdTweetsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2SpacesResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Space"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2SpacesSearchResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Space"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2TrendsByWoeidWoeidResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Trend"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2TweetsAnalyticsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Analytics"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2TweetsCountsAllResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SearchCount"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "newest_id": {
              "type": "ref",
              "ref": "NewestId"
            },
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "oldest_id": {
              "type": "ref",
              "ref": "OldestId"
            },
            "total_tweet_count": {
              "type": "ref",
              "ref": "Aggregate"
            }
          }
        }
      }
    },
    "Get2TweetsCountsRecentResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SearchCount"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "newest_id": {
              "type": "ref",
              "ref": "NewestId"
            },
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "oldest_id": {
              "type": "ref",
              "ref": "OldestId"
            },
            "total_tweet_count": {
              "type": "ref",
              "ref": "Aggregate"
            }
          }
        }
      }
    },
    "Get2TweetsFirehoseStreamLangEnResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsFirehoseStreamLangJaResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsFirehoseStreamLangKoResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsFirehoseStreamLangPtResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsFirehoseStreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsIdLikingUsersResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2TweetsIdQuoteTweetsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2TweetsIdResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsIdRetweetedByResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2TweetsIdRetweetsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2TweetsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsSample10StreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsSampleStreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsSearchAllResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "newest_id": {
              "type": "ref",
              "ref": "NewestId"
            },
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "oldest_id": {
              "type": "ref",
              "ref": "OldestId"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2TweetsSearchRecentResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "newest_id": {
              "type": "ref",
              "ref": "NewestId"
            },
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "oldest_id": {
              "type": "ref",
              "ref": "OldestId"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2TweetsSearchStreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2TweetsSearchStreamRulesCountsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "RulesCount"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2UsageTweetsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Usage"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2UsersByResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2UsersByUsernameUsernameResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "User"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2UsersIdAffiliatesResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdBlockingResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdBookmarksResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdFollowedListsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "List"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdFollowersResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdFollowingResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdLikedTweetsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdListMembershipsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "List"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdMentionsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "newest_id": {
              "type": "ref",
              "ref": "NewestId"
            },
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "oldest_id": {
              "type": "ref",
              "ref": "OldestId"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdMutingResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdOwnedListsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "List"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdPinnedListsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "List"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdPublicKeysResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PublicKey"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2UsersIdResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "User"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2UsersIdTimelinesReverseChronologicalResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "newest_id": {
              "type": "ref",
              "ref": "NewestId"
            },
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "oldest_id": {
              "type": "ref",
              "ref": "OldestId"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersIdTweetsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "newest_id": {
              "type": "ref",
              "ref": "NewestId"
            },
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "oldest_id": {
              "type": "ref",
              "ref": "OldestId"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersMeResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "User"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2UsersPersonalizedTrendsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PersonalizedTrend"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2UsersPublicKeysResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "PublicKey"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Get2UsersRepostsOfMeResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tweet"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            },
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "Get2UsersResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "Get2UsersSearchResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "User"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        },
        "meta": {
          "type": "object",
          "properties": {
            "next_token": {
              "type": "ref",
              "ref": "NextToken"
            },
            "previous_token": {
              "type": "ref",
              "ref": "PreviousToken"
            }
          }
        }
      }
    },
    "Get2WebhooksResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WebhookConfig"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "result_count": {
              "type": "ref",
              "ref": "ResultCount"
            }
          }
        }
      }
    },
    "HashtagEntity": {
      "type": "ref",
      "ref": "EntityIndicesInclusiveExclusive"
    },
    "HashtagFields": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "string"
        }
      },
      "required": [
        "tag"
      ]
    },
    "HttpStatusCode": {
      "type": "number"
    },
    "InvalidRequestProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "InvalidRuleProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "JobId": {
      "type": "string"
    },
    "Keyword": {
      "type": "string"
    },
    "KillAllConnectionsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "failed_kills": {
              "type": "number"
            },
            "results": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "error_message": {
                    "type": "string"
                  },
                  "success": {
                    "type": "boolean"
                  },
                  "uuid": {
                    "type": "string"
                  }
                }
              }
            },
            "successful_kills": {
              "type": "number"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "KillConnectionsByEndpointResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "failed_kills": {
              "type": "number"
            },
            "results": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "error_message": {
                    "type": "string"
                  },
                  "success": {
                    "type": "boolean"
                  },
                  "uuid": {
                    "type": "string"
                  }
                }
              }
            },
            "successful_kills": {
              "type": "number"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "KillConnectionsByUuidsRequest": {
      "type": "object",
      "properties": {
        "uuids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "uuids"
      ]
    },
    "KillConnectionsByUuidsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "failed_kills": {
              "type": "number"
            },
            "results": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "error_message": {
                    "type": "string"
                  },
                  "success": {
                    "type": "boolean"
                  },
                  "uuid": {
                    "type": "string"
                  }
                }
              }
            },
            "successful_kills": {
              "type": "number"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "LikeComplianceSchema": {
      "type": "object",
      "properties": {
        "delete": {
          "type": "ref",
          "ref": "UnlikeComplianceSchema"
        }
      },
      "required": [
        "delete"
      ]
    },
    "LikeId": {
      "type": "string"
    },
    "LikeWithTweetAuthor": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "id": {
          "type": "ref",
          "ref": "LikeId"
        },
        "liked_tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "timestamp_ms": {
          "type": "number"
        },
        "tweet_author_id": {
          "type": "ref",
          "ref": "UserId"
        }
      }
    },
    "LikesComplianceStreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "LikeComplianceSchema"
        }
      },
      "required": [
        "data"
      ]
    },
    "List": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "follower_count": {
          "type": "number"
        },
        "id": {
          "type": "ref",
          "ref": "ListId"
        },
        "member_count": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "owner_id": {
          "type": "ref",
          "ref": "UserId"
        },
        "private": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "ListAddUserRequest": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "ref",
          "ref": "UserId"
        }
      },
      "required": [
        "user_id"
      ]
    },
    "ListCreateRequest": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "private": {
          "type": "boolean"
        }
      },
      "required": [
        "name"
      ]
    },
    "ListCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "ListId"
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
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ListDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "deleted": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ListFollowedRequest": {
      "type": "object",
      "properties": {
        "list_id": {
          "type": "ref",
          "ref": "ListId"
        }
      },
      "required": [
        "list_id"
      ]
    },
    "ListFollowedResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "following": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ListId": {
      "type": "string"
    },
    "ListMutateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "is_member": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ListPinnedRequest": {
      "type": "object",
      "properties": {
        "list_id": {
          "type": "ref",
          "ref": "ListId"
        }
      },
      "required": [
        "list_id"
      ]
    },
    "ListPinnedResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "pinned": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ListUnpinResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "pinned": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ListUpdateRequest": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "private": {
          "type": "boolean"
        }
      }
    },
    "ListUpdateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "updated": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "ManagementInfo": {
      "type": "object",
      "properties": {
        "managed": {
          "type": "boolean"
        }
      },
      "required": [
        "managed"
      ]
    },
    "MarketplaceHandleAvailability": {
      "type": "object",
      "properties": {
        "availability_state": {
          "type": "string"
        },
        "redirect_url": {
          "type": "string"
        }
      },
      "required": [
        "availability_state"
      ]
    },
    "Media": {
      "type": "object",
      "properties": {
        "height": {
          "type": "ref",
          "ref": "MediaHeight"
        },
        "media_key": {
          "type": "ref",
          "ref": "MediaKey"
        },
        "type": {
          "type": "string"
        },
        "width": {
          "type": "ref",
          "ref": "MediaWidth"
        }
      },
      "required": [
        "type"
      ]
    },
    "MediaAnalytics": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "media_key": {
                "type": "ref",
                "ref": "MediaKey"
              },
              "timestamped_metrics": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "MediaTimestampedMetrics"
                }
              }
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "MediaCategory": {
      "type": "string"
    },
    "MediaCategoryOneShot": {
      "type": "string"
    },
    "MediaCategorySubtitles": {
      "type": "string"
    },
    "MediaHashKey": {
      "type": "string"
    },
    "MediaHeight": {
      "type": "number"
    },
    "MediaId": {
      "type": "string"
    },
    "MediaKey": {
      "type": "string"
    },
    "MediaMetrics": {
      "type": "object",
      "properties": {
        "cta_url_clicks": {
          "type": "number"
        },
        "cta_watch_clicks": {
          "type": "number"
        },
        "play_from_tap": {
          "type": "number"
        },
        "playback25": {
          "type": "number"
        },
        "playback50": {
          "type": "number"
        },
        "playback75": {
          "type": "number"
        },
        "playback_complete": {
          "type": "number"
        },
        "playback_start": {
          "type": "number"
        },
        "video_views": {
          "type": "number"
        },
        "watch_time_ms": {
          "type": "number"
        }
      }
    },
    "MediaPayloadBinary": {
      "type": "string"
    },
    "MediaPayloadByte": {
      "type": "string"
    },
    "MediaSegments": {
      "type": "number"
    },
    "MediaTimestampedMetrics": {
      "type": "object",
      "properties": {
        "metrics": {
          "type": "ref",
          "ref": "MediaMetrics"
        },
        "timestamp": {
          "type": "string"
        }
      }
    },
    "MediaUploadAppendRequest": {
      "type": "object",
      "properties": {
        "media": {
          "type": "ref",
          "ref": "MediaPayloadBinary"
        },
        "segment_index": {
          "type": "ref",
          "ref": "MediaSegments"
        }
      },
      "required": [
        "media",
        "segment_index"
      ]
    },
    "MediaUploadAppendResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "expires_at": {
              "type": "number"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      },
      "required": [
        "meta"
      ]
    },
    "MediaUploadConfigRequest": {
      "type": "object",
      "properties": {
        "additional_owners": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserId"
          }
        },
        "media_category": {
          "type": "ref",
          "ref": "MediaCategory"
        },
        "media_type": {
          "type": "string"
        },
        "shared": {
          "type": "boolean"
        },
        "total_bytes": {
          "type": "number"
        }
      }
    },
    "MediaUploadRequestOneShot": {
      "type": "object",
      "properties": {
        "additional_owners": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserId"
          }
        },
        "media": {
          "type": "ref",
          "ref": "MediaPayloadBinary"
        },
        "media_category": {
          "type": "ref",
          "ref": "MediaCategoryOneShot"
        },
        "media_type": {
          "type": "string"
        },
        "shared": {
          "type": "boolean"
        }
      },
      "required": [
        "media",
        "media_category"
      ]
    },
    "MediaUploadResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "expires_after_secs": {
              "type": "number"
            },
            "id": {
              "type": "ref",
              "ref": "MediaId"
            },
            "media_key": {
              "type": "ref",
              "ref": "MediaKey"
            },
            "processing_info": {
              "type": "ref",
              "ref": "ProcessingInfo"
            },
            "size": {
              "type": "number"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      },
      "required": [
        "meta"
      ]
    },
    "MediaWidth": {
      "type": "number"
    },
    "MentionEntity": {
      "type": "ref",
      "ref": "EntityIndicesInclusiveExclusive"
    },
    "MentionFields": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "UserId"
        },
        "username": {
          "type": "ref",
          "ref": "UserName"
        }
      },
      "required": [
        "username"
      ]
    },
    "MetadataCreateRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "MediaId"
        },
        "metadata": {
          "type": "object",
          "properties": {
            "allow_download_status": {
              "type": "ref",
              "ref": "AllowDownloadStatus"
            },
            "alt_text": {
              "type": "ref",
              "ref": "AltText"
            },
            "audience_policy": {
              "type": "ref",
              "ref": "AudiencePolicy"
            },
            "content_expiration": {
              "type": "ref",
              "ref": "ContentExpiration"
            },
            "domain_restrictions": {
              "type": "ref",
              "ref": "DomainRestrictions"
            },
            "found_media_origin": {
              "type": "ref",
              "ref": "FoundMediaOrigin"
            },
            "geo_restrictions": {
              "type": "ref",
              "ref": "GeoRestrictions"
            },
            "management_info": {
              "type": "ref",
              "ref": "ManagementInfo"
            },
            "preview_image": {
              "type": "ref",
              "ref": "PreviewImage"
            },
            "sensitive_media_warning": {
              "type": "ref",
              "ref": "SensitiveMediaWarning"
            },
            "shared_info": {
              "type": "ref",
              "ref": "SharedInfo"
            },
            "sticker_info": {
              "type": "ref",
              "ref": "StickerInfo"
            },
            "upload_source": {
              "type": "ref",
              "ref": "UploadSource"
            }
          }
        }
      },
      "required": [
        "id"
      ]
    },
    "MetadataCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "associated_metadata": {
              "type": "object",
              "properties": {
                "allow_download_status": {
                  "type": "ref",
                  "ref": "AllowDownloadStatus"
                },
                "alt_text": {
                  "type": "ref",
                  "ref": "AltText"
                },
                "audience_policy": {
                  "type": "ref",
                  "ref": "AudiencePolicy"
                },
                "content_expiration": {
                  "type": "ref",
                  "ref": "ContentExpiration"
                },
                "domain_restrictions": {
                  "type": "ref",
                  "ref": "DomainRestrictions"
                },
                "found_media_origin": {
                  "type": "ref",
                  "ref": "FoundMediaOrigin"
                },
                "geo_restrictions": {
                  "type": "ref",
                  "ref": "GeoRestrictions"
                },
                "management_info": {
                  "type": "ref",
                  "ref": "ManagementInfo"
                },
                "preview_image": {
                  "type": "ref",
                  "ref": "PreviewImage"
                },
                "sensitive_media_warning": {
                  "type": "ref",
                  "ref": "SensitiveMediaWarning"
                },
                "shared_info": {
                  "type": "ref",
                  "ref": "SharedInfo"
                },
                "sticker_info": {
                  "type": "ref",
                  "ref": "StickerInfo"
                },
                "upload_source": {
                  "type": "ref",
                  "ref": "UploadSource"
                }
              }
            },
            "id": {
              "type": "ref",
              "ref": "MediaId"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Metrics": {
      "type": "object",
      "properties": {
        "app_install_attempts": {
          "type": "number"
        },
        "app_opens": {
          "type": "number"
        },
        "detail_expands": {
          "type": "number"
        },
        "email_tweet": {
          "type": "number"
        },
        "engagements": {
          "type": "number"
        },
        "follows": {
          "type": "number"
        },
        "hashtag_clicks": {
          "type": "number"
        },
        "impressions": {
          "type": "number"
        },
        "likes": {
          "type": "number"
        },
        "link_clicks": {
          "type": "number"
        },
        "media_engagements": {
          "type": "number"
        },
        "media_views": {
          "type": "number"
        },
        "permalink_clicks": {
          "type": "number"
        },
        "profile_visits": {
          "type": "number"
        },
        "quote_tweets": {
          "type": "number"
        },
        "replies": {
          "type": "number"
        },
        "retweets": {
          "type": "number"
        },
        "url_clicks": {
          "type": "number"
        },
        "user_profile_clicks": {
          "type": "number"
        }
      }
    },
    "MisleadingTags": {
      "type": "string"
    },
    "MuteUserMutationResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "muting": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "MuteUserRequest": {
      "type": "object",
      "properties": {
        "target_user_id": {
          "type": "ref",
          "ref": "UserId"
        }
      },
      "required": [
        "target_user_id"
      ]
    },
    "NewestId": {
      "type": "string"
    },
    "News": {
      "type": "object",
      "properties": {
        "category": {
          "type": "string"
        },
        "cluster_posts_results": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "post_id": {
                "type": "ref",
                "ref": "TweetId"
              }
            }
          }
        },
        "contexts": {
          "type": "object",
          "properties": {
            "entities": {
              "type": "object",
              "properties": {
                "events": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "organizations": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "people": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "places": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "products": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            },
            "finance": {
              "type": "object",
              "properties": {
                "tickers": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            },
            "sports": {
              "type": "object",
              "properties": {
                "teams": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            },
            "topics": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        },
        "disclaimer": {
          "type": "string"
        },
        "hook": {
          "type": "string"
        },
        "keywords": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "last_updated_at_ms": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "rest_id": {
          "type": "ref",
          "ref": "NewsId"
        },
        "summary": {
          "type": "string"
        }
      },
      "required": [
        "rest_id"
      ]
    },
    "NewsActivityResponsePayload": {
      "type": "object",
      "properties": {
        "category": {
          "type": "string"
        },
        "headline": {
          "type": "string"
        },
        "hook": {
          "type": "string"
        },
        "summary": {
          "type": "string"
        }
      }
    },
    "NewsId": {
      "type": "string"
    },
    "NextToken": {
      "type": "string"
    },
    "NonCompliantRulesProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "Note": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "NoteId"
        },
        "info": {
          "type": "ref",
          "ref": "NoteInfo"
        },
        "post_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "scoring_status": {
          "type": "ref",
          "ref": "NoteScoringStatus"
        },
        "status": {
          "type": "ref",
          "ref": "NoteRatingStatus"
        },
        "test_result": {
          "type": "ref",
          "ref": "NoteTestResult"
        }
      },
      "required": [
        "id",
        "post_id",
        "note_info"
      ]
    },
    "NoteClassification": {
      "type": "string"
    },
    "NoteFactorBucketCounts": {
      "type": "object",
      "properties": {
        "helpful_count": {
          "type": "number"
        },
        "helpful_tag_counts": {
          "type": "object",
          "properties": {
            "tag_count": {
              "type": "number"
            },
            "tag_name": {
              "type": "string"
            }
          }
        },
        "not_helpful_count": {
          "type": "number"
        },
        "not_helpful_tag_counts": {
          "type": "object",
          "properties": {
            "tag_count": {
              "type": "number"
            },
            "tag_name": {
              "type": "string"
            }
          }
        },
        "somewhat_helpful_count": {
          "type": "number"
        }
      }
    },
    "NoteId": {
      "type": "string"
    },
    "NoteInfo": {
      "type": "object",
      "properties": {
        "classification": {
          "type": "ref",
          "ref": "NoteClassification"
        },
        "is_media_note": {
          "type": "boolean"
        },
        "misleading_tags": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MisleadingTags"
          }
        },
        "text": {
          "type": "string"
        },
        "trustworthy_sources": {
          "type": "boolean"
        }
      },
      "required": [
        "text",
        "classification",
        "misleading_tags",
        "trustworthy_sources"
      ]
    },
    "NoteRatingCountsPerModel": {
      "type": "object",
      "properties": {
        "negative_factor_bucket_counts": {
          "type": "ref",
          "ref": "NoteFactorBucketCounts"
        },
        "neutral_factor_bucket_counts": {
          "type": "ref",
          "ref": "NoteFactorBucketCounts"
        },
        "positive_factor_bucket_counts": {
          "type": "ref",
          "ref": "NoteFactorBucketCounts"
        }
      }
    },
    "NoteRatingStatus": {
      "type": "string"
    },
    "NoteScoringStatus": {
      "type": "object",
      "properties": {
        "has_access": {
          "type": "boolean"
        },
        "rating_counts_per_model": {
          "type": "object",
          "properties": {
            "model_name": {
              "type": "string"
            },
            "value": {
              "type": "ref",
              "ref": "NoteRatingCountsPerModel"
            }
          }
        }
      }
    },
    "NoteTestResult": {
      "type": "object",
      "properties": {
        "evaluator_score_bucket": {
          "type": "string"
        },
        "evaluator_type": {
          "type": "string"
        }
      }
    },
    "NoteTweetText": {
      "type": "string"
    },
    "Oauth1PermissionsProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "OldestId": {
      "type": "string"
    },
    "OperationalDisconnectProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "PaginationToken32": {
      "type": "string"
    },
    "PaginationToken36": {
      "type": "string"
    },
    "PaginationTokenLong": {
      "type": "string"
    },
    "PersonalizedTrend": {
      "type": "object",
      "properties": {
        "category": {
          "type": "string"
        },
        "post_count": {
          "type": "number"
        },
        "trend_name": {
          "type": "string"
        },
        "trending_since": {
          "type": "string"
        }
      }
    },
    "Photo": {
      "type": "ref",
      "ref": "Media"
    },
    "Place": {
      "type": "object",
      "properties": {
        "contained_within": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PlaceId"
          }
        },
        "country": {
          "type": "string"
        },
        "country_code": {
          "type": "ref",
          "ref": "CountryCode"
        },
        "full_name": {
          "type": "string"
        },
        "geo": {
          "type": "ref",
          "ref": "Geo"
        },
        "id": {
          "type": "ref",
          "ref": "PlaceId"
        },
        "name": {
          "type": "string"
        },
        "place_type": {
          "type": "ref",
          "ref": "PlaceType"
        }
      },
      "required": [
        "id",
        "full_name"
      ]
    },
    "PlaceId": {
      "type": "string"
    },
    "PlaceType": {
      "type": "string"
    },
    "PlaidAccount": {
      "type": "object",
      "properties": {
        "accountCategory": {
          "type": "string"
        },
        "accountId": {
          "type": "string"
        },
        "accountNumberDisplay": {
          "type": "string"
        },
        "accountType": {
          "type": "string"
        },
        "availableBalance": {
          "type": "number"
        },
        "currency": {
          "type": "ref",
          "ref": "PlaidCurrency"
        },
        "currentBalance": {
          "type": "number"
        },
        "nickname": {
          "type": "string"
        },
        "productName": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      },
      "required": [
        "accountId",
        "accountCategory",
        "accountNumberDisplay",
        "accountType",
        "currency",
        "productName",
        "status"
      ]
    },
    "PlaidAccountContact": {
      "type": "object",
      "properties": {
        "addresses": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PlaidAddress"
          }
        },
        "emails": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "name": {
          "type": "ref",
          "ref": "PlaidName"
        },
        "relationship": {
          "type": "string"
        },
        "telephones": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PlaidTelephone"
          }
        }
      },
      "required": [
        "name",
        "addresses",
        "emails",
        "telephones"
      ]
    },
    "PlaidAccountPaymentNetwork": {
      "type": "object",
      "properties": {
        "bankId": {
          "type": "string"
        },
        "identifier": {
          "type": "string"
        },
        "transferIn": {
          "type": "boolean"
        },
        "transferOut": {
          "type": "boolean"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "identifier",
        "type",
        "transferIn",
        "transferOut",
        "bankId"
      ]
    },
    "PlaidAccountTransaction": {
      "type": "object",
      "properties": {
        "accountCategory": {
          "type": "string"
        },
        "amount": {
          "type": "number"
        },
        "debitCreditMemo": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "postedTimestamp": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "transactionId": {
          "type": "string"
        },
        "transactionTimestamp": {
          "type": "string"
        }
      },
      "required": [
        "accountCategory",
        "amount",
        "debitCreditMemo",
        "description",
        "status",
        "transactionId",
        "transactionTimestamp"
      ]
    },
    "PlaidAddress": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "line1": {
          "type": "string"
        },
        "line2": {
          "type": "string"
        },
        "postalCode": {
          "type": "string"
        },
        "region": {
          "type": "string"
        }
      },
      "required": [
        "city",
        "country",
        "line1"
      ]
    },
    "PlaidCurrency": {
      "type": "object",
      "properties": {
        "currencyCode": {
          "type": "string"
        }
      },
      "required": [
        "currencyCode"
      ]
    },
    "PlaidCustomer": {
      "type": "object",
      "properties": {
        "customerId": {
          "type": "ref",
          "ref": "UserId"
        }
      }
    },
    "PlaidName": {
      "type": "object",
      "properties": {
        "first": {
          "type": "string"
        },
        "last": {
          "type": "string"
        }
      },
      "required": [
        "first",
        "last"
      ]
    },
    "PlaidTelephone": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string"
        },
        "number": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "country",
        "number",
        "type"
      ]
    },
    "Point": {
      "type": "object",
      "properties": {
        "coordinates": {
          "type": "ref",
          "ref": "Position"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "coordinates"
      ]
    },
    "Poll": {
      "type": "object",
      "properties": {
        "duration_minutes": {
          "type": "number"
        },
        "end_datetime": {
          "type": "string"
        },
        "id": {
          "type": "ref",
          "ref": "PollId"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PollOption"
          }
        },
        "voting_status": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "options"
      ]
    },
    "PollId": {
      "type": "string"
    },
    "PollOption": {
      "type": "object",
      "properties": {
        "label": {
          "type": "ref",
          "ref": "PollOptionLabel"
        },
        "position": {
          "type": "number"
        },
        "votes": {
          "type": "number"
        }
      },
      "required": [
        "position",
        "label",
        "votes"
      ]
    },
    "PollOptionLabel": {
      "type": "string"
    },
    "Position": {
      "type": "array",
      "items": {
        "type": "number"
      }
    },
    "PreviewImage": {
      "type": "object",
      "properties": {
        "media_key": {
          "type": "object",
          "properties": {
            "media": {
              "type": "ref",
              "ref": "MediaId"
            },
            "media_category": {
              "type": "string"
            }
          }
        }
      },
      "required": [
        "media_key"
      ]
    },
    "PreviousToken": {
      "type": "string"
    },
    "Problem": {
      "type": "object",
      "properties": {
        "detail": {
          "type": "string"
        },
        "status": {
          "type": "number"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "title"
      ]
    },
    "ProcessingInfo": {
      "type": "object",
      "properties": {
        "check_after_secs": {
          "type": "number"
        },
        "progress_percent": {
          "type": "number"
        },
        "state": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "ProfileUpdateActivityResponsePayload": {
      "type": "object",
      "properties": {
        "after": {
          "type": "string"
        },
        "before": {
          "type": "string"
        }
      }
    },
    "PublicKey": {
      "type": "object",
      "properties": {
        "public_key": {
          "type": "string"
        },
        "signing_public_key": {
          "type": "string"
        },
        "token_map": {
          "type": "object",
          "properties": {
            "key_store_token_map_json": {
              "type": "string"
            },
            "max_guess_count": {
              "type": "number"
            },
            "realms": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "address": {
                    "type": "string"
                  },
                  "realm_id": {
                    "type": "string"
                  },
                  "token": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "version": {
          "type": "string"
        }
      }
    },
    "ReplayJobCreateResponse": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "job_id": {
          "type": "string"
        }
      },
      "required": [
        "job_id",
        "created_at"
      ]
    },
    "ReplySettings": {
      "type": "string"
    },
    "ReplySettingsWithVerifiedUsers": {
      "type": "string"
    },
    "ResourceNotFoundProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "ResourceUnauthorizedProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "ResourceUnavailableProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "ResultCount": {
      "type": "number"
    },
    "Rule": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "RuleId"
        },
        "tag": {
          "type": "ref",
          "ref": "RuleTag"
        },
        "value": {
          "type": "ref",
          "ref": "RuleValue"
        }
      },
      "required": [
        "value"
      ]
    },
    "RuleId": {
      "type": "string"
    },
    "RuleNoId": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "ref",
          "ref": "RuleTag"
        },
        "value": {
          "type": "ref",
          "ref": "RuleValue"
        }
      },
      "required": [
        "value"
      ]
    },
    "RuleTag": {
      "type": "string"
    },
    "RuleValue": {
      "type": "string"
    },
    "RulesCapProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "RulesCount": {
      "type": "object",
      "properties": {
        "all_project_client_apps": {
          "type": "ref",
          "ref": "AllProjectClientApps"
        },
        "cap_per_client_app": {
          "type": "number"
        },
        "cap_per_project": {
          "type": "number"
        },
        "client_app_rules_count": {
          "type": "ref",
          "ref": "AppRulesCount"
        },
        "project_rules_count": {
          "type": "number"
        }
      }
    },
    "RulesLookupResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Rule"
          }
        },
        "meta": {
          "type": "ref",
          "ref": "RulesResponseMetadata"
        }
      },
      "required": [
        "meta"
      ]
    },
    "RulesRequestSummary": {
      "type": "object",
      "properties": {
        "created": {
          "type": "number"
        },
        "invalid": {
          "type": "number"
        },
        "not_created": {
          "type": "number"
        },
        "valid": {
          "type": "number"
        }
      },
      "required": [
        "created",
        "not_created",
        "valid",
        "invalid"
      ]
    },
    "RulesResponseMetadata": {
      "type": "object",
      "properties": {
        "next_token": {
          "type": "ref",
          "ref": "NextToken"
        },
        "result_count": {
          "type": "number"
        },
        "sent": {
          "type": "string"
        },
        "summary": {
          "type": "ref",
          "ref": "RulesRequestSummary"
        }
      },
      "required": [
        "sent"
      ]
    },
    "SearchCount": {
      "type": "object",
      "properties": {
        "end": {
          "type": "ref",
          "ref": "End"
        },
        "start": {
          "type": "ref",
          "ref": "Start"
        },
        "tweet_count": {
          "type": "ref",
          "ref": "TweetCount"
        }
      },
      "required": [
        "end",
        "start",
        "tweet_count"
      ]
    },
    "SensitiveMediaWarning": {
      "type": "object",
      "properties": {
        "adult_content": {
          "type": "boolean"
        },
        "graphic_violence": {
          "type": "boolean"
        },
        "other": {
          "type": "boolean"
        }
      }
    },
    "SharedInfo": {
      "type": "object",
      "properties": {
        "shared": {
          "type": "boolean"
        }
      },
      "required": [
        "shared"
      ]
    },
    "Space": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "creator_id": {
          "type": "ref",
          "ref": "UserId"
        },
        "ended_at": {
          "type": "string"
        },
        "host_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserId"
          }
        },
        "id": {
          "type": "ref",
          "ref": "SpaceId"
        },
        "invited_user_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserId"
          }
        },
        "is_ticketed": {
          "type": "boolean"
        },
        "lang": {
          "type": "string"
        },
        "participant_count": {
          "type": "number"
        },
        "scheduled_start": {
          "type": "string"
        },
        "speaker_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UserId"
          }
        },
        "started_at": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "subscriber_count": {
          "type": "number"
        },
        "title": {
          "type": "string"
        },
        "topics": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "description": {
                "type": "string"
              },
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "name"
            ]
          }
        },
        "updated_at": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "state"
      ]
    },
    "SpaceId": {
      "type": "string"
    },
    "Start": {
      "type": "string"
    },
    "Sticker": {
      "type": "object",
      "properties": {
        "aspect_ratio": {
          "type": "number"
        },
        "group_annotation_id": {
          "type": "number"
        },
        "id": {
          "type": "string"
        },
        "sticker_set_annotation_id": {
          "type": "number"
        },
        "transform_a": {
          "type": "number"
        },
        "transform_b": {
          "type": "number"
        },
        "transform_c": {
          "type": "number"
        },
        "transform_d": {
          "type": "number"
        },
        "transform_tx": {
          "type": "number"
        },
        "transform_ty": {
          "type": "number"
        }
      }
    },
    "StickerInfo": {
      "type": "object",
      "properties": {
        "stickers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Sticker"
          }
        }
      },
      "required": [
        "stickers"
      ]
    },
    "StreamingLikeResponseV2": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "LikeWithTweetAuthor"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "StreamingTweetResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "Tweet"
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        },
        "includes": {
          "type": "ref",
          "ref": "Expansions"
        }
      }
    },
    "SubscriptionsCountGetResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "account_name": {
              "type": "string"
            },
            "provisioned_count": {
              "type": "string"
            },
            "subscriptions_count_all": {
              "type": "string"
            },
            "subscriptions_count_direct_messages": {
              "type": "string"
            }
          },
          "required": [
            "account_name",
            "provisioned_count",
            "subscriptions_count_all",
            "subscriptions_count_direct_messages"
          ]
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "SubscriptionsCreateRequest": {
      "type": "object",
      "properties": {}
    },
    "SubscriptionsCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "subscribed": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "SubscriptionsDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "subscribed": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "SubscriptionsGetResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "subscribed": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "SubscriptionsListGetResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "application_id": {
              "type": "string"
            },
            "subscriptions": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "user_id": {
                    "type": "string"
                  }
                }
              }
            },
            "webhook_id": {
              "type": "string"
            },
            "webhook_url": {
              "type": "string"
            }
          },
          "required": [
            "application_id",
            "webhook_id",
            "webhook_url",
            "subscriptions"
          ]
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "SubtitleLanguageCode": {
      "type": "string"
    },
    "Subtitles": {
      "type": "object",
      "properties": {
        "display_name": {
          "type": "string"
        },
        "id": {
          "type": "ref",
          "ref": "MediaId"
        },
        "language_code": {
          "type": "ref",
          "ref": "SubtitleLanguageCode"
        }
      }
    },
    "SubtitlesCreateRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "MediaId"
        },
        "media_category": {
          "type": "ref",
          "ref": "MediaCategorySubtitles"
        },
        "subtitles": {
          "type": "ref",
          "ref": "Subtitles"
        }
      }
    },
    "SubtitlesCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "associated_subtitles": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "Subtitles"
              }
            },
            "id": {
              "type": "ref",
              "ref": "MediaId"
            },
            "media_category": {
              "type": "ref",
              "ref": "MediaCategorySubtitles"
            }
          },
          "required": [
            "id",
            "media_category",
            "associated_subtitles"
          ]
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "SubtitlesDeleteRequest": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "MediaId"
        },
        "language_code": {
          "type": "ref",
          "ref": "SubtitleLanguageCode"
        },
        "media_category": {
          "type": "ref",
          "ref": "MediaCategorySubtitles"
        }
      }
    },
    "SubtitlesDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "deleted": {
              "type": "boolean"
            }
          },
          "required": [
            "deleted"
          ]
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "TimestampedMetrics": {
      "type": "object",
      "properties": {
        "metrics": {
          "type": "ref",
          "ref": "Metrics"
        },
        "timestamp": {
          "type": "string"
        }
      }
    },
    "Topic": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "id": {
          "type": "ref",
          "ref": "TopicId"
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
    "TopicId": {
      "type": "string"
    },
    "Trend": {
      "type": "object",
      "properties": {
        "trend_name": {
          "type": "string"
        },
        "tweet_count": {
          "type": "number"
        }
      }
    },
    "Tweet": {
      "type": "object",
      "properties": {
        "attachments": {
          "type": "object",
          "properties": {
            "media_keys": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "MediaKey"
              }
            },
            "media_source_tweet_id": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "TweetId"
              }
            },
            "poll_ids": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "PollId"
              }
            }
          }
        },
        "author_id": {
          "type": "ref",
          "ref": "UserId"
        },
        "community_id": {
          "type": "ref",
          "ref": "CommunityId"
        },
        "context_annotations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ContextAnnotation"
          }
        },
        "conversation_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "created_at": {
          "type": "string"
        },
        "display_text_range": {
          "type": "ref",
          "ref": "DisplayTextRange"
        },
        "edit_controls": {
          "type": "object",
          "properties": {
            "editable_until": {
              "type": "string"
            },
            "edits_remaining": {
              "type": "number"
            },
            "is_edit_eligible": {
              "type": "boolean"
            }
          },
          "required": [
            "is_edit_eligible",
            "editable_until",
            "edits_remaining"
          ]
        },
        "edit_history_tweet_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TweetId"
          }
        },
        "entities": {
          "type": "ref",
          "ref": "FullTextEntities"
        },
        "geo": {
          "type": "object",
          "properties": {
            "coordinates": {
              "type": "ref",
              "ref": "Point"
            },
            "place_id": {
              "type": "ref",
              "ref": "PlaceId"
            }
          }
        },
        "id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "in_reply_to_user_id": {
          "type": "ref",
          "ref": "UserId"
        },
        "lang": {
          "type": "string"
        },
        "matched_media_notes": {
          "type": "object",
          "properties": {
            "match_status": {
              "type": "string"
            },
            "note_id": {
              "type": "ref",
              "ref": "NoteId"
            }
          }
        },
        "non_public_metrics": {
          "type": "object",
          "properties": {
            "impression_count": {
              "type": "number"
            }
          }
        },
        "note_tweet": {
          "type": "object",
          "properties": {
            "entities": {
              "type": "object",
              "properties": {
                "cashtags": {
                  "type": "array",
                  "items": {
                    "type": "ref",
                    "ref": "CashtagEntity"
                  }
                },
                "hashtags": {
                  "type": "array",
                  "items": {
                    "type": "ref",
                    "ref": "HashtagEntity"
                  }
                },
                "mentions": {
                  "type": "array",
                  "items": {
                    "type": "ref",
                    "ref": "MentionEntity"
                  }
                },
                "urls": {
                  "type": "array",
                  "items": {
                    "type": "ref",
                    "ref": "UrlEntity"
                  }
                }
              }
            },
            "text": {
              "type": "ref",
              "ref": "NoteTweetText"
            }
          }
        },
        "organic_metrics": {
          "type": "object",
          "properties": {
            "impression_count": {
              "type": "number"
            },
            "like_count": {
              "type": "number"
            },
            "reply_count": {
              "type": "number"
            },
            "retweet_count": {
              "type": "number"
            }
          },
          "required": [
            "impression_count",
            "retweet_count",
            "reply_count",
            "like_count"
          ]
        },
        "possibly_sensitive": {
          "type": "boolean"
        },
        "promoted_metrics": {
          "type": "object",
          "properties": {
            "impression_count": {
              "type": "number"
            },
            "like_count": {
              "type": "number"
            },
            "reply_count": {
              "type": "number"
            },
            "retweet_count": {
              "type": "number"
            }
          }
        },
        "public_metrics": {
          "type": "object",
          "properties": {
            "bookmark_count": {
              "type": "number"
            },
            "impression_count": {
              "type": "number"
            },
            "like_count": {
              "type": "number"
            },
            "quote_count": {
              "type": "number"
            },
            "reply_count": {
              "type": "number"
            },
            "retweet_count": {
              "type": "number"
            }
          },
          "required": [
            "retweet_count",
            "reply_count",
            "like_count",
            "impression_count",
            "bookmark_count"
          ]
        },
        "referenced_tweets": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "ref",
                "ref": "TweetId"
              },
              "type": {
                "type": "string"
              }
            },
            "required": [
              "type",
              "id"
            ]
          }
        },
        "reply_settings": {
          "type": "ref",
          "ref": "ReplySettingsWithVerifiedUsers"
        },
        "scopes": {
          "type": "object",
          "properties": {
            "followers": {
              "type": "boolean"
            }
          }
        },
        "source": {
          "type": "string"
        },
        "suggested_source_links": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UrlEntity"
          }
        },
        "suggested_source_links_with_counts": {
          "type": "object",
          "properties": {
            "count": {
              "type": "number"
            },
            "url": {
              "type": "ref",
              "ref": "UrlEntity"
            }
          }
        },
        "text": {
          "type": "ref",
          "ref": "TweetText"
        },
        "username": {
          "type": "ref",
          "ref": "UserName"
        },
        "withheld": {
          "type": "ref",
          "ref": "TweetWithheld"
        }
      }
    },
    "TweetComplianceData": {
      "type": "ref",
      "ref": "TweetDeleteComplianceSchema"
    },
    "TweetComplianceSchema": {
      "type": "object",
      "properties": {
        "event_at": {
          "type": "string"
        },
        "quote_tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "tweet": {
          "type": "object",
          "properties": {
            "author_id": {
              "type": "ref",
              "ref": "UserId"
            },
            "id": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": [
            "id",
            "author_id"
          ]
        }
      },
      "required": [
        "tweet",
        "event_at"
      ]
    },
    "TweetComplianceStreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "TweetComplianceData"
        }
      },
      "required": [
        "data"
      ]
    },
    "TweetCount": {
      "type": "number"
    },
    "TweetCreateRequest": {
      "type": "object",
      "properties": {
        "card_uri": {
          "type": "string"
        },
        "community_id": {
          "type": "ref",
          "ref": "CommunityId"
        },
        "direct_message_deep_link": {
          "type": "string"
        },
        "edit_options": {
          "type": "object",
          "properties": {
            "previous_post_id": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": [
            "previous_post_id"
          ]
        },
        "for_super_followers_only": {
          "type": "boolean"
        },
        "geo": {
          "type": "object",
          "properties": {
            "place_id": {
              "type": "string"
            }
          }
        },
        "made_with_ai": {
          "type": "boolean"
        },
        "media": {
          "type": "object",
          "properties": {
            "call_to_actions": {
              "type": "object",
              "properties": {
                "app_install": {
                  "type": "object",
                  "properties": {
                    "app_store_id": {
                      "type": "string"
                    },
                    "ipad_app_store_id": {
                      "type": "string"
                    },
                    "play_store_id": {
                      "type": "string"
                    }
                  }
                },
                "visit_site": {
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
                "watch_now": {
                  "type": "object",
                  "properties": {
                    "url": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "url"
                  ]
                }
              }
            },
            "description": {
              "type": "string"
            },
            "embeddable": {
              "type": "boolean"
            },
            "media_ids": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "MediaId"
              }
            },
            "preview_media_id": {
              "type": "ref",
              "ref": "MediaId"
            },
            "tagged_user_ids": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "UserId"
              }
            },
            "title": {
              "type": "string"
            }
          },
          "required": [
            "media_ids"
          ]
        },
        "nullcast": {
          "type": "boolean"
        },
        "paid_partnership": {
          "type": "boolean"
        },
        "poll": {
          "type": "object",
          "properties": {
            "duration_minutes": {
              "type": "number"
            },
            "options": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "reply_settings": {
              "type": "string"
            }
          },
          "required": [
            "options",
            "duration_minutes"
          ]
        },
        "quote_tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "reply": {
          "type": "object",
          "properties": {
            "auto_populate_reply_metadata": {
              "type": "boolean"
            },
            "exclude_reply_user_ids": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "UserId"
              }
            },
            "in_reply_to_tweet_id": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": [
            "in_reply_to_tweet_id"
          ]
        },
        "reply_settings": {
          "type": "string"
        },
        "share_with_followers": {
          "type": "boolean"
        },
        "text": {
          "type": "ref",
          "ref": "TweetText"
        }
      }
    },
    "TweetCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "TweetId"
            },
            "text": {
              "type": "ref",
              "ref": "TweetText"
            }
          },
          "required": [
            "id",
            "text"
          ]
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "TweetDeleteComplianceSchema": {
      "type": "object",
      "properties": {
        "delete": {
          "type": "ref",
          "ref": "TweetComplianceSchema"
        }
      },
      "required": [
        "delete"
      ]
    },
    "TweetDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "deleted": {
              "type": "boolean"
            }
          },
          "required": [
            "deleted"
          ]
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "TweetDropComplianceSchema": {
      "type": "object",
      "properties": {
        "drop": {
          "type": "ref",
          "ref": "TweetComplianceSchema"
        }
      },
      "required": [
        "drop"
      ]
    },
    "TweetEditComplianceObjectSchema": {
      "type": "object",
      "properties": {
        "edit_tweet_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TweetId"
          }
        },
        "event_at": {
          "type": "string"
        },
        "initial_tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "tweet": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": [
            "id"
          ]
        }
      },
      "required": [
        "tweet",
        "event_at",
        "initial_tweet_id",
        "edit_tweet_ids"
      ]
    },
    "TweetEditComplianceSchema": {
      "type": "object",
      "properties": {
        "tweet_edit": {
          "type": "ref",
          "ref": "TweetEditComplianceObjectSchema"
        }
      },
      "required": [
        "tweet_edit"
      ]
    },
    "TweetHideRequest": {
      "type": "object",
      "properties": {
        "hidden": {
          "type": "boolean"
        }
      },
      "required": [
        "hidden"
      ]
    },
    "TweetHideResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "hidden": {
              "type": "boolean"
            }
          }
        }
      }
    },
    "TweetId": {
      "type": "string"
    },
    "TweetLabelData": {
      "type": "ref",
      "ref": "TweetNoticeSchema"
    },
    "TweetLabelStreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "TweetLabelData"
        }
      },
      "required": [
        "data"
      ]
    },
    "TweetNotice": {
      "type": "object",
      "properties": {
        "application": {
          "type": "string"
        },
        "details": {
          "type": "string"
        },
        "event_at": {
          "type": "string"
        },
        "event_type": {
          "type": "string"
        },
        "extended_details_url": {
          "type": "string"
        },
        "label_title": {
          "type": "string"
        },
        "tweet": {
          "type": "object",
          "properties": {
            "author_id": {
              "type": "ref",
              "ref": "UserId"
            },
            "id": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": [
            "id",
            "author_id"
          ]
        }
      },
      "required": [
        "tweet",
        "event_type",
        "event_at",
        "application"
      ]
    },
    "TweetNoticeSchema": {
      "type": "object",
      "properties": {
        "public_tweet_notice": {
          "type": "ref",
          "ref": "TweetNotice"
        }
      },
      "required": [
        "public_tweet_notice"
      ]
    },
    "TweetTakedownComplianceSchema": {
      "type": "object",
      "properties": {
        "event_at": {
          "type": "string"
        },
        "quote_tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "tweet": {
          "type": "object",
          "properties": {
            "author_id": {
              "type": "ref",
              "ref": "UserId"
            },
            "id": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": [
            "id",
            "author_id"
          ]
        },
        "withheld_in_countries": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        }
      },
      "required": [
        "tweet",
        "withheld_in_countries",
        "event_at"
      ]
    },
    "TweetText": {
      "type": "string"
    },
    "TweetUndropComplianceSchema": {
      "type": "object",
      "properties": {
        "undrop": {
          "type": "ref",
          "ref": "TweetComplianceSchema"
        }
      },
      "required": [
        "undrop"
      ]
    },
    "TweetUnviewable": {
      "type": "object",
      "properties": {
        "application": {
          "type": "string"
        },
        "event_at": {
          "type": "string"
        },
        "tweet": {
          "type": "object",
          "properties": {
            "author_id": {
              "type": "ref",
              "ref": "UserId"
            },
            "id": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": [
            "id",
            "author_id"
          ]
        }
      },
      "required": [
        "tweet",
        "event_at",
        "application"
      ]
    },
    "TweetUnviewableSchema": {
      "type": "object",
      "properties": {
        "public_tweet_unviewable": {
          "type": "ref",
          "ref": "TweetUnviewable"
        }
      },
      "required": [
        "public_tweet_unviewable"
      ]
    },
    "TweetWithheld": {
      "type": "object",
      "properties": {
        "copyright": {
          "type": "boolean"
        },
        "country_codes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        },
        "scope": {
          "type": "string"
        }
      },
      "required": [
        "copyright",
        "country_codes"
      ]
    },
    "TweetWithheldComplianceSchema": {
      "type": "object",
      "properties": {
        "withheld": {
          "type": "ref",
          "ref": "TweetTakedownComplianceSchema"
        }
      },
      "required": [
        "withheld"
      ]
    },
    "UnlikeComplianceSchema": {
      "type": "object",
      "properties": {
        "event_at": {
          "type": "string"
        },
        "favorite": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "TweetId"
            },
            "user_id": {
              "type": "ref",
              "ref": "UserId"
            }
          },
          "required": [
            "id",
            "user_id"
          ]
        }
      },
      "required": [
        "favorite",
        "event_at"
      ]
    },
    "UnsupportedAuthenticationProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "UploadExpiration": {
      "type": "string"
    },
    "UploadSource": {
      "type": "object",
      "properties": {
        "upload_source": {
          "type": "string"
        }
      },
      "required": [
        "upload_source"
      ]
    },
    "UploadUrl": {
      "type": "string"
    },
    "Url": {
      "type": "string"
    },
    "UrlEntity": {
      "type": "ref",
      "ref": "EntityIndicesInclusiveExclusive"
    },
    "UrlEntityDm": {
      "type": "ref",
      "ref": "EntityIndicesInclusiveExclusive"
    },
    "UrlFields": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "display_url": {
          "type": "string"
        },
        "expanded_url": {
          "type": "ref",
          "ref": "Url"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "UrlImage"
          }
        },
        "media_key": {
          "type": "ref",
          "ref": "MediaKey"
        },
        "status": {
          "type": "ref",
          "ref": "HttpStatusCode"
        },
        "title": {
          "type": "string"
        },
        "unwound_url": {
          "type": "string"
        },
        "url": {
          "type": "ref",
          "ref": "Url"
        }
      },
      "required": [
        "url"
      ]
    },
    "UrlImage": {
      "type": "object",
      "properties": {
        "height": {
          "type": "ref",
          "ref": "MediaHeight"
        },
        "url": {
          "type": "ref",
          "ref": "Url"
        },
        "width": {
          "type": "ref",
          "ref": "MediaWidth"
        }
      }
    },
    "Usage": {
      "type": "object",
      "properties": {
        "cap_reset_day": {
          "type": "number"
        },
        "daily_client_app_usage": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ClientAppUsage"
          }
        },
        "daily_project_usage": {
          "type": "object",
          "properties": {
            "project_id": {
              "type": "number"
            },
            "usage": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "UsageFields"
              }
            }
          }
        },
        "project_cap": {
          "type": "number"
        },
        "project_id": {
          "type": "string"
        },
        "project_usage": {
          "type": "number"
        }
      }
    },
    "UsageCapExceededProblem": {
      "type": "ref",
      "ref": "Problem"
    },
    "UsageFields": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        },
        "usage": {
          "type": "number"
        }
      }
    },
    "User": {
      "type": "object",
      "properties": {
        "affiliation": {
          "type": "object",
          "properties": {
            "badge_url": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "url": {
              "type": "string"
            },
            "user_id": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "UserId"
              }
            }
          }
        },
        "connection_status": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "created_at": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "entities": {
          "type": "object",
          "properties": {
            "description": {
              "type": "ref",
              "ref": "FullTextEntities"
            },
            "url": {
              "type": "object",
              "properties": {
                "urls": {
                  "type": "array",
                  "items": {
                    "type": "ref",
                    "ref": "UrlEntity"
                  }
                }
              }
            }
          }
        },
        "id": {
          "type": "ref",
          "ref": "UserId"
        },
        "location": {
          "type": "string"
        },
        "most_recent_tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "name": {
          "type": "string"
        },
        "pinned_tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "profile_banner_url": {
          "type": "string"
        },
        "profile_image_url": {
          "type": "string"
        },
        "protected": {
          "type": "boolean"
        },
        "public_metrics": {
          "type": "object",
          "properties": {
            "followers_count": {
              "type": "number"
            },
            "following_count": {
              "type": "number"
            },
            "like_count": {
              "type": "number"
            },
            "listed_count": {
              "type": "number"
            },
            "tweet_count": {
              "type": "number"
            }
          },
          "required": [
            "followers_count",
            "following_count",
            "tweet_count",
            "listed_count"
          ]
        },
        "receives_your_dm": {
          "type": "boolean"
        },
        "subscription_type": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "username": {
          "type": "ref",
          "ref": "UserName"
        },
        "verified": {
          "type": "boolean"
        },
        "verified_type": {
          "type": "string"
        },
        "withheld": {
          "type": "ref",
          "ref": "UserWithheld"
        }
      },
      "required": [
        "id",
        "name",
        "username"
      ]
    },
    "UserComplianceData": {
      "type": "ref",
      "ref": "UserProtectComplianceSchema"
    },
    "UserComplianceSchema": {
      "type": "object",
      "properties": {
        "event_at": {
          "type": "string"
        },
        "user": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "UserId"
            }
          },
          "required": [
            "id"
          ]
        }
      },
      "required": [
        "user",
        "event_at"
      ]
    },
    "UserComplianceStreamResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "UserComplianceData"
        }
      },
      "required": [
        "data"
      ]
    },
    "UserDeleteComplianceSchema": {
      "type": "object",
      "properties": {
        "user_delete": {
          "type": "ref",
          "ref": "UserComplianceSchema"
        }
      },
      "required": [
        "user_delete"
      ]
    },
    "UserId": {
      "type": "string"
    },
    "UserIdMatchesAuthenticatedUser": {
      "type": "string"
    },
    "UserName": {
      "type": "string"
    },
    "UserProfileModificationComplianceSchema": {
      "type": "object",
      "properties": {
        "user_profile_modification": {
          "type": "ref",
          "ref": "UserProfileModificationObjectSchema"
        }
      },
      "required": [
        "user_profile_modification"
      ]
    },
    "UserProfileModificationObjectSchema": {
      "type": "object",
      "properties": {
        "event_at": {
          "type": "string"
        },
        "new_value": {
          "type": "string"
        },
        "profile_field": {
          "type": "string"
        },
        "user": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "UserId"
            }
          },
          "required": [
            "id"
          ]
        }
      },
      "required": [
        "user",
        "profile_field",
        "new_value",
        "event_at"
      ]
    },
    "UserProtectComplianceSchema": {
      "type": "object",
      "properties": {
        "user_protect": {
          "type": "ref",
          "ref": "UserComplianceSchema"
        }
      },
      "required": [
        "user_protect"
      ]
    },
    "UserScrubGeoObjectSchema": {
      "type": "object",
      "properties": {
        "event_at": {
          "type": "string"
        },
        "up_to_tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        },
        "user": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "UserId"
            }
          },
          "required": [
            "id"
          ]
        }
      },
      "required": [
        "user",
        "up_to_tweet_id",
        "event_at"
      ]
    },
    "UserScrubGeoSchema": {
      "type": "object",
      "properties": {
        "scrub_geo": {
          "type": "ref",
          "ref": "UserScrubGeoObjectSchema"
        }
      },
      "required": [
        "scrub_geo"
      ]
    },
    "UserSearchQueryVnext": {
      "type": "string"
    },
    "UserSuspendComplianceSchema": {
      "type": "object",
      "properties": {
        "user_suspend": {
          "type": "ref",
          "ref": "UserComplianceSchema"
        }
      },
      "required": [
        "user_suspend"
      ]
    },
    "UserTakedownComplianceSchema": {
      "type": "object",
      "properties": {
        "event_at": {
          "type": "string"
        },
        "user": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "UserId"
            }
          },
          "required": [
            "id"
          ]
        },
        "withheld_in_countries": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        }
      },
      "required": [
        "user",
        "withheld_in_countries",
        "event_at"
      ]
    },
    "UserUndeleteComplianceSchema": {
      "type": "object",
      "properties": {
        "user_undelete": {
          "type": "ref",
          "ref": "UserComplianceSchema"
        }
      },
      "required": [
        "user_undelete"
      ]
    },
    "UserUnprotectComplianceSchema": {
      "type": "object",
      "properties": {
        "user_unprotect": {
          "type": "ref",
          "ref": "UserComplianceSchema"
        }
      },
      "required": [
        "user_unprotect"
      ]
    },
    "UserUnsuspendComplianceSchema": {
      "type": "object",
      "properties": {
        "user_unsuspend": {
          "type": "ref",
          "ref": "UserComplianceSchema"
        }
      },
      "required": [
        "user_unsuspend"
      ]
    },
    "UserWithheld": {
      "type": "object",
      "properties": {
        "country_codes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        },
        "scope": {
          "type": "string"
        }
      },
      "required": [
        "country_codes"
      ]
    },
    "UserWithheldComplianceSchema": {
      "type": "object",
      "properties": {
        "user_withheld": {
          "type": "ref",
          "ref": "UserTakedownComplianceSchema"
        }
      },
      "required": [
        "user_withheld"
      ]
    },
    "UsersDMBlockCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "blocked": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "UsersDMUnBlockCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "blocked": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "UsersFollowingCreateRequest": {
      "type": "object",
      "properties": {
        "target_user_id": {
          "type": "ref",
          "ref": "UserId"
        }
      },
      "required": [
        "target_user_id"
      ]
    },
    "UsersFollowingCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "following": {
              "type": "boolean"
            },
            "pending_follow": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "UsersFollowingDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "following": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "UsersLikesCreateRequest": {
      "type": "object",
      "properties": {
        "tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        }
      },
      "required": [
        "tweet_id"
      ]
    },
    "UsersLikesCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "liked": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "UsersLikesDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "liked": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "UsersRetweetsCreateRequest": {
      "type": "object",
      "properties": {
        "tweet_id": {
          "type": "ref",
          "ref": "TweetId"
        }
      },
      "required": [
        "tweet_id"
      ]
    },
    "UsersRetweetsCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "id": {
              "type": "ref",
              "ref": "TweetId"
            },
            "retweeted": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "UsersRetweetsDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "retweeted": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "Variant": {
      "type": "object",
      "properties": {
        "bit_rate": {
          "type": "number"
        },
        "content_type": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    },
    "Variants": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "Variant"
      }
    },
    "Video": {
      "type": "ref",
      "ref": "Media"
    },
    "WebhookConfig": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "id": {
          "type": "ref",
          "ref": "WebhookConfigId"
        },
        "url": {
          "type": "string"
        },
        "valid": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "url",
        "valid",
        "created_at"
      ]
    },
    "WebhookConfigCreateRequest": {
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
    "WebhookConfigCreateResponse": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "id": {
          "type": "ref",
          "ref": "WebhookConfigId"
        },
        "url": {
          "type": "string"
        },
        "valid": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "url",
        "valid",
        "created_at"
      ]
    },
    "WebhookConfigDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "deleted": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "WebhookConfigId": {
      "type": "string"
    },
    "WebhookConfigPutResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "attempted": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "WebhookLinksCreateResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "provisioned": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "WebhookLinksDeleteResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "deleted": {
              "type": "boolean"
            }
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "WebhookLinksGetResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "links": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "application_id": {
                    "type": "string"
                  },
                  "business_user_id": {
                    "type": "string"
                  },
                  "created_at": {
                    "type": "string"
                  },
                  "fields": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "instance_id": {
                    "type": "string"
                  },
                  "webhook_id": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "required": [
            "links"
          ]
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Problem"
          }
        }
      }
    },
    "WebhookReplayCreateRequest": {
      "type": "object",
      "properties": {
        "from_date": {
          "type": "string"
        },
        "to_date": {
          "type": "string"
        },
        "webhook_id": {
          "type": "ref",
          "ref": "WebhookConfigId"
        }
      },
      "required": [
        "webhook_id",
        "from_date",
        "to_date"
      ]
    }
  },
  "entities": {},
  "queries": {
    "getAccountActivitySubscriptionCount": {
      "name": "Get subscription count",
      "schema": {
        "type": "ref",
        "ref": "SubscriptionsCountGetResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/account_activity/subscriptions/count"
        }
      }
    },
    "validateAccountActivitySubscription": {
      "name": "Validate subscription",
      "schema": {
        "type": "ref",
        "ref": "SubscriptionsGetResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "WebhookConfigId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/account_activity/webhooks/{webhook_id}/subscriptions/all",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "getAccountActivitySubscriptions": {
      "name": "Get subscriptions",
      "schema": {
        "type": "ref",
        "ref": "SubscriptionsListGetResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "WebhookConfigId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/account_activity/webhooks/{webhook_id}/subscriptions/all/list",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "activityStream": {
      "name": "Activity Stream",
      "schema": {
        "type": "ref",
        "ref": "ActivityStreamingResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/activity/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "getActivitySubscriptions": {
      "name": "Get X activity subscriptions",
      "schema": {
        "type": "ref",
        "ref": "ActivitySubscriptionGetResponse"
      },
      "args": {
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken32"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/activity/subscriptions",
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getChatConversations": {
      "name": "Get Chat Conversations",
      "schema": {
        "type": "ref",
        "ref": "ChatGetConversationsResponse"
      },
      "args": {
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/chat/conversations",
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getChatConversation": {
      "name": "Get Chat Conversation",
      "schema": {
        "type": "ref",
        "ref": "ChatGetConversationResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ChatConversationOrRecipientId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/chat/conversations/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "chatMediaDownload": {
      "name": "Download Chat Media",
      "schema": {
        "type": "object"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ChatConversationOrRecipientId"
          },
          "required": true
        },
        "media_hash_key": {
          "schema": {
            "type": "ref",
            "ref": "MediaHashKey"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/chat/media/{id}/{media_hash_key}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "media_hash_key": {
              "$resolve": "args.media_hash_key"
            }
          }
        }
      }
    },
    "searchCommunities": {
      "name": "Search Communities",
      "schema": {
        "type": "ref",
        "ref": "Get2CommunitiesSearchResponse"
      },
      "args": {
        "query": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "next_token": {
          "schema": {
            "type": "ref",
            "ref": "NextToken"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "NextToken"
          },
          "required": false
        },
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
          "path": "/2/communities/search",
          "query": {
            "query": {
              "$resolve": "args.query"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "next_token": {
              "$resolve": "args.next_token"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getCommunitiesById": {
      "name": "Get Community by ID",
      "schema": {
        "type": "ref",
        "ref": "Get2CommunitiesIdResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "CommunityId"
          },
          "required": true
        },
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
          "path": "/2/communities/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getComplianceJobs": {
      "name": "Get Compliance Jobs",
      "schema": {
        "type": "ref",
        "ref": "Get2ComplianceJobsResponse"
      },
      "args": {
        "type": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "status": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/compliance/jobs",
          "query": {
            "type": {
              "$resolve": "args.type"
            },
            "status": {
              "$resolve": "args.status"
            }
          }
        }
      }
    },
    "getComplianceJobsById": {
      "name": "Get Compliance Job by ID",
      "schema": {
        "type": "ref",
        "ref": "Get2ComplianceJobsIdResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "JobId"
          },
          "required": true
        },
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
          "path": "/2/compliance/jobs/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getConnectionHistory": {
      "name": "Get Connection History",
      "schema": {
        "type": "ref",
        "ref": "Get2ConnectionsResponse"
      },
      "args": {
        "status": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "endpoints": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/connections",
          "query": {
            "status": {
              "$resolve": "args.status"
            },
            "endpoints": {
              "$resolve": "args.endpoints"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "dmConversationsMediaDownload": {
      "name": "Download DM Media",
      "schema": {
        "type": "object"
      },
      "args": {
        "dm_id": {
          "schema": {
            "type": "ref",
            "ref": "DmEventId"
          },
          "required": true
        },
        "media_id": {
          "schema": {
            "type": "ref",
            "ref": "MediaId"
          },
          "required": true
        },
        "resource_id": {
          "schema": {
            "type": "ref",
            "ref": "DmResourceId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/dm_conversations/media/{dm_id}/{media_id}/{resource_id}",
          "params": {
            "dm_id": {
              "$resolve": "args.dm_id"
            },
            "media_id": {
              "$resolve": "args.media_id"
            },
            "resource_id": {
              "$resolve": "args.resource_id"
            }
          }
        }
      }
    },
    "getDirectMessagesEventsByParticipantId": {
      "name": "Get DM events for a DM conversation",
      "schema": {
        "type": "ref",
        "ref": "Get2DmConversationsWithParticipantIdDmEventsResponse"
      },
      "args": {
        "participant_id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken32"
          },
          "required": false
        },
        "event_types": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
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
          "path": "/2/dm_conversations/with/{participant_id}/dm_events",
          "params": {
            "participant_id": {
              "$resolve": "args.participant_id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "event_types": {
              "$resolve": "args.event_types"
            }
          }
        }
      }
    },
    "getDirectMessagesEventsByConversationId": {
      "name": "Get DM events for a DM conversation",
      "schema": {
        "type": "ref",
        "ref": "Get2DmConversationsIdDmEventsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "DmConversationId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken32"
          },
          "required": false
        },
        "event_types": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
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
          "path": "/2/dm_conversations/{id}/dm_events",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "event_types": {
              "$resolve": "args.event_types"
            }
          }
        }
      }
    },
    "getDirectMessagesEvents": {
      "name": "Get DM events",
      "schema": {
        "type": "ref",
        "ref": "Get2DmEventsResponse"
      },
      "args": {
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken32"
          },
          "required": false
        },
        "event_types": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
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
          "path": "/2/dm_events",
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "event_types": {
              "$resolve": "args.event_types"
            }
          }
        }
      }
    },
    "getDirectMessagesEventsById": {
      "name": "Get DM event by ID",
      "schema": {
        "type": "ref",
        "ref": "Get2DmEventsEventIdResponse"
      },
      "args": {
        "event_id": {
          "schema": {
            "type": "ref",
            "ref": "DmEventId"
          },
          "required": true
        },
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
          "path": "/2/dm_events/{event_id}",
          "params": {
            "event_id": {
              "$resolve": "args.event_id"
            }
          }
        }
      }
    },
    "getInsights28Hr": {
      "name": "Get 28-hour Post insights",
      "schema": {
        "type": "ref",
        "ref": "Get2Insights28hrResponse"
      },
      "args": {
        "tweet_ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": true
        },
        "granularity": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "requested_metrics": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": true
        },
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
          "path": "/2/insights/28hr",
          "query": {
            "tweet_ids": {
              "$resolve": "args.tweet_ids"
            },
            "granularity": {
              "$resolve": "args.granularity"
            },
            "requested_metrics": {
              "$resolve": "args.requested_metrics"
            }
          }
        }
      }
    },
    "getInsightsHistorical": {
      "name": "Get historical Post insights",
      "schema": {
        "type": "ref",
        "ref": "Get2InsightsHistoricalResponse"
      },
      "args": {
        "tweet_ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": true
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "granularity": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "requested_metrics": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": true
        },
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
          "path": "/2/insights/historical",
          "query": {
            "tweet_ids": {
              "$resolve": "args.tweet_ids"
            },
            "end_time": {
              "$resolve": "args.end_time"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "granularity": {
              "$resolve": "args.granularity"
            },
            "requested_metrics": {
              "$resolve": "args.requested_metrics"
            }
          }
        }
      }
    },
    "streamLikesCompliance": {
      "name": "Stream Likes compliance data",
      "schema": {
        "type": "ref",
        "ref": "LikesComplianceStreamResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/likes/compliance/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "streamLikesFirehose": {
      "name": "Stream all Likes",
      "schema": {
        "type": "ref",
        "ref": "StreamingLikeResponseV2"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/likes/firehose/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "streamLikesSample10": {
      "name": "Stream sampled Likes",
      "schema": {
        "type": "ref",
        "ref": "StreamingLikeResponseV2"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/likes/sample10/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "getListsById": {
      "name": "Get List by ID",
      "schema": {
        "type": "ref",
        "ref": "Get2ListsIdResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        },
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
          "path": "/2/lists/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getListsFollowers": {
      "name": "Get List followers",
      "schema": {
        "type": "ref",
        "ref": "Get2ListsIdFollowersResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationTokenLong"
          },
          "required": false
        },
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
          "path": "/2/lists/{id}/followers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getListsMembers": {
      "name": "Get List members",
      "schema": {
        "type": "ref",
        "ref": "Get2ListsIdMembersResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationTokenLong"
          },
          "required": false
        },
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
          "path": "/2/lists/{id}/members",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getListsPosts": {
      "name": "Get List Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2ListsIdTweetsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
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
          "path": "/2/lists/{id}/tweets",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getMediaByMediaKeys": {
      "name": "Get Media by media keys",
      "schema": {
        "type": "ref",
        "ref": "Get2MediaResponse"
      },
      "args": {
        "media_keys": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "MediaKey"
            }
          },
          "required": true
        },
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
          "path": "/2/media",
          "query": {
            "media_keys": {
              "$resolve": "args.media_keys"
            }
          }
        }
      }
    },
    "getMediaAnalytics": {
      "name": "Get Media analytics",
      "schema": {
        "type": "ref",
        "ref": "MediaAnalytics"
      },
      "args": {
        "media_keys": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "MediaKey"
            }
          },
          "required": true
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "granularity": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
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
          "path": "/2/media/analytics",
          "query": {
            "media_keys": {
              "$resolve": "args.media_keys"
            },
            "end_time": {
              "$resolve": "args.end_time"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "granularity": {
              "$resolve": "args.granularity"
            }
          }
        }
      }
    },
    "getMediaUploadStatus": {
      "name": "Get Media upload status",
      "schema": {
        "type": "ref",
        "ref": "MediaUploadResponse"
      },
      "args": {
        "media_id": {
          "schema": {
            "type": "ref",
            "ref": "MediaId"
          },
          "required": true
        },
        "command": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/media/upload",
          "query": {
            "media_id": {
              "$resolve": "args.media_id"
            },
            "command": {
              "$resolve": "args.command"
            }
          }
        }
      }
    },
    "getMediaByMediaKey": {
      "name": "Get Media by media key",
      "schema": {
        "type": "ref",
        "ref": "Get2MediaMediaKeyResponse"
      },
      "args": {
        "media_key": {
          "schema": {
            "type": "ref",
            "ref": "MediaKey"
          },
          "required": true
        },
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
          "path": "/2/media/{media_key}",
          "params": {
            "media_key": {
              "$resolve": "args.media_key"
            }
          }
        }
      }
    },
    "searchNews": {
      "name": "Search News",
      "schema": {
        "type": "ref",
        "ref": "Get2NewsSearchResponse"
      },
      "args": {
        "query": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_age_hours": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
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
          "path": "/2/news/search",
          "query": {
            "query": {
              "$resolve": "args.query"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "max_age_hours": {
              "$resolve": "args.max_age_hours"
            }
          }
        }
      }
    },
    "getNews": {
      "name": "Get news stories by ID",
      "schema": {
        "type": "ref",
        "ref": "Get2NewsIdResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "NewsId"
          },
          "required": true
        },
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
          "path": "/2/news/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "searchCommunityNotesWritten": {
      "name": "Search for Community Notes Written",
      "schema": {
        "type": "ref",
        "ref": "Get2NotesSearchNotesWrittenResponse"
      },
      "args": {
        "test_mode": {
          "schema": {
            "type": "boolean"
          },
          "required": true
        },
        "pagination_token": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
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
          "path": "/2/notes/search/notes_written",
          "query": {
            "test_mode": {
              "$resolve": "args.test_mode"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "max_results": {
              "$resolve": "args.max_results"
            }
          }
        }
      }
    },
    "searchEligiblePosts": {
      "name": "Search for Posts Eligible for Community Notes",
      "schema": {
        "type": "ref",
        "ref": "Get2NotesSearchPostsEligibleForNotesResponse"
      },
      "args": {
        "test_mode": {
          "schema": {
            "type": "boolean"
          },
          "required": true
        },
        "pagination_token": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "post_selection": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/notes/search/posts_eligible_for_notes",
          "query": {
            "test_mode": {
              "$resolve": "args.test_mode"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "post_selection": {
              "$resolve": "args.post_selection"
            }
          }
        }
      }
    },
    "getOpenApiSpec": {
      "name": "Get OpenAPI Spec.",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/openapi.json"
        }
      }
    },
    "getSpacesByIds": {
      "name": "Get Spaces by IDs",
      "schema": {
        "type": "ref",
        "ref": "Get2SpacesResponse"
      },
      "args": {
        "ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": true
        },
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
          "path": "/2/spaces",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "getSpacesByCreatorIds": {
      "name": "Get Spaces by creator IDs",
      "schema": {
        "type": "ref",
        "ref": "Get2SpacesByCreatorIdsResponse"
      },
      "args": {
        "user_ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "UserId"
            }
          },
          "required": true
        },
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
          "path": "/2/spaces/by/creator_ids",
          "query": {
            "user_ids": {
              "$resolve": "args.user_ids"
            }
          }
        }
      }
    },
    "searchSpaces": {
      "name": "Search Spaces",
      "schema": {
        "type": "ref",
        "ref": "Get2SpacesSearchResponse"
      },
      "args": {
        "query": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "state": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
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
          "path": "/2/spaces/search",
          "query": {
            "query": {
              "$resolve": "args.query"
            },
            "state": {
              "$resolve": "args.state"
            },
            "max_results": {
              "$resolve": "args.max_results"
            }
          }
        }
      }
    },
    "getSpacesById": {
      "name": "Get space by ID",
      "schema": {
        "type": "ref",
        "ref": "Get2SpacesIdResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
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
          "path": "/2/spaces/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getSpacesBuyers": {
      "name": "Get Space ticket buyers",
      "schema": {
        "type": "ref",
        "ref": "Get2SpacesIdBuyersResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken32"
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
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
          "path": "/2/spaces/{id}/buyers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "max_results": {
              "$resolve": "args.max_results"
            }
          }
        }
      }
    },
    "getSpacesPosts": {
      "name": "Get Space Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2SpacesIdTweetsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
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
          "path": "/2/spaces/{id}/tweets",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            }
          }
        }
      }
    },
    "getTrendsByWoeid": {
      "name": "Get Trends by WOEID",
      "schema": {
        "type": "ref",
        "ref": "Get2TrendsByWoeidWoeidResponse"
      },
      "args": {
        "woeid": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "max_trends": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
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
          "path": "/2/trends/by/woeid/{woeid}",
          "params": {
            "woeid": {
              "$resolve": "args.woeid"
            }
          },
          "query": {
            "max_trends": {
              "$resolve": "args.max_trends"
            }
          }
        }
      }
    },
    "getPostsByIds": {
      "name": "Get Posts by IDs",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsResponse"
      },
      "args": {
        "ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": true
        },
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
          "path": "/2/tweets",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "getPostsAnalytics": {
      "name": "Get Post analytics",
      "schema": {
        "type": "ref",
        "ref": "Analytics"
      },
      "args": {
        "ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TweetId"
            }
          },
          "required": true
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "granularity": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
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
          "path": "/2/tweets/analytics",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            },
            "end_time": {
              "$resolve": "args.end_time"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "granularity": {
              "$resolve": "args.granularity"
            }
          }
        }
      }
    },
    "streamPostsCompliance": {
      "name": "Stream Posts compliance data",
      "schema": {
        "type": "ref",
        "ref": "TweetComplianceStreamResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/tweets/compliance/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "getPostsCountsAll": {
      "name": "Get count of all Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsCountsAllResponse"
      },
      "args": {
        "query": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "since_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "until_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "next_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "granularity": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/counts/all",
          "query": {
            "query": {
              "$resolve": "args.query"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            },
            "since_id": {
              "$resolve": "args.since_id"
            },
            "until_id": {
              "$resolve": "args.until_id"
            },
            "next_token": {
              "$resolve": "args.next_token"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "granularity": {
              "$resolve": "args.granularity"
            }
          }
        }
      }
    },
    "getPostsCountsRecent": {
      "name": "Get count of recent Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsCountsRecentResponse"
      },
      "args": {
        "query": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "since_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "until_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "next_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "granularity": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/counts/recent",
          "query": {
            "query": {
              "$resolve": "args.query"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            },
            "since_id": {
              "$resolve": "args.since_id"
            },
            "until_id": {
              "$resolve": "args.until_id"
            },
            "next_token": {
              "$resolve": "args.next_token"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "granularity": {
              "$resolve": "args.granularity"
            }
          }
        }
      }
    },
    "streamPostsFirehose": {
      "name": "Stream all Posts",
      "schema": {
        "type": "ref",
        "ref": "StreamingTweetResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/firehose/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "streamPostsFirehoseEn": {
      "name": "Stream English Posts",
      "schema": {
        "type": "ref",
        "ref": "StreamingTweetResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/firehose/stream/lang/en",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "streamPostsFirehoseJa": {
      "name": "Stream Japanese Posts",
      "schema": {
        "type": "ref",
        "ref": "StreamingTweetResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/firehose/stream/lang/ja",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "streamPostsFirehoseKo": {
      "name": "Stream Korean Posts",
      "schema": {
        "type": "ref",
        "ref": "StreamingTweetResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/firehose/stream/lang/ko",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "streamPostsFirehosePt": {
      "name": "Stream Portuguese Posts",
      "schema": {
        "type": "ref",
        "ref": "StreamingTweetResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/firehose/stream/lang/pt",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "streamLabelsCompliance": {
      "name": "Stream Post labels",
      "schema": {
        "type": "ref",
        "ref": "TweetLabelStreamResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/tweets/label/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "streamPostsSample": {
      "name": "Stream sampled Posts",
      "schema": {
        "type": "ref",
        "ref": "StreamingTweetResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
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
          "path": "/2/tweets/sample/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            }
          }
        }
      }
    },
    "streamPostsSample10": {
      "name": "Stream 10% sampled Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsSample10StreamResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/sample10/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "searchPostsAll": {
      "name": "Search all Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsSearchAllResponse"
      },
      "args": {
        "query": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "since_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "until_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "next_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "sort_order": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/search/all",
          "query": {
            "query": {
              "$resolve": "args.query"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            },
            "since_id": {
              "$resolve": "args.since_id"
            },
            "until_id": {
              "$resolve": "args.until_id"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "next_token": {
              "$resolve": "args.next_token"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "sort_order": {
              "$resolve": "args.sort_order"
            }
          }
        }
      }
    },
    "searchPostsRecent": {
      "name": "Search recent Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsSearchRecentResponse"
      },
      "args": {
        "query": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "since_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "until_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "next_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "sort_order": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/search/recent",
          "query": {
            "query": {
              "$resolve": "args.query"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            },
            "since_id": {
              "$resolve": "args.since_id"
            },
            "until_id": {
              "$resolve": "args.until_id"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "next_token": {
              "$resolve": "args.next_token"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "sort_order": {
              "$resolve": "args.sort_order"
            }
          }
        }
      }
    },
    "streamPosts": {
      "name": "Stream filtered Posts",
      "schema": {
        "type": "ref",
        "ref": "FilteredStreamingTweetResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/tweets/search/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "getRules": {
      "name": "Get stream rules",
      "schema": {
        "type": "ref",
        "ref": "RulesLookupResponse"
      },
      "args": {
        "ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "RuleId"
            }
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/tweets/search/stream/rules",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getRuleCounts": {
      "name": "Get stream rule counts",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsSearchStreamRulesCountsResponse"
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
          "path": "/2/tweets/search/stream/rules/counts"
        }
      }
    },
    "getWebhooksStreamLinks": {
      "name": "Get stream links",
      "schema": {
        "type": "ref",
        "ref": "WebhookLinksGetResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/tweets/search/webhooks"
        }
      }
    },
    "getPostsById": {
      "name": "Get Post by ID",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsIdResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        },
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
          "path": "/2/tweets/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getPostsLikingUsers": {
      "name": "Get Liking Users",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsIdLikingUsersResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
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
          "path": "/2/tweets/{id}/liking_users",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getPostsQuotedPosts": {
      "name": "Get Quoted Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsIdQuoteTweetsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "exclude": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
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
          "path": "/2/tweets/{id}/quote_tweets",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "exclude": {
              "$resolve": "args.exclude"
            }
          }
        }
      }
    },
    "getPostsRepostedBy": {
      "name": "Get Reposted by",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsIdRetweetedByResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
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
          "path": "/2/tweets/{id}/retweeted_by",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getPostsReposts": {
      "name": "Get Reposts",
      "schema": {
        "type": "ref",
        "ref": "Get2TweetsIdRetweetsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
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
          "path": "/2/tweets/{id}/retweets",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsage": {
      "name": "Get usage",
      "schema": {
        "type": "ref",
        "ref": "Get2UsageTweetsResponse"
      },
      "args": {
        "days": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
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
          "path": "/2/usage/tweets",
          "query": {
            "days": {
              "$resolve": "args.days"
            }
          }
        }
      }
    },
    "getUsersByIds": {
      "name": "Get Users by IDs",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersResponse"
      },
      "args": {
        "ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "UserId"
            }
          },
          "required": true
        },
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
          "path": "/2/users",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "getUsersByUsernames": {
      "name": "Get Users by usernames",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersByResponse"
      },
      "args": {
        "usernames": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": true
        },
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
          "path": "/2/users/by",
          "query": {
            "usernames": {
              "$resolve": "args.usernames"
            }
          }
        }
      }
    },
    "getUsersByUsername": {
      "name": "Get User by username",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersByUsernameUsernameResponse"
      },
      "args": {
        "username": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
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
          "path": "/2/users/by/username/{username}",
          "params": {
            "username": {
              "$resolve": "args.username"
            }
          }
        }
      }
    },
    "streamUsersCompliance": {
      "name": "Stream Users compliance data",
      "schema": {
        "type": "ref",
        "ref": "UserComplianceStreamResponse"
      },
      "args": {
        "backfill_minutes": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "partition": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/users/compliance/stream",
          "query": {
            "backfill_minutes": {
              "$resolve": "args.backfill_minutes"
            },
            "partition": {
              "$resolve": "args.partition"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "getUsersMe": {
      "name": "Get my User",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersMeResponse"
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
          "path": "/2/users/me"
        }
      }
    },
    "getTrendsPersonalizedTrends": {
      "name": "Get personalized Trends",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersPersonalizedTrendsResponse"
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
          "path": "/2/users/personalized_trends"
        }
      }
    },
    "getUsersPublicKeys": {
      "name": "Get public keys for multiple users",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersPublicKeysResponse"
      },
      "args": {
        "ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "UserId"
            }
          },
          "required": true
        },
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
          "path": "/2/users/public_keys",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "getUsersRepostsOfMe": {
      "name": "Get Reposts of me",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersRepostsOfMeResponse"
      },
      "args": {
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
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
          "path": "/2/users/reposts_of_me",
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "searchUsers": {
      "name": "Search Users",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersSearchResponse"
      },
      "args": {
        "query": {
          "schema": {
            "type": "ref",
            "ref": "UserSearchQueryVnext"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "next_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
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
          "path": "/2/users/search",
          "query": {
            "query": {
              "$resolve": "args.query"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "next_token": {
              "$resolve": "args.next_token"
            }
          }
        }
      }
    },
    "getUsersById": {
      "name": "Get User by ID",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
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
          "path": "/2/users/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getUsersAffiliates": {
      "name": "Get affiliates",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdAffiliatesResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationTokenLong"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/affiliates",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersBlocking": {
      "name": "Get blocking",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdBlockingResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken32"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/blocking",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersBookmarks": {
      "name": "Get Bookmarks",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdBookmarksResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/bookmarks",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersBookmarkFolders": {
      "name": "Get Bookmark folders",
      "schema": {
        "type": "ref",
        "ref": "BookmarkFoldersResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/users/{id}/bookmarks/folders",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersBookmarksByFolderId": {
      "name": "Get Bookmarks by folder ID",
      "schema": {
        "type": "ref",
        "ref": "BookmarkFolderPostsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "folder_id": {
          "schema": {
            "type": "ref",
            "ref": "BookmarkFolderId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/2/users/{id}/bookmarks/folders/{folder_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "folder_id": {
              "$resolve": "args.folder_id"
            }
          }
        }
      }
    },
    "getUsersFollowedLists": {
      "name": "Get followed Lists",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdFollowedListsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationTokenLong"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/followed_lists",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersFollowers": {
      "name": "Get followers",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdFollowersResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken32"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/followers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersFollowing": {
      "name": "Get following",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdFollowingResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken32"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/following",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersLikedPosts": {
      "name": "Get liked Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdLikedTweetsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/liked_tweets",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersListMemberships": {
      "name": "Get List memberships",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdListMembershipsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationTokenLong"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/list_memberships",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersMentions": {
      "name": "Get mentions",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdMentionsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "since_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "until_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/mentions",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "since_id": {
              "$resolve": "args.since_id"
            },
            "until_id": {
              "$resolve": "args.until_id"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "getUsersMuting": {
      "name": "Get muting",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdMutingResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationTokenLong"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/muting",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersOwnedLists": {
      "name": "Get owned Lists",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdOwnedListsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationTokenLong"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/owned_lists",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            }
          }
        }
      }
    },
    "getUsersPinnedLists": {
      "name": "Get pinned Lists",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdPinnedListsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
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
          "path": "/2/users/{id}/pinned_lists",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getUsersPublicKey": {
      "name": "Get user public keys",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdPublicKeysResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
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
          "path": "/2/users/{id}/public_keys",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getUsersTimeline": {
      "name": "Get Timeline",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdTimelinesReverseChronologicalResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "since_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "until_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "exclude": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/timelines/reverse_chronological",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "since_id": {
              "$resolve": "args.since_id"
            },
            "until_id": {
              "$resolve": "args.until_id"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "exclude": {
              "$resolve": "args.exclude"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "getUsersPosts": {
      "name": "Get Posts",
      "schema": {
        "type": "ref",
        "ref": "Get2UsersIdTweetsResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "since_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "until_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": false
        },
        "max_results": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pagination_token": {
          "schema": {
            "type": "ref",
            "ref": "PaginationToken36"
          },
          "required": false
        },
        "exclude": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
        "start_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_time": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
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
          "path": "/2/users/{id}/tweets",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "since_id": {
              "$resolve": "args.since_id"
            },
            "until_id": {
              "$resolve": "args.until_id"
            },
            "max_results": {
              "$resolve": "args.max_results"
            },
            "pagination_token": {
              "$resolve": "args.pagination_token"
            },
            "exclude": {
              "$resolve": "args.exclude"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            }
          }
        }
      }
    },
    "getWebhooks": {
      "name": "Get webhook",
      "schema": {
        "type": "ref",
        "ref": "Get2WebhooksResponse"
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
          "path": "/2/webhooks"
        }
      }
    }
  },
  "actions": {
    "createAccountActivitySubscription": {
      "name": "Create subscription",
      "schema": {
        "type": "ref",
        "ref": "SubscriptionsCreateResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "WebhookConfigId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubscriptionsCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/account_activity/webhooks/{webhook_id}/subscriptions/all",
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
    "deleteAccountActivitySubscription": {
      "name": "Delete subscription",
      "schema": {
        "type": "ref",
        "ref": "SubscriptionsDeleteResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "WebhookConfigId"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/account_activity/webhooks/{webhook_id}/subscriptions/{user_id}/all",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "deleteActivitySubscriptionsByIds": {
      "name": "Delete X activity subscriptions by IDs",
      "schema": {
        "type": "ref",
        "ref": "ActivitySubscriptionDeleteResponse"
      },
      "args": {
        "ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ActivitySubscriptionId"
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/activity/subscriptions",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "createActivitySubscription": {
      "name": "Create X activity subscription",
      "schema": {
        "type": "ref",
        "ref": "ActivitySubscriptionCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ActivitySubscriptionCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/activity/subscriptions",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteActivitySubscription": {
      "name": "Deletes X activity subscription",
      "schema": {
        "type": "ref",
        "ref": "ActivitySubscriptionDeleteResponse"
      },
      "args": {
        "subscription_id": {
          "schema": {
            "type": "ref",
            "ref": "ActivitySubscriptionId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/activity/subscriptions/{subscription_id}",
          "params": {
            "subscription_id": {
              "$resolve": "args.subscription_id"
            }
          }
        }
      }
    },
    "updateActivitySubscription": {
      "name": "Update X activity subscription",
      "schema": {
        "type": "ref",
        "ref": "ActivitySubscriptionUpdateResponse"
      },
      "args": {
        "subscription_id": {
          "schema": {
            "type": "ref",
            "ref": "ActivitySubscriptionId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ActivitySubscriptionUpdateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/2/activity/subscriptions/{subscription_id}",
          "params": {
            "subscription_id": {
              "$resolve": "args.subscription_id"
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
    "createChatConversation": {
      "name": "Create Chat Group Conversation",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ChatCreateConversationRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/conversations/group",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "initializeChatGroup": {
      "name": "Initialize Chat Group",
      "schema": {
        "type": "ref",
        "ref": "ChatInitializeGroupResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/conversations/group/initialize"
        }
      }
    },
    "initializeChatConversationKeys": {
      "name": "Initialize Conversation Keys",
      "schema": {
        "type": "ref",
        "ref": "ChatInitializeConversationKeysResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ChatConversationOrRecipientId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ChatInitializeConversationKeysRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/conversations/{id}/keys",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "addChatGroupMembers": {
      "name": "Add members to a Chat group conversation",
      "schema": {
        "type": "ref",
        "ref": "ChatAddGroupMembersResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ChatConversationOrRecipientId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ChatAddGroupMembersRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/conversations/{id}/members",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "sendChatMessage": {
      "name": "Send Chat Message",
      "schema": {
        "type": "object"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ChatConversationOrRecipientId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ChatSendMessageRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/conversations/{id}/messages",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "markChatConversationRead": {
      "name": "Mark Conversation as Read",
      "schema": {
        "type": "ref",
        "ref": "ChatMarkConversationReadResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ChatConversationOrRecipientId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ChatMarkConversationReadRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/conversations/{id}/read",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "sendChatTypingIndicator": {
      "name": "Send Typing Indicator",
      "schema": {
        "type": "ref",
        "ref": "ChatSendTypingIndicatorResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ChatConversationOrRecipientId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/conversations/{id}/typing",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "chatMediaUploadInitialize": {
      "name": "Initialize Chat Media Upload",
      "schema": {
        "type": "ref",
        "ref": "ChatMediaUploadInitializeResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ChatMediaUploadInitializeRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/media/upload/initialize",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "chatMediaUploadAppend": {
      "name": "Append Chat Media Upload",
      "schema": {
        "type": "ref",
        "ref": "MediaUploadAppendResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ChatMediaUploadAppendRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/media/upload/{id}/append",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "chatMediaUploadFinalize": {
      "name": "Finalize Chat Media Upload",
      "schema": {
        "type": "ref",
        "ref": "ChatMediaUploadFinalizeResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ChatMediaUploadFinalizeRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/chat/media/upload/{id}/finalize",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "createComplianceJobs": {
      "name": "Create Compliance Job",
      "schema": {
        "type": "ref",
        "ref": "CreateComplianceJobResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateComplianceJobRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/compliance/jobs",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteConnectionsByUuids": {
      "name": "Terminate multiple connections",
      "schema": {
        "type": "ref",
        "ref": "KillConnectionsByUuidsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "KillConnectionsByUuidsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/connections",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteAllConnections": {
      "name": "Terminate all connections",
      "schema": {
        "type": "ref",
        "ref": "KillAllConnectionsResponse"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/connections/all"
        }
      }
    },
    "deleteConnectionsByEndpoint": {
      "name": "Terminate connections by endpoint",
      "schema": {
        "type": "ref",
        "ref": "KillConnectionsByEndpointResponse"
      },
      "args": {
        "endpoint_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/connections/{endpoint_id}",
          "params": {
            "endpoint_id": {
              "$resolve": "args.endpoint_id"
            }
          }
        }
      }
    },
    "createDirectMessagesConversation": {
      "name": "Create DM conversation",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateDmConversationRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/dm_conversations",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "createDirectMessagesByParticipantId": {
      "name": "Create DM message by participant ID",
      "schema": {
        "type": "object"
      },
      "args": {
        "participant_id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateMessageRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/dm_conversations/with/{participant_id}/messages",
          "params": {
            "participant_id": {
              "$resolve": "args.participant_id"
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
    "createDirectMessagesByConversationId": {
      "name": "Create DM message by conversation ID",
      "schema": {
        "type": "object"
      },
      "args": {
        "dm_conversation_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateMessageRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/dm_conversations/{dm_conversation_id}/messages",
          "params": {
            "dm_conversation_id": {
              "$resolve": "args.dm_conversation_id"
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
    "deleteDirectMessagesEvents": {
      "name": "Delete DM event",
      "schema": {
        "type": "ref",
        "ref": "DeleteDmResponse"
      },
      "args": {
        "event_id": {
          "schema": {
            "type": "ref",
            "ref": "DmEventId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/dm_events/{event_id}",
          "params": {
            "event_id": {
              "$resolve": "args.event_id"
            }
          }
        }
      }
    },
    "evaluateCommunityNotes": {
      "name": "Evaluate a Community Note",
      "schema": {
        "type": "ref",
        "ref": "EvaluateNoteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "EvaluateNoteRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/evaluate_note",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "createLists": {
      "name": "Create List",
      "schema": {
        "type": "ref",
        "ref": "ListCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ListCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/lists",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteLists": {
      "name": "Delete List",
      "schema": {
        "type": "ref",
        "ref": "ListDeleteResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/lists/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateLists": {
      "name": "Update List",
      "schema": {
        "type": "ref",
        "ref": "ListUpdateResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ListUpdateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/2/lists/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "addListsMember": {
      "name": "Add List member",
      "schema": {
        "type": "ref",
        "ref": "ListMutateResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ListAddUserRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/lists/{id}/members",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "removeListsMemberByUserId": {
      "name": "Remove List member",
      "schema": {
        "type": "ref",
        "ref": "ListMutateResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/lists/{id}/members/{user_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "createMediaMetadata": {
      "name": "Create Media metadata",
      "schema": {
        "type": "ref",
        "ref": "MetadataCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MetadataCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/media/metadata",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteMediaSubtitles": {
      "name": "Delete Media subtitles",
      "schema": {
        "type": "ref",
        "ref": "SubtitlesDeleteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubtitlesDeleteRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/media/subtitles",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "createMediaSubtitles": {
      "name": "Create Media subtitles",
      "schema": {
        "type": "ref",
        "ref": "SubtitlesCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubtitlesCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/media/subtitles",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "mediaUpload": {
      "name": "Upload media",
      "schema": {
        "type": "ref",
        "ref": "MediaUploadResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MediaUploadRequestOneShot"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/media/upload",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "initializeMediaUpload": {
      "name": "Initialize media upload",
      "schema": {
        "type": "ref",
        "ref": "MediaUploadResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MediaUploadConfigRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/media/upload/initialize",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "appendMediaUpload": {
      "name": "Append Media upload",
      "schema": {
        "type": "ref",
        "ref": "MediaUploadAppendResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "MediaId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MediaUploadAppendRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/media/upload/{id}/append",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "finalizeMediaUpload": {
      "name": "Finalize Media upload",
      "schema": {
        "type": "ref",
        "ref": "MediaUploadResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "MediaId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/media/upload/{id}/finalize",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "createCommunityNotes": {
      "name": "Create a Community Note",
      "schema": {
        "type": "ref",
        "ref": "CreateNoteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateNoteRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/notes",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteCommunityNotes": {
      "name": "Delete a Community Note",
      "schema": {
        "type": "ref",
        "ref": "DeleteNoteResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "NoteId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/notes/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "createPosts": {
      "name": "Create or Edit Post",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TweetCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/tweets",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateRules": {
      "name": "Update stream rules",
      "schema": {
        "type": "ref",
        "ref": "AddOrDeleteRulesResponse"
      },
      "args": {
        "dry_run": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "delete_all": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AddOrDeleteRulesRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/tweets/search/stream/rules",
          "query": {
            "dry_run": {
              "$resolve": "args.dry_run"
            },
            "delete_all": {
              "$resolve": "args.delete_all"
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
    "deleteWebhooksStreamLink": {
      "name": "Delete stream link",
      "schema": {
        "type": "ref",
        "ref": "WebhookLinksDeleteResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "WebhookConfigId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/tweets/search/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "createWebhooksStreamLink": {
      "name": "Create stream link",
      "schema": {
        "type": "ref",
        "ref": "WebhookLinksCreateResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "WebhookConfigId"
          },
          "required": true
        },
        "tweet.fields": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "expansions": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "media.fields": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "poll.fields": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "user.fields": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "place.fields": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/tweets/search/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          },
          "query": {
            "tweet.fields": {
              "$resolve": "args.tweet.fields"
            },
            "expansions": {
              "$resolve": "args.expansions"
            },
            "media.fields": {
              "$resolve": "args.media.fields"
            },
            "poll.fields": {
              "$resolve": "args.poll.fields"
            },
            "user.fields": {
              "$resolve": "args.user.fields"
            },
            "place.fields": {
              "$resolve": "args.place.fields"
            }
          }
        }
      }
    },
    "deletePosts": {
      "name": "Delete Post",
      "schema": {
        "type": "ref",
        "ref": "TweetDeleteResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/tweets/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "hidePostsReply": {
      "name": "Hide reply",
      "schema": {
        "type": "ref",
        "ref": "TweetHideResponse"
      },
      "args": {
        "tweet_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TweetHideRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/2/tweets/{tweet_id}/hidden",
          "params": {
            "tweet_id": {
              "$resolve": "args.tweet_id"
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
    "createUsersBookmark": {
      "name": "Create Bookmark",
      "schema": {
        "type": "ref",
        "ref": "BookmarkMutationResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BookmarkAddRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/bookmarks",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "deleteUsersBookmark": {
      "name": "Delete Bookmark",
      "schema": {
        "type": "ref",
        "ref": "BookmarkMutationResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "tweet_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/users/{id}/bookmarks/{tweet_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "tweet_id": {
              "$resolve": "args.tweet_id"
            }
          }
        }
      }
    },
    "blockUsersDms": {
      "name": "Block DMs",
      "schema": {
        "type": "ref",
        "ref": "UsersDMBlockCreateResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/dm/block",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "unblockUsersDms": {
      "name": "Unblock DMs",
      "schema": {
        "type": "ref",
        "ref": "UsersDMUnBlockCreateResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/dm/unblock",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "followList": {
      "name": "Follow List",
      "schema": {
        "type": "ref",
        "ref": "ListFollowedResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ListFollowedRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/followed_lists",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "unfollowList": {
      "name": "Unfollow List",
      "schema": {
        "type": "ref",
        "ref": "ListFollowedResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "list_id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/users/{id}/followed_lists/{list_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "list_id": {
              "$resolve": "args.list_id"
            }
          }
        }
      }
    },
    "followUser": {
      "name": "Follow User",
      "schema": {
        "type": "ref",
        "ref": "UsersFollowingCreateResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UsersFollowingCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/following",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "likePost": {
      "name": "Like Post",
      "schema": {
        "type": "ref",
        "ref": "UsersLikesCreateResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UsersLikesCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/likes",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "unlikePost": {
      "name": "Unlike Post",
      "schema": {
        "type": "ref",
        "ref": "UsersLikesDeleteResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "tweet_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/users/{id}/likes/{tweet_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "tweet_id": {
              "$resolve": "args.tweet_id"
            }
          }
        }
      }
    },
    "muteUser": {
      "name": "Mute User",
      "schema": {
        "type": "ref",
        "ref": "MuteUserMutationResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MuteUserRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/muting",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "pinList": {
      "name": "Pin List",
      "schema": {
        "type": "ref",
        "ref": "ListPinnedResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ListPinnedRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/pinned_lists",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "unpinList": {
      "name": "Unpin List",
      "schema": {
        "type": "ref",
        "ref": "ListUnpinResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "list_id": {
          "schema": {
            "type": "ref",
            "ref": "ListId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/users/{id}/pinned_lists/{list_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "list_id": {
              "$resolve": "args.list_id"
            }
          }
        }
      }
    },
    "addUserPublicKey": {
      "name": "Add public key",
      "schema": {
        "type": "ref",
        "ref": "ChatAddPublicKeyResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ChatAddPublicKeyRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/public_keys",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "repostPost": {
      "name": "Repost Post",
      "schema": {
        "type": "ref",
        "ref": "UsersRetweetsCreateResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UsersRetweetsCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/users/{id}/retweets",
          "params": {
            "id": {
              "$resolve": "args.id"
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
    "unrepostPost": {
      "name": "Unrepost Post",
      "schema": {
        "type": "ref",
        "ref": "UsersRetweetsDeleteResponse"
      },
      "args": {
        "id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "source_tweet_id": {
          "schema": {
            "type": "ref",
            "ref": "TweetId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/users/{id}/retweets/{source_tweet_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "source_tweet_id": {
              "$resolve": "args.source_tweet_id"
            }
          }
        }
      }
    },
    "unfollowUser": {
      "name": "Unfollow User",
      "schema": {
        "type": "ref",
        "ref": "UsersFollowingDeleteResponse"
      },
      "args": {
        "source_user_id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "target_user_id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/users/{source_user_id}/following/{target_user_id}",
          "params": {
            "source_user_id": {
              "$resolve": "args.source_user_id"
            },
            "target_user_id": {
              "$resolve": "args.target_user_id"
            }
          }
        }
      }
    },
    "unmuteUser": {
      "name": "Unmute User",
      "schema": {
        "type": "ref",
        "ref": "MuteUserMutationResponse"
      },
      "args": {
        "source_user_id": {
          "schema": {
            "type": "ref",
            "ref": "UserIdMatchesAuthenticatedUser"
          },
          "required": true
        },
        "target_user_id": {
          "schema": {
            "type": "ref",
            "ref": "UserId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/users/{source_user_id}/muting/{target_user_id}",
          "params": {
            "source_user_id": {
              "$resolve": "args.source_user_id"
            },
            "target_user_id": {
              "$resolve": "args.target_user_id"
            }
          }
        }
      }
    },
    "createWebhooks": {
      "name": "Create webhook",
      "schema": {
        "type": "ref",
        "ref": "WebhookConfigCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WebhookConfigCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/webhooks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "createWebhookReplayJob": {
      "name": "Create replay job for webhook",
      "schema": {
        "type": "ref",
        "ref": "ReplayJobCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WebhookReplayCreateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/2/webhooks/replay",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteWebhooks": {
      "name": "Delete webhook",
      "schema": {
        "type": "ref",
        "ref": "WebhookConfigDeleteResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "WebhookConfigId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/2/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "validateWebhooks": {
      "name": "Validate webhook",
      "schema": {
        "type": "ref",
        "ref": "WebhookConfigPutResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "ref",
            "ref": "WebhookConfigId"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/2/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    }
  }
};

export default spec;
